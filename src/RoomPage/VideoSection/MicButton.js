import React, { useState } from "react";
import MicButtonImage from "../../resources/images/mic.svg";
import MicButtonImageOff from "../../resources/images/micOff.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";
const MicButton = () => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const handleMicButtonPressed = () => {
    webRTCHandler.toggleMic(isMicMuted); // cách sắp lên tren này rất hay
    setIsMicMuted(!isMicMuted);
  };
  return (
    <div className="video_button_container">
      <img
        src={isMicMuted ? MicButtonImageOff : MicButtonImage}
        onClick={handleMicButtonPressed}
        className="video_button_image"
      />
    </div>
  );
};

export default MicButton;
