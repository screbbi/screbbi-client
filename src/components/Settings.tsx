import ModalLayout from "../layout/ModalLayout";
import { IoMdPerson } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { useStore } from "zustand";
import store from "../store/state";
import ProfilePicture from "./ProfilePicture";
import { Link } from "react-router-dom";
import { numberFormat } from "../utils/functions";
import OnboardInput from "./OnboardInput";
import { ChangeEvent, useState } from "react";
import { postRequest, putRequest } from "../utils/request";

const Settings = ({ close }: { close: () => void }) => {
  const { user, token } = useStore(store);

  const [usernames, setUsernames] = useState<{
    lastName: string;
    firstName: string;
  }>({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  const [editing, setEditing] = useState(false);

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUsernames({ ...usernames, [name]: value });
  };

  const updateame = () => {
    postRequest("/profile", usernames)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ModalLayout close={close} title="Settings">
      <div className="flex gap-2 items-center">
        <div className="flex justify-center items-center bg-grey rounded-full w-6 h-6">
          <IoMdPerson />
        </div>

        <div className="text-grey text-xs font-semibold">User account</div>
      </div>

      {/* User account */}
      {user && (
        <div className="text-closeBlack text-xs font-semibold mt-2 capitalize">
          {user?.subscription?.subscriptionPlan?.name.split("_").join(" ")}
        </div>
      )}
      <div className="text-xs font-semibold mt-1">{user?.email}</div>

      {!editing ? (
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2 rounded-md w-full text-closeBlack text-xs items-center group">
            <ProfilePicture />
            {user?.name}
            <CiEdit
              className="opacity-0 group-hover:opacity-100 duration-500"
              onClick={() => setEditing(true)}
            />
          </div>
        </div>
      ) : (
        <div className="my-2">
          <div className="text-sm font-semibold">Edit Profile</div>
          <div className="grid grid-cols-6 gap-4 items-center">
            <div className="col-span-2">
              <OnboardInput
                value={usernames.firstName}
                change={change}
                type="text"
                placeholder="First Name"
                label="First Name"
                name="firstName"
              />
            </div>

            <div className="col-span-2">
              <OnboardInput
                value={usernames.lastName}
                change={change}
                type="text"
                placeholder="Last Name"
                label="Last Name"
                name="lastName"
              />
            </div>

            <button
              className="bg-buttonPurple text-white py-2 rounded-md"
              onClick={updateame}
            >
              Update
            </button>
            <button className=" py-2" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="text-xs font-semibold  py border-t border-gray-200 py-4">
        <div className="">
          {user?.token && numberFormat(token)} /{" "}
          {user?.subscription?.subscriptionPlan?.tokens &&
            numberFormat(user?.subscription?.subscriptionPlan?.tokens)}{" "}
          Credits left
        </div>

        {user?.subscription?.trialUser ? (
          <div className="flex gap-4 items-center mt-2">
            <Link to={"/billing"}>
              <button className="py-2 px-6 bg-buttonPurple text-white rounded-full text-sm">
                Start Membership
              </button>
            </Link>
            <div>Starting Price: $15/month</div>
          </div>
        ) : (
          <div className="mt-4 text-sm">
            <div className="text-base">Subscription Details</div>

            <div>
              Plan :{" "}
              <span className="text-gray-400 capitalize">
                {user?.subscription?.subscriptionPlan?.name}
              </span>
            </div>
            <div>
              Duration :{" "}
              <span className="text-gray-400 capitalize">
                {user?.subscription?.subscriptionPlan?.period}
              </span>
            </div>
            <div>
              Description :
              <span className="text-gray-400">
                {user?.subscription?.subscriptionPlan?.description}
              </span>
            </div>
          </div>
        )}
      </div>
    </ModalLayout>
  );
};

export default Settings;

{
  /* <div className="flex gap-2 items-center my-2">
        <div className="flex justify-center items-center bg-grey rounded-full w-6 h-6">
          <IoMdPerson />
        </div>
        <div className="text-grey text-xs font-semibold">Preferences</div>
      </div> */
}

{
  /* <div>
        <div className="text-xs font-semibold">Text Size</div>
        <div></div>
      </div> */
}

{
  /* <div className="py border-t border-gray-200 py-4">
        <div className="text-xs font-semibold">Line Spacing</div>
        <div className="flex gap-4 items-center mt-2">
          <MdOutlineFormatLineSpacing className="text-2xl" />
          <div className="spacing active">1</div>
          <div className="spacing">1.5</div>
          <div className="spacing">2</div>
        </div>
      </div> */
}

{
  /* SHOW PREFERENCES */
}
{
  /* <div className="py border-t border-gray-200 py-4">
        <div className="grid grid-cols-2 divide-x-2">
          <div className="flex gap-2 items-center text-xs font-semibold justify-between pr-4">
            <div>Show word count</div>
            <div
              className="checkbox-wrapper-6"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <input
                className="tgl tgl-light"
                id="cb1-3"
                type="checkbox"
                // checked={}
              />
              <label className="tgl-btn" htmlFor="cb1-3" />
            </div>
          </div>

          <div className="flex gap-2 items-center text-xs font-semibold justify-between pl-4">
            <div>Indent paragraphs</div>
            <div
              className="checkbox-wrapper-6"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <input
                className="tgl tgl-light"
                id="cb1-3"
                type="checkbox"
                // checked={}
              />
              <label className="tgl-btn" htmlFor="cb1-3" />
            </div>
          </div>
        </div>
      </div> */
}
