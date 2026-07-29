import Link from "next/link";
import Logo from "../components/logo/Logo";
import { Lobster } from "next/font/google";

const lobster = Lobster({
  weight: "400", // Lobster only has one weight
  subsets: ["latin"],
});
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4  sm:p-6">
      <Logo />

      <h1
        className={`${lobster.className} text-xl sm:text-3xl mt-6 mb-2 text-gray-900`}
      >
        Welcome to PlateShare Community
      </h1>

      <p className="text-gray-600 text-base mb-10 text-center max-w-md">
        Share your favorite dishes, explore new recipes, and connect with food
        lovers worldwide!
      </p>

      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <p className="text-center text-gray-700 mb-4 font-medium">
          New to PlateShare?
        </p>

        <Link
          href="/register"
          aria-label="Create a new PlateShare account"
          className="block w-full text-center px-6 py-3 bg-[#f77f00] text-white rounded-md hover:bg-[#fcbf49] transition font-medium"
        >
          Create Account
        </Link>

        <div className="flex items-center my-4">
          <span className="grow border-t border-gray-300"></span>
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <span className="grow border-t border-gray-300"></span>
        </div>

        <p className="text-center text-gray-700 mb-3">
          Already have an account?
        </p>

        <Link
          href="/login"
          aria-label="Sign in to your PlateShare account"
          className="block w-full text-center px-6 py-3 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition font-medium"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}
