const Footer = () => {
  return (
    <footer className="bg-whatNewText py-16">
      <div className="text-sm w-11/12 mx-auto max-w-4xl grid grid-cols-4">
        <div className="text-white text-2xl font-semibold">AI WRITER</div>
        <div className="">
          <div className="text-white">LEARN</div>
          <div className="text-grey my-2">Changelog</div>
          <div className="text-grey my-2">Testimonials</div>
          <div className="text-grey my-2">FAQ</div>
        </div>

        <div className="">
          <div className="text-white">CONNECT</div>
          <div className="text-grey my-2">Join Our Discord</div>
          <div className="text-grey my-2">Become an Affiliate</div>
          <div className="text-grey my-2">Join us on X</div>
          <div className="text-grey my-2">Email us</div>
        </div>

        <div className="">
          <div className="text-white">LEGAL</div>
          <div className="text-grey my-2">Terms & Conditions</div>
          <div className="text-grey my-2">Privacy Policy</div>
        </div>
      </div>

      <div className="text-grey text-center font-semibold mt-8">
        © 2024 AI Writer Platform. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
