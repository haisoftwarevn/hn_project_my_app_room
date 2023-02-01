import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const SingleParticipant = (props) => {
  const { identity, lastItem } = props;

  return (
    <Fragment>
      <p className="participants_paragraph"> {identity}</p>
      {!lastItem && <span className="participants_separator_line"></span>}
    </Fragment>
  );
};
const Participants = () => {
  const { participants } = useSelector((state) => state.hn_room);

  return (
    <div className="participants_container">
      {participants.map((participant, index) => {
        return (
          <SingleParticipant
            key={participant.id}
            lastItem={participants.length === index + 1}
            participant={participant}
            identity={participant.identity}
          />
        );
      })}
    </div>
  );
};

export default Participants;
