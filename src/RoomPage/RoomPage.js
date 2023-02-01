import React, { useEffect } from "react";

import ChatSection from "./ChatSection/ChatSection";
import VideoSection from "./VideoSection/VideoSection";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import RoomLabel from "./RoomLabel";
import Overlay from "./Overlay";
import * as webRTCHandler from "../utils/webRTCHandler";
import { useSelector } from "react-redux";

////////
import "./RoomPage.css";
//////

const RoomPage = () => {
  const { roomId, identity, isRoomHost, showOverlay, connectOnlyWithAudio } =
    useSelector((state) => state.hn_room);

  useEffect(() => {
    if (!isRoomHost && !roomId) {
      const siteUrl = window.location.origin;
      window.location.href = siteUrl;
    } else {
      webRTCHandler.getLocalPreviewAndInitRoomConnection(
        isRoomHost,
        identity,
        roomId,
        connectOnlyWithAudio
      );
    }
  }, []);
  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
      {showOverlay && <Overlay />}
    </div>
  );
};

export default RoomPage;
