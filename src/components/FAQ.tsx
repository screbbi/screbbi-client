import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FAQ = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="border-b-2 border-faqBorder py-1">
      <div className="top flex gap-2 items-center justify-between p-2">
        <div>1. Can AI Writer write essays in varied styles?</div>
        <div onClick={() => setOpened(!opened)} className="text-grey">
          {opened ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {opened && (
        <div className="answer text-grey font-semibold p-2 text-sm">
          Certainly! Our tool is versatile and capable of crafting essays in
          numerous styles like argumentative, persuasive, descriptive,
          narrative, and even compare & contrast. It's designed for diverse
          academic and content needs.
        </div>
      )}
    </div>
  );
};

export default FAQ;
