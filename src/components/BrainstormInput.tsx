import { ChangeEvent } from "react";

type inputType = {
  value: string;
  label?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  id: string;
  placeholder?: string;
};

const BrainstormInput = ({
  value,
  label,
  handleChange,
  name,
  id,
  placeholder,
}: inputType) => {
  return (
    <div>
      {label && <label className="font-semibold">{label}</label>}
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
