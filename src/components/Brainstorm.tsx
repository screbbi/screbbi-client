import { BiArrowBack } from "react-icons/bi";
import { LiaTimesSolid } from "react-icons/lia";
import dialogue from "../assets/brainstorm/dialogue.svg";
import characters from "../assets/brainstorm/characters.svg";
import worldBuilding from "../assets/brainstorm/world-building.svg";
import plotPoint from "../assets/brainstorm/plot-points.svg";
import names from "../assets/brainstorm/names.svg";
import places from "../assets/brainstorm/places.svg";
import objects from "../assets/brainstorm/objects.svg";
import descriptions from "../assets/brainstorm/descriptions.svg";
import articleIdeas from "../assets/brainstorm/article-ideas.svg";
import tweets from "../assets/brainstorm/tweets.svg";
import somethingElse from "../assets/brainstorm/something-else.svg";
import kickstart from "../assets/brainstorm/kickstart.svg";
import doubleArrow from "../assets/brainstorm/doublearraw.svg";
import { ChangeEvent, useEffect, useState } from "react";
import BrainstormInput from "./BrainstormInput";
import { FaRegThumbsDown, FaRegThumbsUp, FaPlus } from "react-icons/fa";
import BrainstormTextArea from "./BrainstormTextarea";
import { TfiReload } from "react-icons/tfi";
// import { FaPen } from "react-icons/fa6";
import { IoReload } from "react-icons/io5";
import { GoThumbsup } from "react-icons/go";
import SingleKeeper from "./SingleKeeper";
import { getRequest, postRequest } from "../utils/request";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const SingleBrainstorm = ({
  text,
  img,
  handleClick,
}: {
  text: string;
  img: any;
  handleClick: () => void;
}) => {
  return (
    <div
      className="text-center p-4 border border-black cursor-pointer hover:bg-slate-100 duration-300"
      onClick={handleClick}
    >
      <div className="flex justify-center items-center h-20">
        <img src={img} alt="" />
      </div>
      <div className="uppercase font-semibold">{text.replace("_", " ")}</div>
    </div>
  );
};

const Brainstorm = ({ close }: { close: () => void }) => {
  const { writer } = useParams();

  const something_else = [
    {
      description: "",
      context: "",
      examples: ["", ""],
    },
  ];

  const brainstorms = [
    { text: "dialogue", img: dialogue },
    { text: "characters", img: characters },
    { text: "world_building", img: worldBuilding },
    { text: "plot_points", img: plotPoint },
    { text: "names", img: names },
    { text: "places", img: places },
    { text: "objects", img: objects },
    { text: "descriptions", img: descriptions },
    { text: "article ideas", img: articleIdeas },
    { text: "tweets", img: tweets },
    { text: "something_else", img: somethingElse },
  ];
  const [currentBrainstorm, setCurrentBrainstorm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [options, setOptions] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keeps, setKeeps] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getRequest("/brainstorm/options").then(({ data }) => {
      setOptions({ ...data, something_else });
    });
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, id } = e.target;

    if (name !== "example") {
      const newOptions = {
        ...options,
        [currentBrainstorm]: options[currentBrainstorm].map(
          (item: any, idx: number) => {
            if (idx === currentIndex) {
              return { ...item, [name]: value };
            } else {
              return item;
            }
          }
        ),
      };

      setOptions(newOptions);
    } else {
      const newOptions = {
        ...options,
        [currentBrainstorm]: options[currentBrainstorm].map(
          (item: any, idx: number) => {
            if (idx === currentIndex) {
              return {
                ...item,
                examples: item.examples.map((example: string, idx: any) => {
                  if (idx === Number(id)) {
                    return value;
                  } else {
                    return example;
                  }
                }),
              };
            } else {
              return item;
            }
          }
        ),
      };

      setOptions(newOptions);
    }
  };

  const generateBrainstorm = () => {
    if (!options[currentBrainstorm][currentIndex].description.trim()) {
      toast("Description is required");
      return;
    }
    if (!options[currentBrainstorm][currentIndex].context.trim()) {
      toast("Description is required");
      return;
    }

    setLoading(true);

    postRequest("/brainstorm/think", {
      ...options[currentBrainstorm][currentIndex],
    })
      .then(({ data }) => {
        setLoading(false);
        setContent(data.result);
      })
      .catch(() => {
        toast("Try Again");
      });
  };

  const reloadContent = () => {
    if (currentIndex < options[currentBrainstorm].length - 1) {
      const newCurrent = currentIndex + 1;
      setCurrentIndex(newCurrent);
    } else {
      setReloading(true);
      setCurrentIndex(0);
      getRequest("/brainstorm/options").then(({ data }) => {
        setReloading(false);
        setOptions(data);
      });
    }
  };

  const addExample = () => {
    const newOptions = {
      ...options,
      [currentBrainstorm]: options[currentBrainstorm].map(
        (item: any, idx: number) => {
          if (idx === currentIndex) {
            return {
              ...item,
              examples: [...item.examples, ""],
            };
          } else {
            return item;
          }
        }
      ),
    };

    setOptions(newOptions);
  };

  const addKeep = (keep: string) => {
    setKeeps((prevKeep) => {
      return [...prevKeep, keep];
    });

    setContent((prevContent: any) => {
      return prevContent.filter((item: string) => item !== keep);
    });
  };

  const removeKeep = (index: number) => {
    setKeeps((prevKeep: any) => {
      return prevKeep.map((_: string, idx: number) => idx !== index);
    });
  };

  const deleteKeep = (keep: string) => {
    setKeeps((prevContent: any) => {
      return prevContent.filter((item: string) => item !== keep);
    });
  };

  const saveBrainStorm = () => {
    setSaving(true);
    postRequest("/brainstorm/save", {
      ...options[currentBrainstorm][currentIndex],
      writer,
      category: currentBrainstorm,
      result: keeps,
    })
      .then(() => {
        setSaving(false);
        setContent(null);
        setCurrentBrainstorm("");
        close();
      })
      .catch(() => {
        setSaving(false);
        toast("Error Saving Brainstorm");
      });
  };

  return (
    <div className="fixed top-0 left-0 inset-0 bg-white p-10 z-30 overflow-y-auto">
      <div className="flex justify-between items-center text-2xl">
        <div>
          {!content ? (
            <BiArrowBack
              className="cursor-pointer"
              onClick={() => {
                if (content) {
                  setContent([]);
                } else {
                  if (currentBrainstorm !== "") {
                    setCurrentBrainstorm("");
                  } else close();
                }
              }}
            />
          ) : (
            <div
              className="flex items-center text-sm cursor-pointer"
              onClick={() => {
                setContent([]);
                setCurrentBrainstorm("");
              }}
            >
              <img src={doubleArrow} alt="" className="h-5" />
              <div>Start Over</div>
            </div>
          )}
        </div>

        {currentBrainstorm ? (
          <div className="flex justify-between gap-10  w-full max-w-2xl">
            <div>
              <div className="font-bold text-3xl">
                Kickstart your Brainstorm
              </div>
              <div className="font-semibold text-base">
                What kind of ideas are you looking for?
                <br /> The more detail, the better.
              </div>
            </div>

            <img src={kickstart} alt="" />
          </div>
        ) : (
          <div className="font-bold text-3xl">
            What do you want to brainstorm?
          </div>
        )}
        <LiaTimesSolid className="cursor-pointer" onClick={close} />
      </div>

      {!content && (
        <>
          {!currentBrainstorm ? (
            <div className="grid grid-cols-4 max-w-2xl mx-auto rounded-xl border border-black overflow-hidden mt-10">
              {brainstorms?.map((item, idx: number) => (
                <div
                  key={idx}
                  className={`${
                    idx === brainstorms.length - 1 && "col-span-2"
                  }`}
                >
                  <SingleBrainstorm
                    text={item.text}
                    img={item.img}
                    handleClick={() => {
                      if (!options) {
                        return;
                      }
                      setCurrentBrainstorm(item.text);
                      setCurrentIndex(0);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 max-w-2xl mx-auto mt-10 gap-4">
              <div className="col-span-2 relative">
                <BrainstormInput
                  label="Give me a list of:"
                  name="description"
                  id="description"
                  handleChange={handleChange}
                  placeholder="Description"
                  value={
                    options[currentBrainstorm]
                      ? options[currentBrainstorm][currentIndex].description
                      : ""
                  }
                />
                <TfiReload
                  className={`absolute bottom-6 right-1 text-sm cursor-pointer ${
                    reloading ? "spin" : ""
                  }`}
                  onClick={reloadContent}
                />
              </div>

              <div className="">
                <BrainstormTextArea
                  label="Context (optional)"
                  name="context"
                  id="context"
                  handleChange={handleChange}
                  placeholder="Context"
                  value={
                    options[currentBrainstorm]
                      ? options[currentBrainstorm][currentIndex].context
                      : ""
                  }
                />
              </div>

              <div className="">
                <div>Example</div>
                {options[currentBrainstorm][currentIndex].examples?.map(
                  (item: any, idx: number) => (
                    <BrainstormInput
                      key={idx}
                      name="example"
                      id={`${idx}`}
                      handleChange={handleChange}
                      value={item}
                      placeholder={`Example ${idx + 1}`}
                    />
                  )
                )}

                {options[currentBrainstorm][currentIndex].examples.length <
                  5 && (
                  <button
                    className="border border-black text-xs font-semibold flex gap-2 items-center px-2 py-1 rounded-full"
                    onClick={addExample}
                  >
                    <FaPlus /> ADD ANOTHER
                  </button>
                )}

                <div className="flex justify-end mt-4">
                  <button
                    className={`text-white ${
                      loading ? "bg-gray-500" : "bg-buttonPurple"
                    } font-semibold px-4 py-2 rounded-full`}
                    onClick={generateBrainstorm}
                    disabled={loading}
                  >
                    {loading ? "Thinking..." : "Start"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {content && (
        <div className="grid grid-cols-5 max-w-2xl mx-auto mt-10 gap-4">
          <div className="col-span-3">
            <div className="w-full flex gap-4 items-center">
              <div className="inline-flex gap-2 items-center bg-gray-100 py-1 px-2 rounded-full w-5/6">
                <div className="truncate text-sm">
                  A sensory detail about the ramen a supernatural detective eats
                  after successfully capturing a ghost that was terrorizing a
                  small family
                </div>
                {/* <FaPen className="text-2xl cursor-pointer" /> */}
              </div>

              <div className="bg-gray-100 p-2 rounded-full">
                <IoReload
                  onClick={generateBrainstorm}
                  className={`${loading && "spin"}`}
                />
              </div>
            </div>

            <div className="h-[70vh] overflow-auto">
              {content?.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 bg-gray-100 rounded-lg my-4 items-center divide-x-2"
                >
                  <div className="p-4 col-span-2">
                    <FaRegThumbsDown
                      className="text-3xl cursor-pointer"
                      onClick={() => removeKeep(idx)}
                    />
                  </div>

                  <div className="col-span-8 text-sm p-4 text-center">
                    {item}
                  </div>

                  <div className="p-4 col-span-2">
                    <FaRegThumbsUp
                      className="text-3xl cursor-pointer"
                      onClick={() => addKeep(item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <div className="bg-gray-100 p-2 rounded-lg">
              <div>
                <div className="flex justify-center items-center relative py-1 text-sm gap-2">
                  <GoThumbsup />
                  <div>KEEPERS</div>
                  {/* <button className="absolute right-1 top-1 bg-buttonPurple text-white py-[1px] px-3 rounded-full">
                    +
                  </button> */}
                </div>
              </div>

              <div className="h-[70vh] overflow-auto">
                {keeps?.map((item, idx) => (
                  <SingleKeeper
                    key={idx}
                    text={item}
                    deleteKeep={() => deleteKeep(item)}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="border border-black font-semibold px-4 py-2 rounded-full"
                onClick={() => {
                  saveBrainStorm();
                }}
                disabled={saving}
              >
                {saving ? "Saving" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brainstorm;
