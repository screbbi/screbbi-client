import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const PluginBackBn = () => {
  const navigate = useNavigate();

  return (
    <button className="back-btn" onClick={() => navigate(-1)}>
      <IoIosArrowRoundBack className="text-xl" />
      Back
    </button>
  );
};

export default PluginBackBn;
