import { useEffect, useRef, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { LuHistory } from "react-icons/lu";

const SingleField = ({
  setFieldName,
  setFieldValue,
  inp,
  form,
}: {
  setFieldName: (i: string, j: string, k: string) => void;
  setFieldValue: (i: string, j: string, k: string) => void;
  inp: any;
  form: any;
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const optionRef: any = useRef();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef?.current?.contains(event.target as Node)
      ) {
        setOpenDelete(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="my-4 text-sm" key={inp.id}>
      <div className="flex justify-between">
        <input
          type="text"
          value={inp.name}
          className="outline-none"
          placeholder="Field name"
          onChange={(e) => setFieldName(form.id, inp.id, e.target.value)}
        />

        <div
          className="relative"
          onClick={() => setOpenDelete(!openDelete)}
          ref={optionRef}
        >
          <FaEllipsis className="cursor-pointer" />

          {openDelete && (
            <div className="absolute rounded-md top-full right-0 bg-white p-4 shadow-lg font-semibold text-red-500">
              Delete
            </div>
          )}
        </div>
      </div>

      <input
        type="text"
        value={inp.value}
        className="w-full border border-black rounded-md outline-none mt-2 p-2"
        onChange={(e) => setFieldValue(form.id, inp.id, e.target.value)}
      />
    </div>
  );
};

const SingleForm = ({
  form,
  setFormName,
  formTypes,
  setFieldName,
  setFieldValue,
  addTrait,
}: {
  form: any;
  setFormName: (id: string, name: string) => void;
  formTypes: string[];
  setFieldName: (i: string, j: string, k: string) => void;
  setFieldValue: (i: string, j: string, k: string) => void;
  addTrait: (e: string) => void;
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const optionRef: any = useRef();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef?.current?.contains(event.target as Node)
      ) {
        setOpenDelete(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="single-story">
      <div className="flex justify-between">
        <div>
          <input
            type="text"
            className="text-lg bg-transparent outline-none"
            placeholder="Name"
            onChange={(e) => setFormName(form.id, e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <LuHistory className="text-2xl" />
          <select
            name=""
            id=""
            className="border border-black rounded-md p-[2px]"
            value={form.type}
          >
            {formTypes.map((type) => (
              <option value={type} className="capitalize">
                {type}
              </option>
            ))}
          </select>
          <div
            className="relative"
            onClick={() => setOpenDelete(!openDelete)}
            ref={optionRef}
          >
            <FaEllipsis className="cursor-pointer" />

            {openDelete && (
              <div className="absolute rounded-md top-full right-0 bg-white p-4 shadow-lg font-semibold text-red-500">
                Delete
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <form action=""> */}
      <div>
        {form?.traits?.map((inp: any) => (
          <SingleField
            form={form}
            setFieldName={setFieldName}
            setFieldValue={setFieldValue}
            inp={inp}
            key={inp.id}
          />
        ))}
      </div>

      <button onClick={() => addTrait(form.id)}>+ Add Trait</button>
      {/* </form> */}
    </div>
  );
};

export default SingleForm;
