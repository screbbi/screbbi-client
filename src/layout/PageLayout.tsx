import { ReactNode, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const PageLayout = ({
  children,
  writings,
  refresh,
  rename,
  openNav,
  setOpenNav,
}: {
  children: ReactNode;
  writings?: any;
  refresh: () => void;
  setOpenNav: (e: boolean) => void;
  rename: (e: string) => void;
  openNav: boolean;
}) => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.replace("/");
    }
  }, []);

  return (
    <div className="h-screen overflow-y-hidden">
      <div className="story:hidden text-2xl p-4 text-center">
        AI ContentWriter works best on browsers at least 900px wide (Desktop or
        Tablet). Please switch to a larger browser
      </div>

      <div className="bg-lightGrey h-screen story:block hidden">
        <div className="page-layout h-full">
          <Sidebar
            writings={writings}
            refresh={refresh}
            open={openNav}
            rename={rename}
          />

          <div>
            <div className="">{children}</div>
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
