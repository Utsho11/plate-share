import Link from "next/link";
import Logo from "../components/logo/Logo";
import { Lobster } from "next/font/google";

const lobster = Lobster({
  weight: "400", // Lobster only has one weight
  subsets: ["latin"],
});
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 bg-gray-50/50 dark:bg-slate-950">
      <Logo size="lg"/>

      <h1
        className={`${lobster.className} text-2xl sm:text-4xl mt-6 mb-2 text-gray-900 dark:text-white`}
      >
        Welcome to PlateShare Community
      </h1>

      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-8 text-center max-w-md">
        Share your favorite dishes, explore new recipes, and connect with food
        lovers worldwide!
      </p>

      <div className="w-full max-w-sm bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-slate-800">
        <p className="text-center text-gray-700 dark:text-gray-200 mb-4 font-semibold text-sm">
          New to PlateShare?
        </p>

        <Link
          href="/register"
          aria-label="Create a new PlateShare account"
          className="block w-full text-center px-6 py-3 bg-[#f77f00] hover:bg-orange-600 text-white rounded-xl transition font-bold text-sm shadow-xs"
        >
          Create Account
        </Link>

        <div className="flex items-center my-4">
          <span className="grow border-t border-gray-200 dark:border-slate-800"></span>
          <span className="mx-3 text-gray-400 dark:text-gray-500 text-xs font-semibold">OR</span>
          <span className="grow border-t border-gray-200 dark:border-slate-800"></span>
        </div>

        <p className="text-center text-gray-700 dark:text-gray-300 mb-3 text-xs">
          Already have an account?
        </p>

        <Link
          href="/login"
          aria-label="Sign in to your PlateShare account"
          className="block w-full text-center px-6 py-3 border border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition font-semibold text-sm"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}
