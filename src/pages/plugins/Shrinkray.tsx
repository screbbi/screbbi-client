import PluginLayout from "../../layout/PluginLayout";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { ReactNode } from "react";
import { HiOutlineMenuAlt4, HiOutlineMenu } from "react-icons/hi";
import { LiaTimesSolid } from "react-icons/lia";
import PluginBackBn from "../../components/PluginBackBn";

const SingleBox = ({
  topText,
  bottomText,
  icon,
}: {
  topText: string;
  bottomText: string;
  icon: ReactNode;
}) => {
  return (
    <div className="border-2 border-black rounded-lg p-2 flex items-center gap-2 mb-4">
      <div>{icon}</div>
      <div className="text-sm">
        <span className="font-bold">{topText}</span>
        <div>{bottomText}</div>
      </div>
    </div>
  );
};

const Shrinkray = () => {
  return (
    <PluginLayout>
      <div className="grid grid-cols-5 gap-4 w-11/12 max-w-4xl mx-auto">
        <div className="col-span-5">
          <PluginBackBn />
        </div>
        <div className="col-span-3">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div>
              <div className="text-xl font-bold">
                Shrink Ray <span className="text-lg text-gray-400">BETA</span>
              </div>

              <div className="font-bold my-2">Current document:</div>
              <SingleBox
                topText="Untitled (0 words)"
                bottomText='"..."'
                icon={<HiClipboardDocumentList className="text-2xl" />}
              />
            </div>

            <div className="mt-4">
              <div>
                <div className="font-bold my-2">Sudowrite will generate::</div>
                <div className="flex items-center">
                  <div className="w-11/12">
                    <SingleBox
                      topText="Logline"
                      bottomText="A 1-2 sentence pitch for this story"
                      icon={<HiOutlineMenuAlt4 className="text-2xl" />}
                    />
                  </div>
                  <div className="text-3xl flex items-center font-bold -mt-3">
                    <LiaTimesSolid /> 2
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-11/12">
                    <SingleBox
                      topText="Blurb"
                      bottomText="A short promotional summary for the back of your book"
                      icon={<HiOutlineMenu className="text-2xl" />}
                    />
                  </div>
                  <div className="text-3xl flex items-center font-bold -mt-3">
                    <LiaTimesSolid /> 1
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-11/12">
                    <SingleBox
                      topText="Synopsis"
                      bottomText="A longer, more in-depth summary"
                      icon={
                        <svg
                          width="20px"
                          height="70%"
                          viewBox="0 0 52 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 3H51.9897"
                            stroke="#000"
                            stroke-width="6"
                          ></path>
                          <path
                            d="M0 17H51.9897"
                            stroke="#000"
                            stroke-width="6"
                          ></path>
                          <path
                            d="M0 31H51.9897"
                            stroke="#000"
                            stroke-width="6"
                          ></path>
                          <path
                            d="M0 45H51.9897"
                            stroke="#000"
                            stroke-width="6"
                          ></path>
                        </svg>
                      }
                    />
                  </div>
                  <div className="text-3xl flex items-center font-bold -mt-3">
                    <LiaTimesSolid /> 1
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-11/12">
                    <SingleBox
                      topText="Outline"
                      bottomText="A structured list of story beats"
                      icon={
                        <svg
                          width="20px"
                          height="30px"
                          viewBox="0 0 69 51"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5116 4.66187H68.2299"
                            stroke="#000"
                            stroke-width="4"
                          ></path>
                          <path
                            d="M11.5116 14.9978H68.2299"
                            stroke="#000"
                            stroke-width="4"
                          ></path>
                          <path
                            d="M11.5116 35.4976H68.2299"
                            stroke="#000"
                            stroke-width="4"
                          ></path>
                          <path
                            d="M11.5116 25.1619H68.2299"
                            stroke="#000"
                            stroke-width="4"
                          ></path>
                          <path
                            d="M11.5116 45.6616H68.2299"
                            stroke="#000"
                            stroke-width="4"
                          ></path>
                          <circle
                            cx="3.93909"
                            cy="4.15808"
                            r="3.36755"
                            fill="#000"
                          ></circle>
                          <circle
                            cx="3.93909"
                            cy="14.8929"
                            r="3.36755"
                            fill="#000"
                          ></circle>
                          <circle
                            cx="3.93909"
                            cy="25.6283"
                            r="3.36755"
                            fill="#000"
                          ></circle>
                          <circle
                            cx="3.93909"
                            cy="36.3632"
                            r="3.36755"
                            fill="#000"
                          ></circle>
                          <circle
                            cx="3.93909"
                            cy="47.0985"
                            r="3.36755"
                            fill="#000"
                          ></circle>
                        </svg>
                      }
                    />
                  </div>
                  <div className="text-3xl flex items-center font-bold -mt-3">
                    <LiaTimesSolid /> 1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-gray-200/50 h-fit p-4 rounded-lg font-semibold">
          <div className="font-bold mb-2">How this works</div>

          <div>
            Screbbi will summarize your current document into four different
            output types: logline, blurb, synopsis, and outline. The number of
            each output will depend on the length of your document.
          </div>

          <div className="my-2">Results will be saved automatically.</div>

          <div>
            <span className="font-bold">NOTE:</span> Shrink Ray deducts credits
            based on words Sudowrite reads and writes.
          </div>
        </div>
      </div>
    </PluginLayout>
  );
};

export default Shrinkray;
