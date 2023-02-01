import React from "react";
import { useSelector } from "react-redux";
// const messages = [
//   {
//     content: "hey",
//     identity: "Meresk",
//     messageCreatedByMe: true,
//   },
//   {
//     content: "Hello Everyone",
//     identity: "Meresk",
//     messageCreatedByMe: true,
//   },
//   {
//     content: "Hello Maresk",
//     identity: "John",
//     messageCreatedByMe: false,
//   },

//   {
//     content: "Hello Everyone",
//     identity: "Anna",
//     messageCreatedByMe: false,
//   },
// ];

const Message = ({ content, author, messageCreatedByMe, sameAuthor }) => {
  const alignClass = messageCreatedByMe
    ? "message_align_right"
    : "message_align_left";

  const authorText = messageCreatedByMe ? "You" : author;

  const contentAdditionalStyles = messageCreatedByMe
    ? "message_right_styles"
    : "message_left_styles";

  return (
    <div className={`message_container ${alignClass}`}>
      {!sameAuthor && <p className="message_title">{authorText}</p>}
      <p className={`message_content ${contentAdditionalStyles}`}>{content}</p>
    </div>
  );
};

const Messages = () => {
  //todo
  const { messages } = useSelector((state) => state.hn_room);
  return (
    <div className="messages_container">
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 && message.identity === messages[index - 1].identity;
        return (
          <Message
            key={`${message.content}${index}`}
            author={message.identity}
            sameAuthor={sameAuthor}
            content={message.content}
            messageCreatedByMe={message.messageCreatedByMe}
          />
        );
      })}
    </div>
  );
};

export default Messages;
