import ModalLargeLayout from "../layout/ModalLargeLayout";

const VideoTourModal = ({
    close
}: {
    close: () => void;
}) => {
    return (
        <ModalLargeLayout close={close} title="Video Tour">
            <div>
                <video className="w-full h-auto" controls={false} autoPlay>
                    <source src="https://res.cloudinary.com/dw2iplfj2/video/upload/v1725700651/Revised_Video_-_Screbbi_hzlzir.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </ModalLargeLayout>
    );
};

export default VideoTourModal;
