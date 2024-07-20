import { useState } from "react";
import appLogo from "../assets/img/ai-logo.png";
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

const PluginCard = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="font-semibold">Lorem, ipsum.</div>
          <div className="text-xs">By Creator . 1234 Users</div>
        </div>
        <button className="bg-buttonPurple/20 text-buttonPurple py-1 px-2 text-xs rounded-full">
          ADD
        </button>
      </div>

      <div className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est deleniti et
        inventore possimus deserunt amet debitis temporibus nam dicta optio,
        magnam dignissimos impedit aspernatur soluta, sunt, officiis
        exercitationem distinctio rerum!
      </div>
    </div>
  );
};

const tabs = ["popular", "newest", "added", "yours"];

const Plugins = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div>
      <img
        src="https://editor.sudowrite.com/assets/sorbet-background.png"
        alt=""
        className="fixed top-0 left-0 -z-10 w-full h-full"
      />
      <div className="flex justify-between p-2">
        <img src={appLogo} alt="" className="w-32" />

        <div className="flex gap-2 items-center">
          <IoExtensionPuzzleSharp className="text-lg" />
          <div>Plugins</div>
        </div>
        <div></div>
      </div>

      <div className="w-11/12 mx-auto">
        <div className="side"></div>
        <div>
          <div className="paging flex justify-between">
            <div></div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                {tabs?.map((item) => (
                  <div
                    key={item}
                    className={`border-b-4 py-1 capitalize cursor-pointer text-sm ${
                      item === currentTab
                        ? "text-buttonPurple border-buttonPurple"
                        : "text-gray-400 border-transparent"
                    }`}
                    onClick={() => setCurrentTab(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="text"
                className="border-0 outline-0 bg-gray-200 px-2 py-2 rounded-full text-sm"
                placeholder="Search Plugin"
              />
              <button className="bg-buttonPurple text-white flex gap-2 items-center p-2 font-semibold rounded-md text-sm">
                <FaPlus />
                Create Plugin
              </button>
            </div>
          </div>
        </div>

        <div className="plugin-cards">
          <PluginCard />
          <PluginCard />
          <PluginCard />
          <PluginCard />
        </div>
      </div>
    </div>
  );
};

export default Plugins;
