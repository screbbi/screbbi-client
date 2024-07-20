import { Link, useLocation } from "react-router-dom";

const Plugins = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <div className="absolute top-full left-0 w-48 bg-white p-3 shadow-lg rounded-md">
        <Link to={`${pathname}/summary`}>
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
        </Link>

        <div className="single-desc cursor-pointer hover:bg-slate-200/60 px-2 rounded-md">
          <div>Visualize</div>
        </div>

        <div className="single-desc cursor-pointer hover:bg-slate-200/60 px-2 rounded-md">
          <div>Feedback</div>
        </div>
      </div>
    </div>
  );
};

export default Plugins;
