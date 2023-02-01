import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./JoinRoomPage.css";
import { useSelector, useDispatch } from "react-redux";
import { setIsRoomHost } from "../store/actions";
////////
import JoinRoomTitle from "./JoinRoomTitle";
import JoinRoomContent from "./JoinRoomContent";
///////////
const JoinRoomPage = () => {
  const search = useLocation().search;
  const dispatch = useDispatch();
  const { isRoomHost } = useSelector((state) => state.hn_room);
  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host");
    if (isRoomHost) {
      dispatch(setIsRoomHost(true));
    }
  }, []);
  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent />
      </div>
    </div>
  );
};

export default JoinRoomPage;
