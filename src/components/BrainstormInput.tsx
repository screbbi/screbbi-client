import { ChangeEvent } from "react";
import Tooltip from "../layout/Tooltip";

type inputType = {
  value: string;
  label?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  id: string;
  placeholder?: string;
  desc?: string;
};

const BrainstormInput = ({
  value,
  label,
  handleChange,
  name,
  id,
  placeholder,
  desc,
}: inputType) => {
  return (
    <div>
      {label && (
        <label className="font-semibold flex items-center">
          {label}{" "}
          <Tooltip small>
            <div className="font-semibold mb-2">Pro Tip</div>
            <div>{desc}</div>
          </Tooltip>
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        name={name}
        id={id}
        className="block w-full border border-gray-300 p-2 rounded-md outline-2 outline-buttonPurple text-sm my-3"
        placeholder={placeholder}
      />
    </div>
  );
};

export default BrainstormInput;
