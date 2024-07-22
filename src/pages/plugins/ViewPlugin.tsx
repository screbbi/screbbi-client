import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest, postRequest } from "../../utils/request";
import PluginsLayout from "../../layout/PluginsLayout";
import { GoDownload } from "react-icons/go";
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

const ViewPlugin = () => {
  const { id } = useParams();
  // const navigate = useNavigate();

  const [plugin, setPlugin] = useState<pluginType>({
    name: "",
    description: "",
    users: 0,
    _id: "",
    author: { firstName: "", lastName: "" },
    category: "",
    createdAt: new Date(),
    instruction_visibility: "",
    updatedAt: new Date(),
    visibility: "",
  });
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRequest(`/plugin/view?plugin=${id}`)
      .then(({ data }) => {
        console.log(data);
        setPlugin(data[0]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const removePlugin = (action: string) => {
    setRemoving(true);
    postRequest("/plugin/action", {
      action,
      plugin: plugin._id,
    })
      .then(() => {
        setRemoving(false);
      })
      .catch(() => {
        setRemoving(false);
        toast("Try Again");
      });
  };

  return (
    <div>
      <PluginsLayout>
        {loading ? (
          <div className="h-40 flex justify-center items-center">
            <div className="section-loader black"></div>
          </div>
        ) : (
          <div className="bg-white max-w-3xl mx-auto w-11/12 p-4 rounded-lg mt-5">
            <div className="flex justify-between items-center">
              <div className="text-3xl font-semibold">{plugin?.name}</div>
              <div className="flex gap-4">
                <button
                  className="bg-buttonPurple text-white px-4 py-2 rounded-md flex items-center gap-2"
                  onClick={() => removePlugin("add")}
                  disabled={removing}
                >
                  {removing ? "Adding" : "Add"} <GoDownload />
                </button>

                {/* <button
                  className="bg-buttonPurple/20 p-2 rounded-md"
                  onClick={() => navigate(`/plugins/edit/${id}`)}
                >
                  Edit
                </button>

                <button
                  className="bg-buttonPurple/20 p-2 rounded-md"
                  onClick={() => removePlugin("remove")}
                  disabled={removing}
                >
                  {removing ? "Removing" : "Remove"}
                </button> */}
              </div>
            </div>

            <div className="flex gap-4 my-6">
              <div className="border border-gray-400 rounded-lg text-center p-2">
                <div className="text-sm">Created by</div>
                <div className="text-xl">
                  {plugin.author.firstName} {plugin.author.lastName}
                </div>
              </div>

              <div className="border border-gray-400 rounded-lg text-center p-2">
                <div className="text-sm">Users</div>
                <div className="text-xl">{plugin.users}</div>
              </div>
            </div>

            <div className="mt-4">{plugin.description}</div>
          </div>
        )}
      </PluginsLayout>
    </div>
  );
};

export default ViewPlugin;
