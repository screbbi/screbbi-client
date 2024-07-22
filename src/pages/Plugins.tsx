import { useEffect, useState } from "react";
import appLogo from "../assets/img/ai-logo.png";
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRequest, postRequest } from "../utils/request";
import toast from "react-hot-toast";

type pluginType = {
  author: { firstName: string; lastName: string };
  category: string;
  createdAt: Date;
  description: string;
  instruction_visibility: string;
  name: string;
  updatedAt: Date;
  users: number;
  visibility: string;
  _id: string;
};

const PluginCard = ({
  plugin,
  myPlugin,
}: {
  plugin: pluginType;
  myPlugin: boolean;
}) => {
  const [installing, setInstalling] = useState(false);

  const installPlugin = () => {
    setInstalling(true);
    postRequest("/plugin/action", {
      action: myPlugin ? "remove" : "add",
      plugin: plugin._id,
    })
      .then((data) => {
        setInstalling(false);
        console.log(data);
      })
      .catch(() => {
        setInstalling(false);
        toast("Try Again");
      });
  };

  return (
    <Link to={`/plugins/${plugin._id}`}>
      <div className="p-4 bg-white rounded-lg shadow-lg h-full overflow-hidden">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="font-semibold">{plugin.name}.</div>
            <div className="text-xs">
              By {plugin.author.firstName} {plugin.author.lastName} .{" "}
              {plugin.users} Users
            </div>
          </div>
          <button
            className={`bg-buttonPurple/20 text-buttonPurple py-1 px-2 text-xs rounded-full ${
              installing && "opacity-30"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              installPlugin();
            }}
          >
            {myPlugin ? "REMOVE" : "ADD"}
          </button>
        </div>

        <div className="text-sm">{plugin.description}</div>
      </div>
    </Link>
  );
};

const tabs = ["popular", "newest", "added", "yours"];

const Plugins = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const [plugins, setPlugins] = useState<pluginType[]>([]);
  const [loadingPlugins, setLoadingPlugins] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [searchString, setSearchString] = useState("");

  type optionType = {
    label: string;
    value: string;
  };

  const categories: optionType[] = [
    { label: "Narrative and Plot", value: "narrative-and-plot" },
    { label: "Character Development", value: "character-development" },
    { label: "Editing and Revision", value: "editing-and-revision" },
    { label: "Scene Enhancement", value: "scene-enhancement" },
    { label: "World building", value: "world-buliding" },
    { label: "Analysis and feedback", value: "analysis-and-feedback" },
    { label: "Marketing", value: "marketing" },
    { label: "Genre specific", value: "genre-specific" },
    { label: "Multi Lingual", value: "multi-lingual" },
    { label: "Others", value: "others" },
  ];

  const getPlugins = () => {
    setLoadingPlugins(true);
    getRequest(
      `/plugin/plugins?sort=${currentTab}&category=${category ?? ""}&forme=${
        currentTab === "yours" ? "yes" : "no"
      }`
    )
      .then(({ data }: { data: pluginType[] }) => {
        setLoadingPlugins(false);
        setPlugins(data);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoadingPlugins(false);
      });
  };

  useEffect(() => {
    getPlugins();
  }, [category, currentTab]);

  const filterPlugin = () => {
    return plugins.filter((item) =>
      item.name.toLocaleLowerCase().includes(searchString)
    );
  };

  return (
    <div className="sticky top-0 h-screen overflow-auto">
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

      <div className="plugin-cont sticky top-0 h-screen">
        <div className="side sticky top-0">
          <div
            className={`cursor-pointer text-sm p-2 border-l duration-300 ${
              !category
                ? "border-buttonPurple bg-buttonPurple/20"
                : "border-transparent"
            }`}
            onClick={() => navigate(`/plugins`)}
          >
            All
          </div>
          {categories.map((item) => (
            <div
              key={item.value}
              className={`cursor-pointer text-sm p-2 border-l duration-300 ${
                item.value === category
                  ? "border-buttonPurple bg-buttonPurple/20"
                  : "border-transparent"
              }`}
              onClick={() => navigate(`/plugins/category/${item.value}`)}
            >
              {item.label}
            </div>
          ))}
        </div>

        <div className="h-full overflow-auto no-scrollbar">
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
                  onChange={(e) => setSearchString(e.target.value)}
                />
                <button
                  className="bg-buttonPurple text-white flex gap-2 items-center p-2 font-semibold rounded-md text-sm"
                  onClick={() => navigate("/plugins/create")}
                >
                  <FaPlus />
                  Create Plugin
                </button>
              </div>
            </div>
          </div>

          <div>
            {loadingPlugins ? (
              <div className="flex justify-center h-40 items-center">
                <div className="section-loader black"></div>
              </div>
            ) : plugins.length < 1 ? (
              <div className="w-full text-center h-40 flex items-center justify-center">
                <div>
                  No Plugin Created{" "}
                  <Link className="text-buttonPurple" to={"/plugins/create"}>
                    Create Plugin
                  </Link>
                </div>
              </div>
            ) : (
              <div className="plugin-cards">
                {filterPlugin().map((item: pluginType) => (
                  <PluginCard
                    key={item._id}
                    plugin={item}
                    myPlugin={currentTab === "yours" || currentTab === "added"}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plugins;
