import appLogo from "../assets/img/ai-logo.png";

const Logo = () => {
  return (
    <div className="logo flex items-center gap-2">
      <img src={appLogo} alt="" className="w-8" />
      <div className="font-bold text-lg">Screbbi</div>
    </div>
  );
};

export default Logo;
