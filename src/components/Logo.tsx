import appLogo from "../assets/img/ai-logo.png";

const Logo = () => {
  return (
    <div className="logo flex items-center gap-2">
      <img src={appLogo} alt="" className="h-8" />
    </div>
  );
};

export default Logo;
