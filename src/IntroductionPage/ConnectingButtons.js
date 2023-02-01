import React from "react";
import { useNavigate } from "react-router-dom";
import ConnectingButton from "./ConnectingButton";
const ConnectingButtons = () => {
  const navigate = useNavigate();
  const pushToJoinRoomPage = () => {
    //todo
    navigate("/join-room");
  };
  const pushToJoinRoomPageAsHost = () => {
    //todo
    navigate("/join-room?host=true");
  };
  return (
    <div className="connecting_buttons_container">
      <ConnectingButton
        buttonText="Join a meeting"
        onClickHandler={pushToJoinRoomPage}
      />
      <ConnectingButton
        createRoomButton={true}
        buttonText="Host a meeting"
        onClickHandler={pushToJoinRoomPageAsHost}
      />
    </div>
  );
};

export default ConnectingButtons;
