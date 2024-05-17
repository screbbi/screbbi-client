import sight from "../assets/img/sight.svg";
import smell from "../assets/img/smell.svg";
import sound from "../assets/img/sound.svg";
import touch from "../assets/img/touch.svg";
import taste from "../assets/img/taste.svg";

const DescribeOptions = ({
  descriptions,
  setDesc,
}: {
  descriptions: string[];
  setDesc: (e: string) => void;
}) => {
  return (
    <div className="absolute top-full left-0 w-48 bg-white p-3 shadow-lg rounded-md">
      <div className="single-desc">
        <div className="flex gap-4 items-center">
          <img src={sight} alt="" />

          <div>Sight</div>
        </div>

        <div
          className="checkbox-wrapper-6"
          onClick={(e) => {
            e.stopPropagation();
            setDesc("sight");
          }}
        >
          <input
            className="tgl tgl-light"
            id="cb1-1"
            type="checkbox"
            checked={descriptions.includes("sight")}
          />
          <label className="tgl-btn" />
        </div>
      </div>

      <div className="single-desc">
        <div className="flex gap-4 items-center">
          <img src={smell} alt="" />
          <div>Smell</div>
        </div>

        <div
          className="checkbox-wrapper-6"
          onClick={(e) => {
            e.stopPropagation();
            setDesc("smell");
          }}
        >
          <input
            className="tgl tgl-light"
            id="cb1-2"
            type="checkbox"
            checked={descriptions.includes("smell")}
          />
          <label className="tgl-btn" />
        </div>
      </div>

      <div className="single-desc">
        <div className="flex gap-4 items-center">
          <img src={sound} alt="" />

          <div>Sound</div>
        </div>

        <div
          className="checkbox-wrapper-6"
          onClick={(e) => {
            e.stopPropagation();
            setDesc("sound");
          }}
        >
          <input
            className="tgl tgl-light"
            id="cb1-4"
            type="checkbox"
            checked={descriptions.includes("sound")}
          />
          <label className="tgl-btn" />
        </div>
      </div>

      <div className="single-desc">
        <div className="flex gap-4 items-center">
          <img src={touch} alt="" />

          <div>Touch</div>
        </div>

        <div
          className="checkbox-wrapper-6"
          onClick={(e) => {
            e.stopPropagation();
            setDesc("touch");
          }}
        >
          <input
            className="tgl tgl-light"
            id="cb1-5"
            type="checkbox"
            checked={descriptions.includes("touch")}
          />
          <label className="tgl-btn" />
        </div>
      </div>

      <div className="single-desc">
        <div className="flex gap-4 items-center">
          <img src={taste} alt="" />

          <div>Taste</div>
        </div>

        <div
          className="checkbox-wrapper-6"
          onClick={(e) => {
            e.stopPropagation();
            setDesc("taste");
          }}
        >
          <input
            className="tgl tgl-light"
            id="cb1-3"
            type="checkbox"
            checked={descriptions.includes("taste")}
          />
          <label className="tgl-btn" />
        </div>
      </div>
    </div>
  );
};

export default DescribeOptions;
