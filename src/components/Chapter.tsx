import chapter from "../assets/img/chapter.svg";
import { FaRegCopy, FaTimes } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { copyToClipboard } from "../utils/functions";

const Chapter = ({
  generate,
  beats,
  setBeats,
  prose,
  setProse,
  generateProse,
  loadingBeats,
  loadingChapter,
  close,
  chapters,
  linked,
}: {
  generate: () => void;
  close: () => void;
  setBeats: (e: string) => void;
  beats: string;
  generateProse: () => void;
  setProse: (e: string) => void;
  prose: string;
  loadingChapter: boolean;
  loadingBeats: boolean;
  chapters: any;
  linked: string;
}) => {
  const newChapter = Object.values(chapters).flat();
  const currenLinked: any = newChapter?.find(
    (chap: any) => chap.chapter === linked
  );

  return (
    <div className="absolute right-0 top-full bg-white w-full z-10 shadow-lg rounded-md">
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

      <div className="base">
        <div className="single-story">
          <div className="single-story-top">
            <div className="flex items-center gap-2">
              <img src={chapter} alt="" />
              <div className="font-semibold">Step 1: Beats</div>
            </div>

            <div className="flex items-center gap-4 text-nowrap">
              <FaRegCopy
                className="cursor-pointer"
                onClick={() => copyToClipboard(beats)}
              />
              <button
                className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4"
                onClick={() => generate()}
                disabled={loadingBeats}
              >
                <BsStars />
                {loadingBeats ? "Generating..." : "Generate Beats"}
              </button>
            </div>
          </div>

          <textarea
            className="single-story-textarea"
            placeholder="Write a braindump of everything you know about the story. You can include information about plot, characters, worldbuilding, theme - anything!"
            value={beats}
            onChange={(e) => setBeats(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="base">
        <div className="single-story">
          <div className="single-story-top">
            <div className="flex items-center gap-2">
              <img src={chapter} alt="" />
              <div className="font-semibold">Step 2: Prose</div>
            </div>

            <div className="flex items-center gap-4 text-nowrap">
              <FaRegCopy
                className="cursor-pointer"
                onClick={() => copyToClipboard(prose)}
              />
              <button
                className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4"
                onClick={() => generateProse()}
                disabled={loadingChapter}
              >
                <BsStars />
                {loadingChapter ? "Generating..." : "Generate Chapter"}
              </button>
            </div>
          </div>

          <textarea
            className="single-story-textarea"
            placeholder="Write a braindump of everything you know about the story. You can include information about plot, characters, worldbuilding, theme - anything!"
            value={prose}
            onChange={(e) => setProse(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Chapter;

// OUTLINE SHIT
