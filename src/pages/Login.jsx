import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      leftContent={
        <div className="max-w-md">
          <h1 className="font-bold text-gray-600 mb-10">
           Welcome Back!
          </h1>
          <p className="text-slate-600 text-lg mb-12">
            Sign in to your account to connect with your campus community.
          </p>
          <div className="flex flex-col items-center mt-10">
            <img
              className="w-36 h-36 text-[#3B82F6]"
              viewBox="0 0 24 24"
              fill="currentColor"
              src="/images/login-logo.png"
            />
            <h2 className="text-4xl font-bold text-blue-500">Campus Connect</h2>
          </div>
        </div>
      }
    >
      <form
        className="w-full max-w-lg flex flex-col"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="w-full space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-900 font-medium text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="www..@gmail.com"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#3B82F6] transition-colors placeholder-gray-400 text-sm"
            />
          </div>
          <div className="flex flex-col relative">
            <label className="text-gray-900 font-medium text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="**********"
                className="w-full border-b border-gray-300 py-2 pr-8 focus:outline-none focus:border-[#3B82F6] transition-colors placeholder-gray-400 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 bottom-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="text-right mt-2">
          <a
            href="#forgot"
            className="text-xs text-[#3B82F6] hover:underline font-medium"
          >
            Forget Password
          </a>
        </div>
        <button
          type="submit"
          className="w-full mt-8 bg-[#3B82F6] hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition-colors text-sm shadow-sm"
        >
          Sign In
        </button>
        <div className="mt-4 text-center text-xs text-gray-600">
          New user?{" "}
          <a
            href="/signup"
            className="text-[#3B82F6] hover:underline font-medium"
          >
            Sign Up
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}
