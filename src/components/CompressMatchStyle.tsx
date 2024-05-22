import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const CompressMatchStyle = ({
  compress,
  loading,
  close,
  rawWriting,
}: {
  compress: (e: string) => void;
  close: () => void;
  loading: boolean;
  rawWriting: string;
}) => {
  const [writing, setWriting] = useState(rawWriting);

  return (
    <div>
      <div
        className="fixed top-0 left-0 inset-0 bg-black/40 z-30"
        onClick={close}
      ></div>
      <div className="small-modal">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-sm">Step 2:</div>
          <FaTimes className="cursor-pointer" onClick={close} />
        </div>
        <div className="text-xl font-semibold mb-4">Correct & Improve</div>

        <div>
          Clean up anything the AI got wrong about your style, or that you don't
          think is needed. This will be condensed in the final style.
        </div>

        <textarea
          className="w-full h-32 border-2 border-selectText outline-0 resize-none rounded-md p-2 text-xs"
          value={writing}
          onChange={(e) => setWriting(e.target.value)}
        ></textarea>

        <div className="flex justify-end">
          {/* <button
            className={`bg-buttonPurple text-white w-full p-2 rounded-md mt-4`}
            onClick={() => generate(writing)}
            disabled={writing.trim().length === 0 || loading}
          >
            {loading ? "Generating" : "Generate"}
          </button> */}

          <button
            className={`bg-buttonPurple text-white w-full p-2 rounded-md mt-4 ${
              loading && "opacity-50"
            }`}
            onClick={() => compress(writing)}
            disabled={writing.trim().length === 0 || loading}
          >
            Compress
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompressMatchStyle;
