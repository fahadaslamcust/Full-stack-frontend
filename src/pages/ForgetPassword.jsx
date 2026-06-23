import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    // API logic goes here
    setIsSubmitted(true);
  };

  return (
    <AuthLayout
      leftContent={
        <div className="w-full max-w-sm md:max-w-md px-2 sm:px-4 text-center md:text-left">
          {/* Responsive Heading Sizes */}
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-4 md:mb-6 leading-tight">
            Reset Your Password
          </h1>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-8 md:mb-12">
            Don't worry! It happens. Enter your email address to get back into your campus community.
          </p>
          
          {/* Brand/Logo Section matching screen adjustments */}
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
        onSubmit={handleSubmit}
      >
        {!isSubmitted ? (
          <>
            <div className="w-full space-y-4 sm:space-y-6">
              <div className="flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1.5">
                  Forgot Password?
                </h3>
                <p className="text-xs text-gray-500 mb-4 sm:mb-6 leading-relaxed">
                  No worries! Enter your university email and we will send you a reset link.
                </p>
                
                <label className="text-gray-900 font-medium text-xs sm:text-sm mt-3 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="www..@gmail.com"
                  className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-[#3B82F6] transition-colors placeholder-gray-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 sm:mt-8 bg-[#3B82F6] hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition-colors text-sm shadow-sm active:scale-[0.99]"
            >
              Send Reset Link
            </button>
          </>
        ) : (
          /* Responsive Success View State */
          <div className="w-full text-center py-4 sm:py-6 space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Check Your Email</h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xs sm:max-w-sm mx-auto leading-relaxed">
              We have sent a password reset link to <span className="font-semibold text-gray-900 break-all">{email}</span>. Please check your inbox or spam folder.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="mt-3 text-xs text-[#3B82F6] hover:underline font-medium block mx-auto"
            >
              Resend email
            </button>
          </div>
        )}

        {/* Footer Navigation Link alignment */}
        <div className="mt-6 sm:mt-8 text-center text-xs text-gray-500">
          Remember your password?{" "}
          <a
            href="/"
            className="text-[#3B82F6] hover:underline font-medium ml-0.5"
          >
            Back to Sign In
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}