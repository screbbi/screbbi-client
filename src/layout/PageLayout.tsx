import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const PageLayout = ({
  children,
  writings,
}: {
  children: ReactNode;
  writings?: any;
}) => {
  return (
    <div className="bg-lightGrey h-screen">
      <Navbar />
      <div className="page-layout h-full">
        <Sidebar writings={writings} />
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
