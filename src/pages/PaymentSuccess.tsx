import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const locations = useLocation();
  const queryParams = new URLSearchParams(locations.search);
  const sessionId = queryParams.get("session_id");

  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setConfirming(true);
    axios
      .get(
        `${
          import.meta.env.VITE_BASE_URL
        }/subscription/success?session_id=${sessionId}`
      )
      .then(() => {
        setError("");
        setConfirming(false);
      })
      .catch((err) => {
        setConfirming(false);
        setError(err?.response?.data?.message ?? "Error Validating Payment");
      });
  }, []);

  return (
    <div className="bg-[url(https://editor.sudowrite.com/assets/sorbet-background.png)] bg-cover bg-no-repeat min-h-screen flex justify-center items-center">
      {confirming ? (
        <div className="text-2xl">Confirming Payment</div>
      ) : (
        <div>
          {error ? (
            <div className="text-2xl">{error}</div>
          ) : (
            <>
              <div className="flex justify-center">
                <FiCheckCircle className="text-5xl" />
              </div>

              <div className="successful font-semibold text-2xl mt-6 mb-2 ">
                Payment Successful
              </div>

              <div className="flex justify-center">
                <Link to={"/home"}>
                  <button className="text-white bg-black px-6 py-2 rounded-lg font-semibold text-sm">
                    Go to Home
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
