import React, { useState, Fragment } from "react";
import JoinRoomInputs from "./JoinRoomInputs";
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import { useSelector, useDispatch } from "react-redux";
import ErrorMessage from "./ErrorMessage";
import JoinRoomButtons from "./JoinRoomButtons";
import { getRoomExists } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { setRoomId, setIdentity } from "../store/actions";
const JoinRoomContent = () => {
  const { isRoomHost } = useSelector((state) => state.hn_room);
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  ///////////

  const joinRoom = async () => {
    //todo

    const responseMessage = await getRoomExists(roomIdValue);
    const { roomExists, full } = responseMessage;

    if (roomExists) {
      if (full) {
        setErrorMessage("Room is full");
      } else {
        //todo: join a meeting room
        //todo: save in our redux store meeting id which was provided by user want to like
        dispatch(setRoomId(roomIdValue));
        navigate("/room");
      }
    } else {
      setErrorMessage("Room not found. Check your room metting");
    }
  };

  const createRoom = () => {
    //todo
    navigate("/room");
  };

  const handleJoinRoom = async () => {
    dispatch(setIdentity(nameValue));
    if (isRoomHost) {
      createRoom();
    } else {
      await joinRoom();
    }
  };

  ///////////////
  return (
    <Fragment>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
      />
      <OnlyWithAudioCheckbox />
      <ErrorMessage errorMessage={errorMessage} />
      <JoinRoomButtons
        isRoomHost={isRoomHost}
        handleJoinRoom={handleJoinRoom}
      />
    </Fragment>
  );
};

export default JoinRoomContent;
