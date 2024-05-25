import { useState } from "react";

const Count = () => {
  const [text, setText] = useState("");

  const handleInputChange = (event: any) => {
    const text = event.target.value;
    const words = text.trim().split(/\s+/);

    if (words.length < 10) {
      setText(text);
    }
  };

  return (
    <div>
      <textarea
        name=""
        id=""
        onChange={handleInputChange}
        value={text}
      ></textarea>
    </div>
  );
};

export default Count;
