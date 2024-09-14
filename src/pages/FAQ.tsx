import { FaPlay } from "react-icons/fa";
import Footer from "../components/Footer";
import LandingPageNavbar from "../components/LandingPageNavbar";
import SingleFAQ from "../components/SingleFAQ";
import { openTourVideo } from "../utils/functions";
import { useState } from "react";
import VideoTourModal from "../components/VideoTourModal";

const FAQ = () => {
  const [openVideo, setOpenVideo] = useState(false)

  return (
    <div className="faq billing min-h-screen">
      <LandingPageNavbar />

      <img
        src="https://editor.sudowrite.com/assets/sorbet-background.png"
        alt=""
        className="fixed top-0 left-0 -z-10 w-full h-full"
      />

      <div className="max-w-3xl w-10/12 mx-auto  relative z-10 my-10">
        <div className="text-2xl text-center font-semibold mb-4">
          Frequently Asked Questions
        </div>

        <SingleFAQ title="What does Screbbi do, really?">
          <div>
            <div>Check out the video below for a full explanation.</div>
            <button
              className="py-2 px-6 rounded-full text-white bg-buttonPurple flex gap-2 items-center mt-2"
              onClick={() => setOpenVideo(v => !v)}
            >
              <FaPlay />
              Watch tour
            </button>
          </div>
        </SingleFAQ>

        {openVideo && <VideoTourModal close={() => setOpenVideo(v => !v)} />}

        <SingleFAQ title="Which languages does Screbbi support?">
          <div>
            <div>
              You can write in nearly any language, click Write, and Screbbi
              will provide suggestions in that language. For other features,
              Screbbi may default to English if uncertain. Test it out with our
              free trial to see how it performs for you!
            </div>
          </div>
        </SingleFAQ>

        <SingleFAQ title="Is this magic?">
          <div>
            <div>Absolutely. But isn't life magical too?</div>
          </div>
        </SingleFAQ>

        <SingleFAQ title="Does Screbbi claim any rights over my work?">
          <div>
            <div>
              We do not claim any rights over the content you input into Screbbi
              or the output it generates for you.
            </div>
          </div>
        </SingleFAQ>

        <SingleFAQ title="Can Screbbi produce plagiarized content?">
          <div>
            <div>
              In short, Screbbi will not plagiarize unless you force it to,
              which is against our terms of service.
            </div>
            <div>
              The AI predicts one word at a time based on extensive training
              with billions of text samples. This makes it extremely unlikely to
              produce identical sequences of words. It doesn't copy and paste;
              it predicts each word individually.
            </div>
            <div>
              The only way to make Screbbi plagiarize is to input text it has
              seen before verbatim, like popular song lyrics or famous book
              excerpts. As long as your writing is original, Screbbi's output
              will be too. We recommend using plagiarism checkers to confirm
              your results.
            </div>
          </div>
        </SingleFAQ>

        <SingleFAQ title="Is using Screbbi cheating?">
          <div>
            <div>
              Screbbi is a creative tool. It’s designed to help you enhance and
              expedite your writing process, not to write for you. Like a great
              writing partner, Screbbi helps you overcome writer's block and
              brainstorm ideas, making writing faster, more enjoyable, and less
              isolating.
            </div>
          </div>
        </SingleFAQ>

        <SingleFAQ title="What language models does Screbbi use?">
          <div>
            <div>
              We utilize over two dozen AI models, including Claude 2 by
              Anthropic, various open models, and multiple versions of GPT-3.5
              and GPT-4 from OpenAI. OpenAI's models are trained on:
            </div>
            <div> (1) a filtered version of the CommonCrawl dataset,</div>
            <div>(2) an expanded Webtext dataset,</div>
            <div>(3) two internet-based book corpora, and</div>
            <div>
              (4) English-language Wikipedia. We combine these with proprietary
              narrative models and algorithmic pre- and postprocessing for
              unique AI writing features.
            </div>
          </div>
        </SingleFAQ>

        <SingleFAQ title="Does Screbbi learn from my writing?">
          <div>
            <div>
              We continuously improve Screbbi based on user feedback, but we do
              not use your writing to train Screbbi or OpenAI's models.
            </div>
          </div>
        </SingleFAQ>

        <SingleFAQ title="How do I cancel before signing up?">
          <div>
            <div>
              It’s simple. Visit your subscription page and click cancel. No
              phone calls required, no hassle.
            </div>
          </div>
        </SingleFAQ>

        <SingleFAQ title="If I cancel, do I lose access to my work in Screbbi?">
          <div>
            <div>
              You can still access and work on your projects in Screbbi, but AI
              features will be unavailable without a paid subscription. Your
              writing will always be accessible.
            </div>
          </div>
        </SingleFAQ>

        <SingleFAQ title="Didn't see your question here?">
          <div>
            <div>
              {/* Contact us directly! (Please make contact us directly linked to
              our email{" "}
              ) */}
              <a href="mailto:hi@screbbi.com" className="text-blue-700">
                Contact Us
              </a>
            </div>
          </div>
        </SingleFAQ>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
