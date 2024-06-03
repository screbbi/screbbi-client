import { FaArrowLeftLong } from "react-icons/fa6";

const Prompt = ({
  back,
  generate,
  prompt,
  setPrompt,
  loading,
}: {
  back: () => void;
  generate: () => void;
  prompt: string;
  setPrompt: (e: string) => void;
  loading: boolean;
}) => {
  return (
    <div
      className="absolute top-full left-0 w-80 bg-white p-3 shadow-lg rounded-md"
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
        <div>Write Prompt</div>
      </div>

      <div className="p-3">
        <div className="text-sm">Prompt</div>
        <input
          type="text"
          className="border border-selectText text-black block w-full p-2 rounded-md outline-0"
          placeholder="AI prompt goes here"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        />

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
          Generate
        </button>
      </div>
    </div>
  );
};

export default Prompt;
