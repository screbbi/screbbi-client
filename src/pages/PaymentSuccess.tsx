import { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { getRequest } from "../utils/request";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const locations = useLocation();
  const queryParams = new URLSearchParams(locations.search);
  const sessionId = queryParams.get("session_id");

  useEffect(() => {
    getRequest(`/subscription/success?session_id=${sessionId}`).then(() => {
      toast("Payment Verified");
    });
  }, []);

  return (
    <div className="bg-[url(https://editor.sudowrite.com/assets/sorbet-background.png)] bg-cover bg-no-repeat min-h-screen flex justify-center items-center">
      <div>
        <div className="flex justify-center">
          <FiCheckCircle className="text-5xl" />
        </div>
        <div className="successful font-semibold text-2xl mt-6 mb-2 ">
          {/* <div className="successful text-green-600 font-semibold text-2xl"> */}
          Payment Successful
        </div>
        <div className="flex justify-center">
          <Link to={"/home"}>
            <button className="text-white bg-black px-6 py-2 rounded-lg font-semibold text-sm">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
