import React, { useState } from "react";
import SendMessageButton from "../../resources/images/sendMessageButton.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";
const NewMessage = () => {
  const [message, setMessage] = useState("");

  const handleTextChange = (event) => {
    //todo
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    //tdo
    if (event.key === "Enter") {
      //todo
      event.preventDefault();
      /// send message to others
      console.log("sendding to other user");
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message.length > 0) {
      //todo: execute a function to send a message
      webRTCHandler.sendMessageUsingDataChannel(message);
      setMessage("");
    }
  };
  return (
    <div className="new_message_container">
      <input
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        placeholder="Type your message"
        type="text"
        onKeyDown={handleKeyPressed}
      />
      <img
        className="new_message_button"
        src={SendMessageButton}
        onClick={sendMessage}
      />
    </div>
  );
};

export default NewMessage;
