import { ReactNode, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SingleFAQ = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="border-b-2 border-faqBorder py-1 bg-white my-2">
      <div
        className="top flex gap-2 items-center justify-between p-2 cursor-pointer"
        onClick={() => setOpened(!opened)}
      >
        <div>{title}</div>
        <div className="text-grey">
          {opened ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {opened && (
        <div className="answer text-grey font-semibold p-2 text-sm">
          {children}
        </div>
      )}
    </div>
  );
};

export default SingleFAQ;
