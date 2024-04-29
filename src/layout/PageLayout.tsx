import { ReactNode, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const PageLayout = ({
  children,
  writings,
}: {
  children: ReactNode;
  writings?: any;
}) => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.replace("/");
    }
  }, []);

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
