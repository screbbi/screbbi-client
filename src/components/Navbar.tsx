import { Link } from "react-router-dom";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import OpenSettings from "./OpenSettings";

const Navbar = ({
  setOpen,
  open,
}: {
  setOpen?: () => void;
  open?: boolean;
}) => {
  return (
    <div className="bg-white/80 p-4 sticky top-0 z-20 lg:z-30">
      <div className="flex justify-between lg:justify-end">
        <div className="flex items-center gap-3 relative z-30">
          {setOpen && (
            <div className="text-3xl lg:hidden" onClick={setOpen}>
              {open ? <HiOutlineMenuAlt3 /> : <HiOutlineMenuAlt2 />}
            </div>
          )}
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

            {localStorage.getItem("token") && <OpenSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
