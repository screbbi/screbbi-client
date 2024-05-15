import { PiBrainThin } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa6";
import { LuHistory } from "react-icons/lu";
import { PiFlowerTulipDuotone } from "react-icons/pi";
import { GiMustache } from "react-icons/gi";
import { BsStars } from "react-icons/bs";

const StoryBible = () => {
  return (
    <div className="max-w-lg mx-auto mt-4">
      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <PiBrainThin />
            <div className="font-semibold">Braindump</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold">0/2000 words</div>
            <FaRegCopy />
            <LuHistory />
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder="Write a braindump of everything you know about the story. You can include information about plot, characters, worldbuilding, theme - anything!"
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <PiFlowerTulipDuotone />
            <div className="font-semibold">Genre</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold">0/40 words</div>
            <FaRegCopy />
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder="What genre are you writing in? Feel free to include sub-genres and tropes. Examples: Romance, Horror, Fantasy, Cozy mystery, Friends-to-Lovers, Gumshoe"
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <GiMustache />
            <div className="font-semibold">Style</div>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            <div className="text-sm font-semibold">0/40 words</div>
            <FaRegCopy />
            <button className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4">
              <BsStars />
              Match my style
            </button>
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder="Write the style of prose you want Story Bible to write. e.g. short sentences, lots of dialogue, show don’t tell"
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <GiMustache />
            <div className="font-semibold">Synopsis</div>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            <div className="text-sm font-semibold">0/800 words</div>
            <FaRegCopy />
            <button className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4">
              <BsStars />
              Generate Synopsis
            </button>
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder="Introduce the characters, their goals, and the central conflict, while conveying the story's tone, themes, and unique elements."
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <GiMustache />
            <div className="font-semibold">Characters</div>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            <div className="text-sm font-semibold">0/700 words</div>
            <FaRegCopy />
            <button className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4">
              <BsStars />
              Generate Characters
            </button>
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder="Describe everything the AI should know about your characters when writing them in scenes. Consider physical appearance, mannerisms, how they relate to other characters, and their motivations / goals."
        ></textarea>
      </div>
    </div>
  );
};

export default StoryBible;
