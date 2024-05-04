import { FaArrowLeftLong } from "react-icons/fa6";

const WriteSettings = ({ back }: { back: () => void }) => {
  return (
    <div className="absolute top-full left-0 w-60 bg-white shadow-lg rounded-md">
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
          <label htmlFor="words">Length of words</label>
          <select name="words" id="words">
            <option value="150">150 words</option>
            <option value="250">250 words</option>
            <option value="350">350 words</option>
            <option value="450">450 words</option>
            <option value="550">550 words</option>
          </select>
        </div>

        <div className="write-settings-control">
          <label htmlFor="chapters">Chapters</label>
          <select name="chapters" id="words">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="write-settings-control col-span-2">
          <label htmlFor="chapters">Tone of the story</label>
          <select name="chapters" id="words">
            <option value="ominous">Ominous</option>
            <option value="ominous">Ominous</option>
            <option value="ominous">Ominous</option>
            <option value="ominous">Ominous</option>
            <option value="ominous">Ominous</option>
            <option value="ominous">Ominous</option>
          </select>
        </div>
      </div>

      <div className="p-3 text-xs">
        <div className="write-settings-control">
          <label htmlFor="details">Key Details</label>
          <textarea
            name="details"
            id="details"
            placeholder="What important details about you story should we keep in mind?"
            className="p-2 w-full h-40 rounded-md resize-none outline-0 text-selectText border border-selectText mt-1 text-[10px]"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default WriteSettings;
