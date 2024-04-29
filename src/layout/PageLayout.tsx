import { ReactNode, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const PageLayout = ({
  children,
  writings,
  refresh,
}: {
  children: ReactNode;
  writings?: any;
  refresh: () => void;
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
        <Sidebar writings={writings} refresh={refresh} />
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
