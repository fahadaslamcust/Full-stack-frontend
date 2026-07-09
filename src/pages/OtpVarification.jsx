import { useState, useRef } from "react";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to next input if filled
    if (value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace to move to previous field
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Container sizing matches sm to lg responsiveness */}
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 md:p-10 md:shadow-md border border-transparent md:border-gray-100 flex flex-col justify-between min-h-[550px] sm:min-h-[600px]">
        
        {/* Top Typography Content */}
        <div className="space-y-3 mt-4 sm:mt-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            OTP
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm">
            We have sent a 4-digit code to your email. Please enter it below
          </p>
        </div>

        {/* 4-Digit OTP Input Row Grid */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-8">
          {otp.map((digit, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                placeholder="1"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 border border-gray-100 rounded-xl text-center text-sm font-semibold text-gray-800 outline-none focus:border-blue-500 focus:bg-white transition shadow-2xs placeholder-gray-300"
              />
              {idx === 1 && (
                <span className="w-2.5 h-[1.5px] bg-gray-200 mx-1 block flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Actions */}
        <div className="space-y-5 mb-4">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-3.5 px-4 rounded-full transition active:scale-[0.99] shadow-sm shadow-blue-200">
            Verify & Continue
          </button>
          
          <p className="text-[11px] sm:text-xs text-center text-gray-500 max-w-xs mx-auto leading-normal">
            Didn't receive the code? Request a new one to continue?
            <button className="text-blue-500 font-semibold ml-1 hover:underline bg-transparent border-none p-0 inline">
              Resend it.
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}