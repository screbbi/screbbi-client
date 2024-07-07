import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/request";
import appLogo from "../assets/img/ai-logo.png";
import ButtonLoader from "../components/ButtonLoader";
import { Link } from "react-router-dom";
import { numberFormat } from "../utils/functions";

const SingleBilling = ({
  plan,
  annual,
  click,
  loading,
}: {
  plan: any;
  annual: boolean;
  click: () => void;
  loading: boolean;
}) => {
  return (
    <div>
      <div className="text-center capitalize text-2xl py-4 font-semibold">
        {plan.name}
      </div>
      <div className="text-center bg-white shadow-lg mx-auto max-w-xs p-6 rounded-3xl">
        <div className="">
          <div className="text-3xl font-bold">
            $
            {annual
              ? Math.round(plan.price * ((100 - plan.annualDiscount) / 100))
              : plan.price}
          </div>
          <div className="text-sm">per month</div>
        </div>

        <div className="my-12 relative group">
          <div className="text-3xl font-bold">{numberFormat(plan.tokens)}</div>
          <div className="border-dashed border-b border-black w-fit mx-auto">
            credits per month
          </div>
          <div className="absolute top-full bg-white rounded-lg shadow-md p-1 text-sm group-hover:block hidden">
            <div className="font-semibold">What is credit?</div>
            <div>
              Each feature in Screbbi uses up credits, based on the AI model,
              and how many words it reads and writes for you.
            </div>
          </div>
        </div>

        <div className={`${plan.name !== "starter" && "py-6"}`}>
          {plan.description}
          {plan.description.slice(-1) !== "." && "."}
        </div>

        <button className="subscribe-button" onClick={click} disabled={loading}>
          {loading ? <ButtonLoader /> : "Subscribe"}
        </button>
        <div className="text-[#888888] mt-2 text-xs">
          Pause or cancel anytime.
        </div>
      </div>
    </div>
  );
};

const Billing = () => {
  const [fetching, setFetching] = useState(false);
  const [plans, setPlans] = useState<any>(null);
  const [annual, setAnnual] = useState(true);

  // const navigate = useNavigate();

  useEffect(() => {
    getRequest("/subscription/plans")
      .then(({ data }) => {
        setPlans(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const subscribe = (plan: string) => {
    setFetching(true);
    postRequest(`/subscription/subscribe`, {
      period: annual ? "annual" : "monthly",
      plan,
    })
      .then(({ data }) => {
        window.location.href = data.url;
        setFetching(false);
      })
      .catch(() => {
        setFetching(false);
      });
  };

  return (
    <div className="bg-[url(https://editor.sudowrite.com/assets/sorbet-background.png)] bg-cover bg-no-repeat pb-10 billing min-h-screen">
      <div className="flex justify-between p-4">
        <Link to={"/"}>
          <img
            src={appLogo}
            alt=""
            className="h-10 cursor-pointer"
            // onClick={() => navigate(-1)}
          />
        </Link>

        <div>Pricing</div>
      </div>

      <div className="text-xl md:text-3xl text-center mt-12">
        Say Goodbye to Writer’s Block
      </div>
      <div className="max-w-60 text-center mx-auto my-6">
        Use the #1 Creative Writing AI and make writing fun again.
      </div>

      <div className="flex justify-center items-center gap-8">
        <div>Monthly</div>

        <div
          className="checkbox-wrapper-6 big"
          onClick={(e) => {
            e.stopPropagation();
            setAnnual(!annual);
          }}
        >
          <input
            className="tgl tgl-light"
            id="cb1-1"
            type="checkbox"
            checked={annual}
          />
          <label className="tgl-btn" />
        </div>

        <div>
          <div>Yearly</div>
        </div>
      </div>

      <div className="mt-8">
        {!plans ? (
          <div className="flex justify-center items-center h-60">
            <div className="billing-loader"></div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 w-[90%] mx-auto max-w-4xl gap-6">
            {plans?.map((item: any) => (
              <SingleBilling
                plan={item}
                key={item.planID}
                annual={annual}
                click={() => subscribe(item.planID)}
                loading={fetching}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-4 text-lg">
          Unsure if you need Screbbi?{" "}
          <Link
            to={localStorage.getItem("token") ? "/home" : "/"}
            className="text-blue-700"
          >
            Try it For FREE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Billing;
