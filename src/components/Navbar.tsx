import appLogo from "../assets/img/logo.svg";

const Navbar = () => {
  return (
    <div className="bg-white/80 py-4 sticky top-0 z-10">
      <div className="flex justify-between w-11/12 mx-auto">
        <div className="logo">
          <img src={appLogo} alt="" />
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

            <button>Login</button>
            <button className="py-2 px-4 rounded-md text-white bg-buttonPurple">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
