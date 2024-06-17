import chapter from "../assets/img/chapter.svg";
import { FaRegCopy, FaTimes } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { copyToClipboard } from "../utils/functions";
import Tooltip from "../layout/Tooltip";
import { useStore } from "zustand";
import store from "../store/state";
import { Link } from "react-router-dom";
import EmptyToken from "../layout/EmptyToken";

const Chapter = ({
  generate,
  beats,
  setBeats,

  generateProse,
  loadingBeats,
  loadingChapter,
  close,
  chapters,
  linked,
  loadingText,
}: {
  generate: () => void;
  close: () => void;
  setBeats: (e: string) => void;
  beats: string;
  generateProse: () => void;
  loadingChapter: boolean;
  loadingBeats: boolean;
  chapters: any;
  linked: string;
  loadingText: string;
}) => {
  const { user, token } = useStore(store);

  const newChapter = chapters && Object.values(chapters)?.flat();
  const currenLinked: any = newChapter?.find(
    (chap: any) => chap.chapter === linked
  );

  return (
    <div className="chapter-modal">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img src={chapter} alt="" />
            <div className="text-lg">Chapter Generator</div>
          </div>
          <button onClick={close}>
            <FaTimes />
          </button>
        </div>
        {currenLinked && (
          <div className="mt-2 italic">
            <span className="font-semibold">
              {currenLinked?.content.slice(0, 10)}
            </span>{" "}
            {currenLinked?.content.slice(10, 150)}
            {currenLinked?.content?.length > 150 && "..."}
          </div>
        )}
      </div>

      <div className="base -my-4">
        <div className="single-story">
          <div className="single-story-top">
            <div className="flex items-center gap-2">
              <img src={chapter} alt="" />
              <div className="font-semibold">Step 1: Beats</div>

              <Tooltip>
                <div className="mb-4">
                  Beats are a set of step-by-step instructions for the "Al" $ or
                  "junior writing partner" to follow when writing this Chapter.
                  Make sure each beat has enough detail to turn into $100-200$
                  words
                </div>

                <div className="my-4">
                  <div>Bad Beat: 1. Todd welcomes Eli to the mansion.</div>
                  <div>
                    Good Beat: 1. Todd says hi to Eli at the entrance of the
                    mansion. Describe the statues and art in the entrance. Then,
                    Todd shows Eli to his room, pointing out the Tuscan
                    architecture details and humble-bragging about the famous
                    people who have visited before.
                  </div>
                </div>

                <div className="my-4">
                  You can add special instructions for the "Al" in [square
                  brackets] for greater control. e.g. [Write Todd's dialogue in
                  the form of a limerick]
                </div>

                <div className="my-4">
                  <div>This section is generated based on:</div>
                  <ul>
                    <li>Braindump</li>
                    <li>Genre </li>
                    <li>Style</li>
                    <li> Synopsis </li>
                    <li>Characters </li>
                    <li>Outline</li>
                  </ul>
                </div>
              </Tooltip>
            </div>

            <div className="flex items-center gap-4 text-nowrap">
              <FaRegCopy
                className="cursor-pointer"
                onClick={() => copyToClipboard(beats)}
              />
              <EmptyToken text="Generate Beats">
                <button
                  className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4"
                  onClick={() => generate()}
                  disabled={loadingBeats}
                >
                  <BsStars />
                  {loadingBeats ? "Generating..." : "Generate Beats"}
                </button>
              </EmptyToken>
            </div>
          </div>

          <textarea
            className="single-story-textarea"
            placeholder={`Write a numbered list of Beats. Beats are step by step instructions for the AI for how to write your chapter. Each Beat needs enough meat to write 200 words or so.\n\ne.g. 1. Begin in Sarah’s home, where we see her drinking a cup of coffee and reading the paper. She hears a loud boom and rushes to the window where she sees an explosion in the distance. She panics and runs around the house looking for the rest of the family.`}
            value={beats}
            onChange={(e) => setBeats(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="base -mt-6 -mb-4">
        <div className="single-story">
          <div className="single-story-top">
            <div className="flex items-center gap-2">
              <img src={chapter} alt="" />
              <div className="font-semibold">Step 2: Prose</div>
              <Tooltip>
                <div className="my-4">
                  The Prose section generates a first draft for you to edit into
                  your manuscript
                </div>

                <div className="my-4">
                  <div>This section is generated based on:</div>
                  <ul>
                    <li>Genre </li>
                    <li>Characters </li>
                    <li>Style</li>
                    <li>This Chapter's Beats</li>
                  </ul>
                </div>
              </Tooltip>
            </div>

            {user && (
              <div className="flex items-center gap-4 text-nowrap">
                {user?.subscription?.trialUser || token < 1 ? (
                  <div className="relative group">
                    <button
                      className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4 opacity-80"
                      disabled={true}
                    >
                      <BsStars />
                      Generate Chapter
                    </button>

                    <div className="absolute -left-6 bg-neutral-800 top-10 text-white text-sm p-2 w-60 text-wrap rounded-md group-hover:block hidden">
                      This isn't available on your free trial.{" "}
                      <Link className="underline" to={"/billing"}>
                        Subscribe to Screbbi.
                      </Link>
                    </div>
                  </div>
                ) : (
                  <button
                    className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4"
                    onClick={() => generateProse()}
                    disabled={loadingChapter}
                  >
                    <BsStars />
                    {loadingChapter ? loadingText : "Generate Chapter"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter;

// OUTLINE SHIT
