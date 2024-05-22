import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Compressed = ({
  insert,
  compressRaw,
  close,
}: {
  insert: (e: string) => void;
  compressRaw: string;
  close: () => void;
}) => {
  const [writing, setWriting] = useState(compressRaw);

  return (
    <div>
      <div
        className="fixed top-0 left-0 inset-0 bg-black/40 z-30"
        onClick={close}
      ></div>
      <div className="small-modal">
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold text-2xl">Done!</div>
          <FaTimes className="cursor-pointer" onClick={close} />
        </div>

        <textarea
          className="w-full h-32 border-2 border-selectText outline-0 resize-none rounded-md p-2 text-xs"
          value={writing}
          onChange={(e) => setWriting(e.target.value)}
        ></textarea>

        <div className="flex justify-end">
          <button
            className={`bg-buttonPurple text-white px-4 p-2 rounded-md mt-4`}
            onClick={() => {
              insert(writing);
              close();
            }}
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};

export default Compressed;
