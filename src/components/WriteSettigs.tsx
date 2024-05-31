import { FaArrowLeftLong } from "react-icons/fa6";

const WriteSettings = ({
  back,
  writeSetting,
  change,
  generate,
  loading,
}: {
  back: () => void;
  writeSetting: any;
  change: (e: any) => void;
  generate: () => void;
  loading: boolean;
}) => {
  return (
    <div
      className="absolute top-full left-0 w-60 bg-white shadow-lg rounded-md"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="flex items-center gap-2 p-3 text-sm border-b border-faqBorder"
        onClick={(e) => {
          e.stopPropagation();
          back();
        }}
      >
        <FaArrowLeftLong />
        <div>Write settings</div>
      </div>

      <div className="grid grid-cols-2 gap-5 p-3 text-sm  border-b border-faqBorder">
        <div className="write-settings-control">
          <label htmlFor="lengthOfWords">Length of words</label>
          <select
            name="lengthOfWords"
            id="lengthOfWords"
            onChange={change}
            value={writeSetting?.lengthOfWords ?? 0}
          >
            <option value="150">150 words</option>
            <option value="250">250 words</option>
            <option value="350">350 words</option>
            <option value="450">450 words</option>
            <option value="550">550 words</option>
          </select>
        </div>

        <div className="write-settings-control">
          <label htmlFor="chapters">Chapters</label>
          <select
            name="chapters"
            id="chapters"
            onChange={change}
            value={writeSetting?.chapters}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="write-settings-control col-span-2">
          <label htmlFor="toneOfStory">Tone of the story</label>
          <select
            name="toneOfStory"
            id="toneOfStory"
            onChange={change}
            value={writeSetting?.toneOfStory}
          >
            <option value="suspenseful">Suspenseful</option>
            <option value="humorous">Humorous</option>
            <option value="dark">Dark</option>
            <option value="romantic">Romantic</option>
            <option value="nostalgic">Nostalgic</option>
            <option value="mysterious">Mysterious</option>
            <option value="eerie">Eerie</option>
          </select>
        </div>
      </div>

      <div className="p-3 text-xs">
        <div className="write-settings-control">
          <label htmlFor="keyDetails">Key Details</label>
          <textarea
            name="keyDetails"
            id="keyDetails"
            onChange={change}
            value={writeSetting?.keyDetails}
            placeholder="What important details about you story should we keep in mind?"
            className="p-2 w-full h-40 rounded-md resize-none outline-0 text-black border border-selectText mt-1 text-[10px]"
          ></textarea>
        </div>
        <button
          className={`bg-buttonPurple text-white w-full p-2 rounded-md mt-4 ${
            loading && "opacity-50"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            generate();
          }}
          disabled={loading}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default WriteSettings;
