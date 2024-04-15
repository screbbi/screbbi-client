type inputType = {
  value: string | number;
  placeholder: string;
  name: string;
  change: (e: any) => void;
  type?: string;
  showBor?: boolean;
  label?: string;
  error?: string;
};

const OnboardInput: React.FC<inputType> = ({
  value,
  change,
  placeholder,
  type,
  name,
  showBor,
  label,
  error,
}) => {
  return (
    <div className={`${showBor ? "" : "mb-4"}`}>
      {label && (
        <label htmlFor="" className="text-textColor">
          {label}
        </label>
      )}
      <input
        type={type ?? "text"}
        value={value}
        placeholder={placeholder}
        onChange={change}
        name={name}
        required
        className={`${
          showBor ? "border-0" : "border"
        } border-black rounded-lg p-2 outline-none w-full text-sm text-textColor`}
      />

      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
};

export default OnboardInput;
