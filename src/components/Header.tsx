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

          <div className="font-bold text-2xl md:text-4xl text-center max-w-3xl mx-auto my-8">
  Write a book in 5 days with Screbbi.
</div>

<div className="text-grey text-base md:text-lg text-center max-w-md mx-auto mb-8">
  Screbbi uses AI to guide you step-by-step from blank page to finished novel, blog, or screenplay.
</div>

<div className="buttons flex items-center gap-4 justify-center text-sm font-semibold">
  <button
    className="py-2 px-6 rounded-full text-white bg-black"
    onClick={() => navigate("/auth/register")}
  >
    Write for Free
  </button>
  <button
    className="py-2 px-6 rounded-full text-white bg-buttonPurple flex gap-2 items-center"
    onClick={() => setOpenTourVideo(v => !v)}
  >
    <FaPlay />
    Watch Tour
  </button>
</div>

          <div className="mt-6 mb-8 text-center text-sm text-gray-500">
  No credit card required · Cancel anytime · Built for Authors, Entrepreneurs & Creatives
</div>

<div className="relative mt-8">
  <img src={orangeBg} alt="" className="absolute left-10 -bottom-20" />
  <img src={lightOrangeBg} alt="" className="absolute right-20 top-0" />
  <img
    src={landing}
    alt=""
    className="w-5/6 max-w-3xl mx-auto relative"
  />
</div>

          <div className="font-semibold text-2xl md:text-3xl text-center mt-20">
  Powerful Tools for Every Writer
</div>

<div className="text-center text-grey font-medium mt-2">
  Whether you're writing a novel, a blog post, a children's book, or an academic essay — Screbbi helps you write better, faster.
</div>

        {/* FEATURES */}
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-4 w-11/12 max-w-5xl mx-auto my-10">
        <div className="feature"><span className="font-semibold">NON-FICTION WRITING: </span>Instructional books, Self-help, or Biographies
        </div>
        <div className="feature"><span className="font-semibold">NOVEL WRITING: </span>Plot integration, Character development, Scene creation</div>
        <div className="feature"><span className="font-semibold">SCREENWRITING: </span>Dialogue, Action, Scene descriptions
        </div>
        <div className="feature"><span className="font-semibold">CHILDREN'S BOOKS: </span>Story creation, Adaptable writing style</div>
        <div className="feature"><span className="font-semibold">GENERAL WRITING TASKS: </span>Essay writing, Blog posts, Emails and letters</div>
        <div className="feature"> <span className="font-semibold">STUDENTS: </span> Essay writing, Reports and case studies, Dissertations and theses, Creative writing assignments</div>
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
                Write full-length stories from beginning to end with ease. 
                Screbbi’s AI adapts to your unique voice, ensuring every paragraph flows naturally and carries the perfect tone, pacing, and style.
              </div>
            </div>

            <div className="text-center md:text-start">
              <div className="right-feature-icon-contaier">
                <img src={rewrite} alt="" />
              </div>
              <div className="right-feature-title">Rewrite</div>

              <div className="text-grey font-semibold">
                Rewrite effortlessly – let Screbbi polish your drafts for clarity and style. 
                Every sentence is refined to perfectly capture your intended voice.
              </div>
            </div>

            <div className="text-center md:text-start">
              <div className="right-feature-icon-contaier">
                <img src={describe} alt="" />
              </div>
              <div className="right-feature-title">Describe</div>

              <div className="text-grey font-semibold">
                Describe your scenes in vivid detail so readers truly connect with your characters. 
                Add layers of emotion and context to bring your narrative to life.
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
                Brainstorm fresh ideas instantly. Get creative sparks for plot twists, character development, 
                and setting details that lay the groundwork for a compelling story.
              </div>
            </div>

            <div className="text-center md:text-start">
              <div className="right-feature-icon-contaier">
                <TbPlugConnectedX className="text-white text-2xl" />
              </div>
              <div className="right-feature-title">Plugins</div>

              <div className="text-grey font-semibold">
                Leverage powerful plugins to supercharge your writing. 
                Integrate extra creative tools that boost your storytelling capabilities without losing your unique voice.
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
                <span className="font-semibold">Screbbi's Write</span> takes you
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
                Your personal guide to writing a complete novel 
                from idea to final draft.
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
                Struggling with the right words? Let Screbbi handle the rewrite.
              </div>

              <div className="text-grey font-semibold">
                Rewrite is like autocomplete on steroids. It analyzes your
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

        {/* TESTIMONIAL SECTION */}
<div className="bg-[#f9f9f9] py-16 px-6 md:px-12">
  <div className="text-center mb-12">
    <h2 className="text-2xl md:text-4xl font-bold mb-4 text-closeBlack">
      What Our Users Are Saying
    </h2>
    <p className="text-grey font-medium max-w-2xl mx-auto">
      Join thousands of satisfied writers using Screbbi to turn ideas into books, stories, and more — effortlessly.
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
    {[
      {
        name: "Emily",
        role: "Author",
        text: "Screbbi completely changed how I write. I went from procrastinating for months to finishing my book in under two weeks!",
      },
      {
        name: "Daniel",
        role: "Blogger",
        text: "I use Screbbi every single day. The Rewrite and Describe tools are life-savers when I get stuck.",
      },
      {
        name: "Chloe",
        role: "Creative Writer",
        text: "The pacing and dialogue suggestions feel like having a second brain. It feels like magic but real. I'm so happy I found this site!",
      },
      {
        name: "Oliver",
        role: "Student",
        text: "Screbbi helped me structure my essays, assignments and creative pieces faster. Super helpful tool. Highly recommended.",
      },
      {
        name: "Rachel",
        role: "Content Creator",
        text: "I've been using Screbbi for a while now and it's been great. Whenever I'm working on a landing page or writing up a new blog post, it helps me get my ideas out faster and more clearly. I'm easily creating content 3x faster than before.",
      },
      {
        name: "Jasmine",
        role: "Best-Selling Author",
        text: "Writing used to feel overwhelming, especially when I hit creative blocks. Screbbi helped me push past that. I finished my latest novel in record time, and it even gave me ideas I hadn’t thought of. It’s like having a co-author who never runs out of inspiration.",
      },
    ].map((review, i) => (
      <div key={i} className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-buttonPurple text-white flex items-center justify-center font-bold text-lg">
            {review.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold">{review.name}</div>
            <div className="text-sm text-gray-500">{review.role}</div>
          </div>
        </div>
        <div className="text-yellow-500 mb-2">
          {"★★★★★".split("").map((star, i) => (
            <span key={i}>{star}</span>
          ))}
        </div>
        <p className="text-sm text-gray-700">{review.text}</p>
      </div>
    ))}
  </div>
</div>

        {/* TRUST BADGES SECTION */}
<div className="bg-white py-12 px-6 md:px-12 border-t">
  <div className="max-w-6xl mx-auto text-center">
    <h3 className="text-xl md:text-2xl font-semibold mb-8 text-closeBlack">
      Trusted Technology. Built for Writers.
    </h3>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-700">
      <div className="flex flex-col items-center">
        <span className="text-3xl mb-2">⚡</span>
        <p>AI-Powered & Lightning Fast</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl mb-2">🔒</span>
        <p>Secure & SSL Encrypted</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl mb-2">🧠</span>
        <p>Smart Writing Suggestions</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl mb-2">🙌</span>
        <p>Used by Thousands of Authors</p>
      </div>
    </div>
  </div>
</div>

       {/* FINAL CTA SECTION */}
<div className="bg-gradient-to-br from-[#1c1c1e] to-[#2d2d30] text-white py-16 px-6 md:px-12 text-center relative z-10">
  <h2 className="text-2xl md:text-4xl font-bold mb-4">
    Ready to Start Writing Smarter?
  </h2>
  <p className="text-gray-300 mb-8 max-w-xl mx-auto">
    Sign up for free and see how Screbbi can help you write better, faster, and with less stress whether you're a seasoned author or just getting started.
  </p>

  <button
    onClick={() => navigate("/auth/register")}
    className="bg-buttonPurple text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-purple-700 transition"
  >
    Start Free – No Credit Card Needed
  </button>
</div>
   
        {/* FOOTER */}
        <Footer />
      </div>
    </div>
        </div>
    </div>
  );
};

export default Header;
