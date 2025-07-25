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
import landing from "../assets/img/landing.png";
import { FaPlay } from "react-icons/fa";
import { MdDraw } from "react-icons/md";
import { LuBrain } from "react-icons/lu";
import { IoExpand } from "react-icons/io5";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import LandingPageNavbar from "./LandingPageNavbar";
import { TbPlugConnectedX } from "react-icons/tb";
import { useState } from "react";
import VideoTourModal from "./VideoTourModal";

const Header = () => {
  const [openTourVideo, setOpenTourVideo] = useState(false)

  const navigate = useNavigate();

  return (
    <div className="">
      <div className="relative overflow-hidden min-h-[100vh]">
        <img src={greenBg} alt="" className="absolute -right-10 -top-8" />
        <img src={purpleBg} alt="" className="absolute -left-10 -top-8" />

        <LandingPageNavbar />

        <div className="mt-20 mb-12 relative z-10">
          <div className="flex items-center text-sm justify-center gap-4">
            <div className="py-2 px-4 rounded-full text-white bg-buttonPurple">
              New
            </div>

            <div className="font-semibold">Powered AI-based models</div>
          </div>

          <div className="font-semibold text-base md:text-3xl text-center max-w-4xl mx-auto my-8 w-11/12">
            Welcome to Screbbi.
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
            <button
              className="py-2 px-6 rounded-full text-white bg-buttonPurple flex gap-2 items-center"
              onClick={() => setOpenTourVideo(v => !v)}
            >
              <FaPlay />
              Watch Tour
            </button>

            {openTourVideo && <VideoTourModal close={() => {
              setOpenTourVideo(v => !v);
              return openTourVideo
            }}/>}
          </div>
        </div>

        <div className="relative">
          <img src={orangeBg} alt="" className="absolute left-10 -bottom-20" />
          <img src={lightOrangeBg} alt="" className="absolute right-20 top-0" />
          <img
            src={landing}
            alt=""
            className="w-5/6 max-w-3xl mx-auto relative"
          />

          <div className="font-semibold text-lg text-center mt-20">
            Try Our Powerful, All-in-One AI Writing
          </div>
        </div>

        {/* FEATURES */}
        <div className="flex justify-center features w-11/12 mx-auto my-10 flex-wrap gap-4">
        <div className="feature"><span className="font-semibold">NON-FICTION WRITING: </span>instructional books, self-help, or biographies
        </div>
        <div className="feature"><span className="font-semibold">NOVEL WRITING: </span>plot integration, character development, scene creation</div>
        <div className="feature"><span className="font-semibold">SCREENWRITING: </span>dialogue, action, scene descriptions
        </div>
        <div className="feature"><span className="font-semibold">CHILDREN'S BOOKS: </span>story creation, adaptable writing style</div>
        <div className="feature"><span className="font-semibold">GENERAL WRITING TASKS: </span>Essay writing, blog posts, emails and letters</div>
        <div className="feature"> <span className="font-semibold">STUDENTS: </span> Essay writing, reports and case studies, dissertations and theses, creative writing assignments</div>
          {/* <div className="feature">AI Essay Writer</div>
          <div className="feature">Essay/Novel Rewriter</div>
          <div className="feature">Essay/Novel Shortener</div>
          <div className="feature">Essay/Novel Extender</div>
          <div className="feature">Essay/Novel Introduction Generator</div>
          <div className="feature">Free Essay Conclusion Generator </div> */}
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
                paragraph and ability to select from various tone.
              </div>
            </div>

            <div className="text-center md:text-start">
              <div className="right-feature-icon-contaier">
                <img src={rewrite} alt="" />
              </div>
              <div className="right-feature-title">Rewrite</div>

              <div className="text-grey font-semibold">
                Delegate the task to find the perfect word, every time.
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

            <div className="text-center md:text-start">
              <div className="right-feature-icon-contaier">
                <IoExpand className="text-white text-2xl" />
              </div>
              <div className="right-feature-title">Expand</div>

              <div className="text-grey font-semibold">
                Adds detail and depth to a story element, enriching descriptions
                and development while keeping the original tone consistent.
              </div>
            </div>

            <div className="text-center md:text-start">
              <div className="right-feature-icon-contaier">
                <LuBrain className="text-white text-2xl" />
              </div>
              <div className="right-feature-title">Brainstorm</div>

              <div className="text-grey font-semibold">
                It sparks a variety of ideas for plot, characters, settings, and
                themes, nurturing creativity and forming a strong narrative
                base.
              </div>
            </div>

            <div className="text-center md:text-start">
              <div className="right-feature-icon-contaier">
                <TbPlugConnectedX className="text-white text-2xl" />
              </div>
              <div className="right-feature-title">Plugins</div>

              <div className="text-grey font-semibold">
                Expands creative tools, enriching narratives and character
                development while preserving the writer's unique voice.
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
                Write a novel from start to finish in a week.
              </div>

              <div className="text-grey font-semibold">
                <span className="font-semibold">Story Guide</span> takes you
                step-by-step from idea, to outline, to beating out chapters, and
                then writes 1,000s of words, in your style.
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

                <div className="font-semibold">Story Guide</div>
              </div>

              <div className="text-closeBlack text-xl font-semibold my-4">
                Story Guide guides you through writing a complete novel in a
                short period.
              </div>

              <div className="text-grey font-semibold">
                Embark on a journey with Story Guide as it guides you through
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
                When the words just won’t come out – Write can do it for you.
              </div>

              <div className="text-grey font-semibold">
                Write is like autocomplete on steroids. It analyzes your
                characters, tone, and plot arc and generates the next 300 words
                in your voice. It even gives you options!
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
                Blank page, begone! Descriptions that paint a picture in the
                mind, without bogging down the story.
              </div>

              <div className="text-grey font-semibold">
                If you only focus on action and dialogue, writing can feel flat.
                Describe makes it easy to help your readers connect to your
                characters and feel like they’re really “there”.
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
                Pacing too fast?{" "}
                <span className="text-no-wrap">Presto&nbsp;expand–o</span>
              </div>

              <div className="text-grey font-semibold">
                No matter how much time you spend planning, you’ll end up with
                some sections that feel rushed. Expand magically builds out your
                scenes so the pacing doesn’t take readers out of the story.
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

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
};

export default Header;
