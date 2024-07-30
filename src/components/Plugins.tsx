import { Link } from "react-router-dom";
import { pluginType } from "../utils/interface";
import SiglePlugin from "./SiglePlugin";

const Plugins = ({
  openBrain,
  plugins,
  usePlugin,
}: {
  openBrain: () => void;
  plugins: pluginType[];
  usePlugin: (e: string, f?: string) => void;
}) => {
  return (
    <div>
      <div className="absolute top-full left-0 w-48 bg-white p-3 shadow-lg rounded-md z-50">
        <Link to={`/plugins`}>
          <div className="single-desc cursor-pointer hover:bg-slate-200/60 px-2 rounded-md text-blue-600">
            <div>Explore Plugin</div>
          </div>
        </Link>

        {plugins.map((item) => (
          <SiglePlugin key={item._id} plugin={item} usePlugin={usePlugin} />
        ))}

        <div
          className="single-desc cursor-pointer hover:bg-slate-200/60 px-2 rounded-md"
          onClick={openBrain}
        >
          <div>Brainstorm</div>
        </div>
      </div>
    </div>
  );
};

export default Plugins;

{
  /* <Link to={`${pathname}/summary`}>
          <div className="single-desc cursor-pointer hover:bg-slate-200/60 px-2 rounded-md">
            <div>Shrink Ray</div>
          </div>
        </Link>

        <Link to={`${pathname}/twist`}>
          <div className="single-desc cursor-pointer hover:bg-slate-200/60 px-2 rounded-md">
            <div>Twist</div>
          </div>
        </Link>

        <Link to={`${pathname}/characters`}>
          <div className="single-desc cursor-pointer hover:bg-slate-200/60 px-2 rounded-md">
            <div>Characters</div>
          </div>
        </Link>

        <Link to={`${pathname}/poem`}>
          <div className="single-desc cursor-pointer hover:bg-slate-200/60 px-2 rounded-md">
            <div>Poem</div>
          </div>
        </Link> */
}

{
  /* <div className="single-desc cursor-pointer hover:bg-slate-200/60 px-2 rounded-md">
          <div>Visualize</div>
        </div>

        <div className="single-desc cursor-pointer hover:bg-slate-200/60 px-2 rounded-md">
          <div>Feedback</div>
        </div> */
}
