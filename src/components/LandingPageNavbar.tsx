import { Link, useLocation } from "react-router-dom";
import appLogo from "../assets/img/ai-logo.png";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import { useEffect, useState } from "react";

const LandingPageNavbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative w-screen">
      <div className="bg-white/80 p-4 relative top-0 z-20">
        <div className="flex justify-between">
          <div className="flex items-center gap-3 relative z-30">
            <Link to={"/"}>
              <div className="logo flex items-center gap-2">
                <img src={appLogo} alt="" className="h-10" />
              </div>
            </Link>
          </div>

          <div className="links flex items-center gap-4">
            <Link to={"/billing"}>
              <button>Pricing</button>
            </Link>

            {/* {localStorage.getItem("token") && <img src={profile} alt="" />} */}

            <div className="hidden md:flex gap-6 items-center">
              <Link to={"/auth/login"}>
                <button>Login</button>
              </Link>

              <Link to={"/auth/register"} className="w-full">
                <button className="py-2 px-4 rounded-md text-white bg-buttonPurple w-full">
                  Sign Up
                </button>
              </Link>
            </div>

            <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
              {!open ? <HiOutlineMenuAlt3 /> : <HiOutlineMenuAlt2 />}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div
          className={`absolute md:hidden duration-300 bg-white z-30 top-full p-6 flex flex-col items-center gap-6  ${
            open ? "right-0" : "-right-60"
          } `}
        >
          <div className="">
            <div className="flex flex-col gap-6 items-center">
              <Link to={"/billing"}>
                <button>Pricing</button>
              </Link>

              <div className="text-center flex flex-col gap-6">
                <Link to={"/auth/login"}>
                  <button>Login</button>
                </Link>

                <Link to={"/auth/register"} className="w-full">
                  <button className="py-2 px-4 rounded-md text-white bg-buttonPurple w-full">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPageNavbar;
