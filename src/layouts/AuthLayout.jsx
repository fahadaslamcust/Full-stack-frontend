const AuthLayout = ({ children, leftContent }) => {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex">
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center px-16 border-r border-slate-200">
        {leftContent}
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};
export default AuthLayout;
