import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { useLogin } from "../hooks/useAuth";
import { toast } from "react-toastify";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
        onError: (error) => {
          console.error("Login failed:", error);
          toast.error(error.response?.data?.message || "Login failed");
        }
      }
    );
  };

  return (
    <AuthLayout
      leftContent={
        <div className="w-full max-w-sm md:max-w-md px-2 sm:px-4 text-center md:text-left">
          {/* Responsive Welcome Text */}
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-4 md:mb-10 leading-tight">
            Welcome Back!
          </h1>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-8 md:mb-12 leading-relaxed">
            Sign in to your account to connect with your campus community.
          </p>

          {/* Brand/Logo Layout adjustments */}
          <div className="flex flex-col items-center mt-6 md:mt-10">
            <img
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain"
              src="/images/login-logo.png"
              alt="Campus Connect Logo"
            />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mt-2">
              Campus Connect
            </h2>
          </div>
        </div>
      }
    >
      <form
        className="w-full max-w-md lg:max-w-lg flex flex-col justify-center px-4 sm:px-6 md:px-0 mx-auto"
        onSubmit={handleLogin}
      >
        <div className="w-full space-y-5 sm:space-y-6">
          {/* Email Field */}
          <div className="flex flex-col">
            <label className="text-gray-900 font-medium text-xs sm:text-sm mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="www..@gmail.com"
              className="w-full border-b border-gray-300 py-2 px-2 text-sm focus:outline-none focus:border-[#3B82F6] transition-colors placeholder-gray-400"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col relative">
            <label className="text-gray-900 font-medium text-xs sm:text-sm mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
                className="w-full border-b border-gray-300 py-2 px-2 pr-8 text-sm focus:outline-none focus:border-[#3B82F6] transition-colors placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 bottom-2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
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

        {/* Action Links */}
        <div className="text-right mt-2.5">
          <a
            href="/forget-password"
            className="text-xs text-[#3B82F6] hover:underline font-medium"
          >
            Forget Password
          </a>
        </div>

        {/* Submit Action */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full mt-6 sm:mt-8 bg-[#3B82F6] hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2.5 px-4 rounded-full transition-colors text-sm shadow-sm active:scale-[0.99]"
        >
          {loginMutation.isPending ? "Signing In..." : "Sign In"}
        </button>

        {/* Alternative Route Link */}
        <div className="mt-5 text-center text-xs text-gray-500">
          New user?{" "}
          <a
            href="/signup"
            className="text-[#3B82F6] hover:underline font-medium ml-0.5"
          >
            Sign Up
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}