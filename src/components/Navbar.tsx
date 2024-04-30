import { Link } from "react-router-dom";
// import appLogo from "../assets/img/logo.svg";
import appLogo from "../assets/img/ai-logo.png";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";

const Navbar = ({ setOpen, open }: { setOpen: () => void; open: boolean }) => {
  return (
    <div className="bg-white/80 p-4 sticky top-0 z-10">
      <div className="flex justify-between">
        <div className="flex items-center gap-3 relative z-30">
          <div className="text-3xl" onClick={setOpen}>
            {open ? <HiOutlineMenuAlt3 /> : <HiOutlineMenuAlt2 />}
          </div>
          <div className="logo flex items-center gap-2">
            <img src={appLogo} alt="" className="w-10" />
            <div className="font-bold text-xl">AI ContentWriter</div>
          </div>
        </div>

        <div className="links flex items-center divide-x-2">
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
      </div>
    </div>
  );
};

export default Navbar;
