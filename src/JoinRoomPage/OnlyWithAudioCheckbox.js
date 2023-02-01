import React from "react";
import CheckImage from "../resources/images/check.png";
///
import { useDispatch, useSelector } from "react-redux";
import { setConnectOnlyWithAudio } from "../store/actions";
////
const OnlyWithAudioCheckbox = () => {
  const dispatch = useDispatch();
  const { connectOnlyWithAudio } = useSelector((state) => state.hn_room);
  const handleConnectionTypeChange = () => {
    //todo: change info in our store about connection type

    dispatch(setConnectOnlyWithAudio(!connectOnlyWithAudio));
  };
  return (
    <div className="checkbox_container">
      <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
        {connectOnlyWithAudio && (
          <img className="checkbox_image" src={CheckImage} />
        )}
      </div>
      <p className="checkbox_container_paragraph">Only Audio</p>
    </div>
  );
};

export default OnlyWithAudioCheckbox;
