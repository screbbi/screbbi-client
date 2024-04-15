import { FC, ReactNode } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import Overlay from "../components/Overlay";

type modalType = {
  close: () => void;
  children: ReactNode;
};

const ModalLayout: FC<modalType> = ({ close, children }) => {
  return (
    <div>
      <Overlay />
      <div className="modal">
        <LiaTimesSolid
          className="absolute right-4 top-4 cursor-pointer"
          onClick={close}
        />
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
};

export default ModalLayout;
