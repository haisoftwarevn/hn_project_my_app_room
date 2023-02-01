import React from "react";
import Participants from "./Participants";
import ParticipantsLabel from "./ParticipantsLabel";
import DirectChat from "./DirectChat/DirectChat";
const ParticipantsSection = () => {
  return (
    <div className="participants_section_container">
      <ParticipantsLabel />
      <Participants />
      <DirectChat />
    </div>
  );
};

export default ParticipantsSection;
