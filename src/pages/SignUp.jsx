import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      leftContent={
        <div className="max-w-md">
          <h1 className="font-bold text-gray-600 mb-10">Create Account</h1>
          <p className="text-slate-600 text-lg mb-10">
            Join Campus Connect and start sharing updates, exploring events, and
            connecting with peers.
          </p>
          <div className="flex flex-col items-center mt-10">
            <img
              className="w-36 h-36 text-[#3B82F6]"
              viewBox="0 0 24 24"
              fill="currentColor"
              src="/images/login-logo.png"
            />

            <h2 className="text-3xl font-bold text-blue-500 mt-3">
              Campus Connect
            </h2>
          </div>
        </div>
      }
    >
      <form
        className="w-full max-w-md flex flex-col"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-xs">Upload</span>

            <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow">
              📷
            </div>
          </div>
        </div>
        <Input label="Full Name" placeholder="John Doe" />
        <Input label="Email" placeholder="example@gmail.com" type="email" />
        <Input label="University Name" placeholder="Your University" />
        <div className="flex flex-col relative mb-4">
          <label className="text-sm font-medium text-gray-900 mb-1">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="********"
            className="border-b border-gray-300 py-2 pr-8 focus:outline-none focus:border-[#3B82F6] text-sm"
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

        {/* Button */}
        <button className="w-full mt-4 bg-[#3B82F6] text-white py-2 rounded-full hover:bg-blue-600">
          Sign Up
        </button>
        <div className="text-center text-xs text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium text-gray-900 mb-1">{label}</label>
      <input
        {...props}
        className="border-b border-gray-300 py-2 focus:outline-none focus:border-[#3B82F6] text-sm"
      />
    </div>
  );
}
