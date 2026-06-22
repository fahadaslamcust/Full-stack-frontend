import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <AuthLayout
      leftContent={
        <div className="w-full max-w-sm md:max-w-md px-2 sm:px-4 text-center md:text-left">
          {/* Responsive Header Typography */}
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-4 md:mb-6 leading-tight">
            Create Account
          </h1>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
            Join Campus Connect and start sharing updates, exploring events, and connecting with peers.
          </p>
          
          {/* Logo Alignment */}
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
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Responsive Profile Avatar Upload Area */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <label className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border border-gray-200 hover:bg-gray-200 transition group">
            {avatar ? (
              <img src={avatar} alt="Profile preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-[11px] sm:text-xs font-medium">Upload</span>
            )}
            
            {/* Camera Overlay Icon */}
            <div className="absolute bottom-1 right-1 bg-white p-1 sm:p-1.5 rounded-full shadow-md text-xs sm:text-sm group-hover:scale-105 transition">
              📷
            </div>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange} 
            />
          </label>
        </div>

        {/* Inputs Stack */}
        <div className="space-y-4 sm:space-y-5">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email" placeholder="example@gmail.com" type="email" />
          <Input label="University Name" placeholder="Your University" />
          
          {/* Password Input Wrapper */}
          <div className="flex flex-col relative">
            <label className="text-xs sm:text-sm font-medium text-gray-900 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full border-b border-gray-300 py-1.5 sm:py-2 pr-8 focus:outline-none focus:border-[#3B82F6] transition-colors placeholder-gray-400 text-sm"
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

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full mt-6 sm:mt-8 bg-[#3B82F6] hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-full transition-colors text-sm shadow-sm active:scale-[0.99]"
        >
          Sign Up
        </button>

        {/* Alternative Nav link */}
        <div className="text-center text-xs text-gray-500 mt-5">
          Already have an account?{" "}
          <a href="/" className="text-[#3B82F6] hover:underline font-medium ml-0.5">
            Sign In
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}

// Optimized Responsive Sub-component
function Input({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs sm:text-sm font-medium text-gray-900 mb-1">{label}</label>
      <input
        {...props}
        className="w-full border-b border-gray-300 py-1.5 sm:py-2 text-sm focus:outline-none focus:border-[#3B82F6] transition-colors placeholder-gray-400"
      />
    </div>
  );
}