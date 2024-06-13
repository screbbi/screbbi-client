import ModalLayout from "../layout/ModalLayout";
import OnboardButton from "./OnboardButton";
import OnboardInput from "./OnboardInput";

const RenameProjectModal = ({
  close,
  name,
  setName,
  loading,
  click,
}: {
  close: () => void;
  name: string;
  setName: (e: string) => void;
  loading: boolean;
  click: () => void;
}) => {
  return (
    <ModalLayout close={close} title="Rename Project">
      <div>
        <OnboardInput
          name="name"
          value={name}
          change={(e) => setName(e.target.value)}
          placeholder="Project New Name"
          label="Project Name"
        />
        <OnboardButton text="Submit" click={click} loading={loading} />
        <button className=""></button>
      </div>
    </ModalLayout>
  );
};

export default RenameProjectModal;
