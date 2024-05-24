import { ReactNode } from "react";
import { BsQuestionCircleFill } from "react-icons/bs";

const Tooltip = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative group">
      <div>
        <BsQuestionCircleFill className="text-gray-400" />
      </div>

      <div className="bottom-up">{children}</div>
    </div>
  );
};

export default Tooltip;
