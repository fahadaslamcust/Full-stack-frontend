import { EyeOff } from "lucide-react";

export default function ProfileCompletion({ onSuccess }) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aap yahan state save karne ka backend/API logic add kar sakte hain
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-[2.5rem] shadow-2xl z-10 transition-all border border-gray-100/50 
                      md:relative md:bottom-auto md:inset-x-auto md:w-full md:max-w-md md:rounded-[2rem] animate-slide-up flex flex-col max-h-[92vh] md:max-h-none">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mt-3.5 mb-1 flex-shrink-0 md:hidden" />
        <div className="p-6 sm:p-8 overflow-y-auto hide-scrollbar flex-1 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              Tell Us About Yourself
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
              Complete your profile to connect with students from your university and department
            </p>
          </div>
          <form className="space-y-5 pt-2" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-[11px] sm:text-xs font-bold text-gray-900 tracking-wide block">
                Semester
              </label>
              <input 
                type="text" 
                placeholder="www.@gmail.com" 
                className="w-full bg-transparent border-b border-gray-200 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] sm:text-xs font-bold text-gray-900 tracking-wide block">
                Department Name
              </label>
              <input 
                type="password" 
                placeholder="•••••••••" 
                className="w-full bg-transparent border-b border-gray-200 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 transition-colors tracking-widest"
                required
              />
            </div>
            <div className="space-y-1 relative">
              <label className="text-[11px] sm:text-xs font-bold text-gray-900 tracking-wide block">
                City
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="•••••••••" 
                  className="w-full bg-transparent border-b border-gray-200 py-2 pr-8 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 transition-colors"
                  required
                />
                <button type="button" className="absolute right-0 bottom-2 text-gray-400 hover:text-gray-600 p-0.5">
                  <EyeOff size={16} />
                </button>
              </div>
            </div>
            <div className="pt-6 pb-2">
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-3.5 px-4 rounded-full transition active:scale-[0.99] shadow-sm shadow-blue-200">
                Complete Profile
              </button>
            </div>

          </form>
        </div>
        <div className="h-4 w-full bg-white flex-shrink-0 md:hidden" />
      </div>

    </div>
  );
}