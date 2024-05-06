import Navbar from "./Navbar";
import greenBg from "../assets/img/green-header-bg.svg";
import purpleBg from "../assets/img/purple-header-bg.svg";
import orangeBg from "../assets/img/orange-header-bg.svg";
import lightOrangeBg from "../assets/img/light-orange-header-bg.svg";
import describe from "../assets/img/describe.svg";
import rewrite from "../assets/img/rewrite.svg";
import write from "../assets/img/write.png";
import story from "../assets/img/story.png";
import believe from "../assets/img/believe.png";
import description from "../assets/img/description.png";
import pacing from "../assets/img/pacing.png";
import rewritePng from "../assets/img/rewrite.png";
import landing from "../assets/img/landing.png";
import { FaPlay } from "react-icons/fa";
import { MdDraw } from "react-icons/md";
import FAQ from "./FAQ";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="relative overflow-hidden min-h-[100vh]">
        <img src={greenBg} alt="" className="absolute -right-10 -top-8" />
        <img src={purpleBg} alt="" className="absolute -left-10 -top-8" />

        {/* <Navbar /> */}

        <div className="mt-20 mb-12 relative z-10">
          <div className="flex items-center text-sm justify-center gap-4">
            <div className="py-2 px-4 rounded-full text-white bg-buttonPurple">
              New
            </div>

            <div className="font-semibold">Powered GPT-based models</div>
          </div>

          <div className="font-semibold text-4xl text-center max-w-md mx-auto my-8">
            AI mind writer powered by Chatgpt
          </div>

          <div className=" font-semibold text-grey text-center max-w-sm mx-auto my-8">
            AI-powered text generation and editing suggestions
          </div>

          <div className="buttons flex items-center gap-4 justify-center text-sm font-semibold">
            <button
              className="py-2 px-6 rounded-full text-white bg-black"
              onClick={() => navigate("/auth/register")}
            >
              Try for free
            </button>
            <button className="py-2 px-6 rounded-full text-white bg-buttonPurple flex gap-2 items-center">
              <FaPlay />
              Watch Tour
            </button>
          </div>
        </div>

        <div className="relative">
          <img src={orangeBg} alt="" className="absolute left-10 -bottom-20" />
          <img src={lightOrangeBg} alt="" className="absolute right-20 top-0" />
          <img
            src={landing}
            alt=""
            className="w-5/6 max-w-3xl mx-auto relative z-10"
          />

          <div className="font-semibold text-lg text-center mt-20">
            Try Our Powerful, All-in-One AI Writing
          </div>
        </div>

        {/* FEATURES */}
        <div className="flex justify-center md:justify-between features w-11/12 mx-auto my-10 flex-wrap gap-4">
          <div className="feature">AI Essay Writer</div>
          <div className="feature">Essay Rewriter</div>
          <div className="feature">Essay Shortener</div>
          <div className="feature">Essay Extender</div>
          <div className="feature">Essay Introduction Generator</div>
          <div className="feature">Free Essay Conclusion Generator </div>
        </div>

        {/* RIGHT FEATURES */}
        <div className="right-feature py-16 px-4">
          <div className="font-semibold text-xl md:text-3xl text-center mb-14">
            The right features for your use case
          </div>

          {/* MAIN RIGHT FEATURES */}
          <div className="grid md:grid-cols-3 mx-auto w-9/12 gap-8">
            <div className="text-center md:text-start">
              <div className="right-feature-icon-contaier">
                <MdDraw className="text-white text-2xl" />
              </div>
              <div className="right-feature-title">Write</div>

              <div className="text-grey font-semibold">
                Write a story from start to finish, with a perfect tone for each
                paragraph and ablilty to select from various tone{" "}
              </div>
            </div>

            <div className="text-center md:text-start">
              <div className="right-feature-icon-contaier">
                <img src={rewrite} alt="" />
              </div>
              <div className="right-feature-title">Rewrite</div>

              <div className="text-grey font-semibold">
                Delegate the task to find the perfect word, every time
              </div>
            </div>

            <div className="text-center md:text-start">
              <div className="right-feature-icon-contaier">
                <img src={describe} alt="" />
              </div>
              <div className="right-feature-title">Describe</div>

              <div className="text-grey font-semibold">
                Describing allows readers to better empathize with your
                characters.
              </div>
            </div>
          </div>
        </div>

        {/* GRID SECTIONS */}
        <div>
          {/* WRITE */}
          <div className="grid-section">
            <div className="w-full lg:w-4/6">
              <div className="flex justify-center md:justify-start items-center text-sm gap-4">
                <div className="py-2 px-4 rounded-full text-white bg-buttonPurple">
                  AI
                </div>

                <div className="font-semibold">Write</div>
              </div>

              <div className="text-closeBlack text-xl font-semibold my-4">
                Write assists in generating text when you are unable to find the
                right words
              </div>

              <div className="text-grey font-semibold">
                It analyzes your writing style and produces the following 300
                words in your tone. The tool also provides different choices for
                you to select from.
              </div>

              <button
                className="py-2 px-6 rounded-full text-white bg-black mt-3 text-sm"
                onClick={() => navigate("/auth/register")}
              >
                Try for free
              </button>
            </div>

            <div className="w-full max-w-sm mx-auto">
              <img src={write} alt="" className="w-full" />
            </div>
          </div>

          {/* STORY ENGINE */}
          <div className="grid-section">
            <div className="w-full max-w-sm mx-auto">
              <img src={story} alt="" className="w-full" />
            </div>

            <div className="lg:ml-[30%] w-full lg:w-4/6">
              <div className="flex justify-center md:justify-start items-center text-sm gap-4">
                <div className="py-2 px-4 rounded-full text-white bg-buttonPurple">
                  AI
                </div>

                <div className="font-semibold">Story Engine</div>
              </div>

              <div className="text-closeBlack text-xl font-semibold my-4">
                Story Engine guides you through writing a complete novel in a
                short period
              </div>

              <div className="text-grey font-semibold">
                Embark on a journey with Story Engine as it guides you through
                generating ideas, creating outlines, developing chapters, and
                producing thousands of words in your unique writing style.
              </div>

              <button
                className="py-2 px-6 rounded-full text-white bg-black mt-3 text-sm"
                onClick={() => navigate("/auth/register")}
              >
                Try for free
              </button>
            </div>
          </div>

          {/* ANOTHER SECTION WRITE */}
          <div className="grid-section">
            <div className="w-full lg:w-4/6">
              <div className="flex justify-center md:justify-start items-center text-sm gap-4">
                <div className="py-2 px-4 rounded-full text-white bg-buttonPurple">
                  AI
                </div>

                <div className="font-semibold">Rewrite</div>
              </div>

              <div className="text-closeBlack text-xl font-semibold my-4">
                Discovering the ideal word is always a breeze! 
              </div>

              <div className="text-grey font-semibold">
                How about just two clicks to reach the heart of a well-crafted
                sentence?
              </div>

              <button
                className="py-2 px-6 rounded-full text-white bg-black mt-3 text-sm"
                onClick={() => navigate("/auth/register")}
              >
                Try for free
              </button>
            </div>

            <div className="w-full max-w-sm mx-auto">
              <img src={believe} alt="" />
              <img src={rewritePng} alt="" />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="grid-section">
            <div className="w-full max-w-sm mx-auto">
              <img src={description} alt="" className="w-full" />
            </div>

            <div className="lg:ml-[30%] w-full lg:w-4/6">
              <div className="flex justify-center md:justify-start items-center text-sm gap-4">
                <div className="py-2 px-4 rounded-full text-white bg-buttonPurple">
                  AI
                </div>

                <div className="font-semibold">Descriptions</div>
              </div>

              <div className="text-closeBlack text-xl font-semibold my-4">
                Painting a vivid picture in the mind through descriptions
              </div>

              <div className="text-grey font-semibold">
                Focusing solely on action and dialogue in writing may result in
                a lack of depth. Describing details can enhance reader
                engagement with characters and create a sense of presence.
              </div>

              <button
                className="py-2 px-6 rounded-full text-white bg-black mt-3 text-sm"
                onClick={() => navigate("/auth/register")}
              >
                Try for free
              </button>
            </div>
          </div>

          {/* PACING */}
          <div className="grid-section">
            <div className="w-full lg:w-4/6">
              <div className="flex justify-center md:justify-start items-center text-sm gap-4">
                <div className="py-2 px-4 rounded-full text-white bg-buttonPurple">
                  AI
                </div>

                <div className="font-semibold">Pacing</div>
              </div>

              <div className="text-closeBlack text-xl font-semibold my-4">
                Pacing may feel rushed despite thorough planning
              </div>

              <div className="text-grey font-semibold">
                Expand feature helps build scenes to maintain pacing in the
                story.
              </div>

              <button
                className="py-2 px-6 rounded-full text-white bg-black mt-3 text-sm"
                onClick={() => navigate("/auth/register")}
              >
                Try for free
              </button>
            </div>
            <div className="w-full max-w-sm mx-auto">
              <img src={pacing} alt="" />
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="w-[90%] max-w-md mx-auto py-16">
          <div className="font-bold text-2xl mb-6 p-2">FAQ</div>

          <FAQ />
          <FAQ />
          <FAQ />
          <FAQ />
          <FAQ />
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
};

export default Header;
