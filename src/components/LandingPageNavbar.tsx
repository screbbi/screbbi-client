import { Link } from "react-router-dom";
import appLogo from "../assets/img/ai-logo.png";
import profile from "../assets/img/profile.svg";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";

const LandingPageNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div className="bg-white/80 p-4 relative top-0 z-20">
        <div className="flex justify-between">
          <div className="flex items-center gap-3 relative z-30">
            <div className="logo flex items-center gap-2">
              <img src={appLogo} alt="" className="w-10" />
              <div className="font-bold text-xl">AI ContentWriter</div>
            </div>
          </div>

          <div className="links flex items-center gap-4">
            <div className="flex items-center divide-x-2 gap-4">
              <div className="linkes pr-4">
                <button>Support</button>
              </div>

              <div className="linkes pl-4">
                <button className="text-whatNewText border border-whatNewBorder py-2 px-4 rounded-md outline-none flex items-center gap-2">
                  <div className="dot bg-whatNewBorder rounded-full w-2 h-2"></div>
                  What New
                </button>

                {!localStorage.getItem("token") && (
                  <div className="flex gap-2 items-center">
                    <Link to={"/auth/login"}>
                      <button>Login</button>
                    </Link>

                    <Link to={"/auth/register"}>
                      <button className="py-2 px-4 rounded-md text-white bg-buttonPurple">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <img src={profile} alt="" />

            <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
              {!open ? <HiOutlineMenuAlt3 /> : <HiOutlineMenuAlt2 />}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute md:hidden duration-300 bg-white z-30 top-full p-6 flex flex-col items-center gap-6 ${
          open ? "right-0" : "-right-60"
        } `}
      >
        <div className="pr-4">
          <button>Support</button>
        </div>

        <div className="">
          <button className="text-whatNewText border border-whatNewBorder py-2 px-4 rounded-md outline-none flex items-center gap-2 mb-6">
            <div className="dot bg-whatNewBorder rounded-full w-2 h-2"></div>
            What New
          </button>

          {!localStorage.getItem("token") && (
            <div className="flex flex-col gap-6 items-center">
              <Link to={"/auth/login"}>
                <button>Login</button>
              </Link>

              <Link to={"/auth/register"} className="w-full">
                <button className="py-2 px-4 rounded-md text-white bg-buttonPurple w-full">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
