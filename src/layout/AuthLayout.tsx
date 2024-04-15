import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="onboard">
      <div className="bg-white w-full min-h-screen">
        <div className="flex justify-center items-center min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
