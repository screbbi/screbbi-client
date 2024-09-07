import ModalLayout from "../layout/ModalLayout";

const VideoTourModal = ({
    close
}: {
    close: () => void;
}) => {
    return (
        <ModalLayout close={close} title="Video Tour">
            <div>
                <video className="w-full h-auto" controls={false} autoPlay>
                    <source src="https://ik.imagekit.io/i6zge2ey1/Revised%20Video%20-%20Screbbi.mp4?updatedAt=1725700613546" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </ModalLayout>
    );
};

export default VideoTourModal;
