import { Link } from "react-router-dom";
import logo from "../assets/img/ai-logo-white.png";

const Footer = () => {
  return (
    <footer className="bg-whatNewText py-16">
      <div className="text-sm w-11/12 mx-auto max-w-4xl grid md:grid-cols-4 grid-cols-2 gap-4">
        <div className="text-white text-2xl font-semibold col-span-2 lg:col-span-1">
          <img src={logo} alt="" className="h-10" />
        </div>
        <div className="">
          <div className="text-white">LEARN</div>
          <div className="text-grey my-2">
            <Link to={"/faq"}>FAQs</Link>
          </div>
        </div>

        <div className="">
          <div className="text-white">CONNECT</div>
          <div className="text-grey my-2">
            <a href="https://www.instagram.com/screbbi/" target="_blank">
              Join us on Instagram
            </a>
          </div>
          <div className="text-grey my-2">
            <a href={"mailto:hi@screbbi.com"}>Email us</a>
          </div>
        </div>

        <div className="">
          <div className="text-white">LEGAL</div>
          <div className="text-grey my-2">
            <Link to={"/terms-and-conditions"}>Terms & Conditions</Link>
          </div>
          <div className="text-grey my-2">
            <Link to={"/privacy-policies"}>Privacy Policy</Link>
          </div>
        </div>
      </div>

      <div className="text-grey text-center font-semibold mt-8">
        © 2024 Screbbi Platform. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
