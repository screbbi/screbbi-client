import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-lightGrey h-screen">
      <Navbar />
      <div className="page-layout h-full">
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
