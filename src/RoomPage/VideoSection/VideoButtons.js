import React from "react";
import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import SwitchScreenShareButton from "./SwitchScreenShareButton";
import LeaveRoomButton from "./LeaveRoomButton";
import { useSelector } from "react-redux";
const VideoButtons = () => {
  //todo
  const { connectOnlyWithAudio } = useSelector((state) => state.hn_room);
  return (
    <div className="video_buttons_container">
      <MicButton />
      {!connectOnlyWithAudio && <CameraButton />}

      <LeaveRoomButton />
      {!connectOnlyWithAudio && <SwitchScreenShareButton />}
    </div>
  );
};

export default VideoButtons;
