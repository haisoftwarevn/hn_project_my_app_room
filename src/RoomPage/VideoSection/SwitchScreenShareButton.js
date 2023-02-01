import React, { useState, Fragment } from "react";
import SwitchImage from "../../resources/images/switchToScreenSharing.svg";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";

import * as webRTCHandler from "../../utils/webRTCHandler";
/////////

const constraints = {
  audio: false,
  video: true,
};
///////////
const SwitchScreenShareButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);
  const handleScreenShareToggle = async () => {
    //todo

    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (error) {
        console.log("lổi sharing screen rồi ba :: ", error);
      }

      if (stream) {
        setScreenSharingStream(stream);

        webRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
        setIsScreenSharingActive(true);
        // switch video screen
      }
    } else {
      webRTCHandler.toggleScreenShare(isScreenSharingActive);

      /// đổi sang camera
      setIsScreenSharingActive(false);
      /// stop screen sharing : đoạn này xem lại
      screenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenSharingStream(null);
    }

    //setIsScreenSharingActive(!isScreenSharingActive);
  };
  return (
    <Fragment>
      <div className="video_button_container">
        <img
          src={SwitchImage}
          onClick={handleScreenShareToggle}
          className="video_button_image"
        />
      </div>
      {isScreenSharingActive && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )}
    </Fragment>
  );
};

export default SwitchScreenShareButton;
