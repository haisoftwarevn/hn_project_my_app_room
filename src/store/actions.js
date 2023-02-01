const Actions = {
  SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
  SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONNECT_ONLY_WITH_AUDIO",
  SET_ROOM_ID: "SET_ROOM_ID",
  SET_IDENTITY: "SET_IDENTITY",
  SET_SHOW_OVERLAY: "SET_SHOW_OVERLAY",
  SET_PARTICIPANTS: "SET_PARTICIPANTS",
  SET_LOCAL_STREAM: "SET_LOCAL_STREAM",
  SET_MESSAGES: "SET_MESSAGES",
  SET_ACTIVE_CONVERSATION: "SET_ACTIVE_CONVERSATION",
  SET_DIRECT_CHAT_HISTORY: "SET_DIRECT_CHAT_HISTORY",
  SET_SOCKET_ID: "SET_SOCKET_ID",
};
/////////// TỰ LÀM

export const setLocalStream = (localStream) => {
  return async (dispatch) => {
    dispatch({
      type: Actions.SET_LOCAL_STREAM,
      localStream,
    });
  };
};
//////////////////////

export const setIsRoomHost = (isRoomHost) => {
  return async (dispatch) => {
    dispatch({
      type: Actions.SET_IS_ROOM_HOST,
      isRoomHost,
    });
  };
};

export const setConnectOnlyWithAudio = (onlyWithAudio) => {
  return async (dispatch) => {
    dispatch({
      type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
      connectOnlyWithAudio: onlyWithAudio,
    });
  };
};

export const setIdentity = (identity) => {
  return async (dispatch) => {
    dispatch({
      type: Actions.SET_IDENTITY,
      identity,
    });
  };
};

export const setRoomId = (roomId) => {
  return async (dispatch) => {
    dispatch({
      type: Actions.SET_ROOM_ID,
      roomId,
    });
  };
};

export const setShowOverlay = (showOverlay) => {
  return async (dispatch) => {
    dispatch({
      type: Actions.SET_SHOW_OVERLAY,
      showOverlay,
    });
  };
};

export const setParticipants = (participants) => {
  return async (dispatch) => {
    dispatch({
      type: Actions.SET_PARTICIPANTS,
      participants,
    });
  };
};

export const setMessages = (messages) => {
  return async (dispatch) => {
    dispatch({
      type: Actions.SET_MESSAGES,
      messages,
    });
  };
};

export const setActiveConversation = (activeConversation) => {
  return async (dispatch) => {
    dispatch({
      type: Actions.SET_ACTIVE_CONVERSATION,
      activeConversation,
    });
  };
};

export const setDirectChatHistory = (directChatHistory) => {
  return async (dispatch) => {
    dispatch({
      type: Actions.SET_DIRECT_CHAT_HISTORY,
      directChatHistory,
    });
  };
};

export const setSocketId = (socketId) => {
  return async (dispatch) => {
    dispatch({
      type: Actions.SET_SOCKET_ID,
      socketId,
    });
  };
};

export default Actions;
