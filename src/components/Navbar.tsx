import { Link } from "react-router-dom";
import appLogo from "../assets/img/ai-logo.png";
import profile from "../assets/img/profile.svg";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";

const Navbar = ({
  setOpen,
  open,
}: {
  setOpen?: () => void;
  open?: boolean;
}) => {
  return (
    <div className="bg-white/80 p-4 sticky top-0 z-10">
      <div className="flex justify-between">
        <div className="flex items-center gap-3 relative z-30">
          {setOpen && (
            <div className="text-3xl lg:hidden" onClick={setOpen}>
              {open ? <HiOutlineMenuAlt3 /> : <HiOutlineMenuAlt2 />}
            </div>
          )}
          <Link to={"/home"}>
            <div className="logo flex items-center gap-2">
              <img src={appLogo} alt="" className="w-10" />
              <div className="font-bold text-xl">AI ContentWriter</div>
            </div>
          </Link>
        </div>

        <div className="links flex items-center divide-x-2">
          <div className="linkes pl-4">
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

            {localStorage.getItem("token") && <img src={profile} alt="" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
