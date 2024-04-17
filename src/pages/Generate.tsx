import PageLayout from "../layout/PageLayout";
import generate from "../assets/img/generate-rewrite.png";
import Shorter from "../components/Shorter";
import Dropdown from "../components/Dropdown";

const Generate = () => {
  return (
    <PageLayout>
      <div className="generate">
        <div className="editor"></div>
        <div className="controls bg-white p-4">
          <div className="title mb-5">
            <div className="text-sm text-closeBlack font-bold">
              Review Suggestions
            </div>
            <div className="text-grey font-semibold text-xs">
              Integrated with GPT-Based Models
            </div>
          </div>

          <div>
            <div className="flex gap-2 items-center text-xs font-semibold mb-2">
              <img src={generate} alt="" />
              <div>Rewrite</div>
            </div>

            <div className="text-grey font-semibold text-xs my-2">
              Hello, I need a writing software similar to this that work with
              AI.
            </div>

            <Dropdown />

            <Shorter />
            <Shorter />
            <Shorter />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Generate;
