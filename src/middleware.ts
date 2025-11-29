import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ["/", "/login", "/register"];

const commonPrivateRoutes = [
  "/home",
  "/dashboard",
  "/dashboard/change-password",
];

const roleBasedPrivateRoutes = {
  USER: [/^\/dashboard\/user/],
  ADMIN: [/^\/dashboard\/admin/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = (await cookies()).get("accessToken")?.value;

  // --------------------------------------------------------
  // 1️⃣ User logged in → prevent access to "/", "/login", "/register"
  // --------------------------------------------------------

  // console.log({ pathname });
  // console.log({ accessToken });

  if (accessToken && AuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // --------------------------------------------------------
  // 2️⃣ User not logged in → allow only public routes
  // --------------------------------------------------------
  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next(); // allow public pages
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // --------------------------------------------------------
  // 3️⃣ Logged in → allow common private routes
  // --------------------------------------------------------
  if (
    commonPrivateRoutes.includes(pathname) ||
    commonPrivateRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  // --------------------------------------------------------
  // 4️⃣ Role-based routes
  // --------------------------------------------------------
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let decodedData: any = null;

  try {
    decodedData = jwtDecode(accessToken);
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = decodedData?.role as Role;

  if (role && roleBasedPrivateRoutes[role]) {
    const allowedRoutes = roleBasedPrivateRoutes[role];
    if (allowedRoutes.some((pattern) => pattern.test(pathname))) {
      return NextResponse.next();
    }
  }

  // --------------------------------------------------------
  // 5️⃣ If nothing matches → redirect to home
  // --------------------------------------------------------
  return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard/:page*",
    "/doctors/:page*",
    "/home",
  ],
};
