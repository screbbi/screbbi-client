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
import rewritePng from "../assets/img/rewrite.png";
import landing from "../assets/img/landing.png";
import { FaPlay } from "react-icons/fa";
import { MdDraw } from "react-icons/md";

const Header = () => {
  return (
    <div className="">
      <div className="relative overflow-hidden min-h-[100vh]">
        <img src={greenBg} alt="" className="absolute -right-10 -top-8" />
        <img src={purpleBg} alt="" className="absolute -left-10 -top-8" />

        <Navbar />

        <div className="mt-20 mb-12">
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
            <button className="py-2 px-6 rounded-full text-white bg-black">
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

          <div className="font-semibold text-md text-center mt-20">
            Try Our Powerful, All-in-One AI Writing
          </div>
        </div>

        {/* FEATURES */}
        <div className="flex justify-between features w-11/12 mx-auto my-10">
          <div className="feature">AI Essay Writer</div>
          <div className="feature">Essay Rewriter</div>
          <div className="feature">Essay Shortener</div>
          <div className="feature">Essay Extender</div>
          <div className="feature">Essay Introduction Generator</div>
          <div className="feature">Free Essay Conclusion Generator </div>
        </div>

        {/* RIGHT FEATURES */}
        <div className="right-feature py-16">
          <div className="font-semibold text-xl text-center mb-10">
            The right features for your use case
          </div>

          {/* MAIN RIGHT FEATURES */}
          <div className="grid grid-cols-3 mx-auto w-9/12 gap-8">
            <div className="">
              <div className="right-feature-icon-contaier">
                <MdDraw className="text-white text-2xl" />
              </div>
              <div className="right-feature-title">Write</div>

              <div className="text-grey font-semibold">
                Write a story from start to finish, with a perfect tone for each
                paragraph and ablilty to select from various tone{" "}
              </div>
            </div>

            <div className="">
              <div className="right-feature-icon-contaier">
                <img src={rewrite} alt="" />
              </div>
              <div className="right-feature-title">Rewrite</div>

              <div className="text-grey font-semibold">
                Delegate the task to find the perfect word, every time
              </div>
            </div>

            <div className="">
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

        {/* ANOTHER SECTION WRITE */}
        <div className="grid-section">
          <div className="w-4/6">
            <div className="flex items-center text-sm gap-4">
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

            <button className="py-2 px-6 rounded-full text-white bg-black mt-3">
              Try for free
            </button>
          </div>
          <div className="w-full">
            <img src={write} alt="" className="w-full" />
          </div>
        </div>

        {/* STORY ENGINE */}
        <div className="grid-section">
          <div className="w-full">
            <img src={story} alt="" className="w-full" />
          </div>

          <div className="ml-[30%] w-4/6">
            <div className="flex items-center text-sm gap-4">
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

            <button className="py-2 px-6 rounded-full text-white bg-black mt-3">
              Try for free
            </button>
          </div>
        </div>

        {/* ANOTHER SECTION WRITE */}
        <div className="grid-section">
          <div className="w-4/6">
            <div className="flex items-center text-sm gap-4">
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

            <button className="py-2 px-6 rounded-full text-white bg-black mt-3">
              Try for free
            </button>
          </div>
          <div className="w-full">
            <img src={believe} alt="" />
            <img src={rewritePng} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
