import React, { useState } from "react";
import { useSelector } from "react-redux";
import DirectChatHeader from "./DirectChatHeader";
const DirectChat = () => {
  const [messages, setMessages] = useState([]);
  const { activeConversation, directChatHistory } = useSelector(
    (state) => state.hn_room
  );
  return (
    <div className="direct_chat_container">
      <DirectChatHeader activeConversation={activeConversation} />
    </div>
  );
};

export default DirectChat;
