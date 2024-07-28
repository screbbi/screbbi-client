import { ReactNode } from "react";
import { BsQuestionCircleFill } from "react-icons/bs";

const Tooltip = ({
  children,
  small,
}: {
  children: ReactNode;
  small?: boolean;
}) => {
  return (
    <div className="relative group">
      <div>
        <BsQuestionCircleFill className="text-gray-400" />
      </div>

      <div className={`bottom-up shadow-lg ${small && "small"}`}>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
