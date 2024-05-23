import { ReactNode, useEffect, useState } from "react";
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

  const [openNav, setOpenNav] = useState(false);

  return (
    <div className="h-screen overflow-y-hidden">
      <div className="md:hidden text-2xl p-4 text-center">
        AI ContentWriter works best on browsers at least 900px wide (Desktop or
        Tablet). Please switch to a larger browser
      </div>

      <div className="bg-lightGrey h-screen md:block hidden">
        <div className="page-layout h-full">
          <Sidebar
            writings={writings}
            refresh={refresh}
            open={openNav}
            setOpen={() => setOpenNav(false)}
          />

          <div>
            <Navbar setOpen={() => setOpenNav(!openNav)} open={openNav} />
            <div className="h-full">{children}</div>
          </div>
        </div>
        {openNav && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black/40 z-20"
            onClick={() => setOpenNav(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default PageLayout;
