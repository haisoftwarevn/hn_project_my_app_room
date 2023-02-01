import store from "../store/store";
import { setShowOverlay, setMessages } from "../store/actions";
import * as wss from "../utils/wss";
import { fetchTurnCredentials, getTurnIceServers } from "./turn";
import Peer from "simple-peer";
const defaultContraints = {
  audio: true,
  video: {
    width: "480",
    height: "360",
  },
};

const onlyAudioContraints = {
  audio: true,
  video: false,
};
let localStream;

export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost,
  identity,
  roomId = null,
  onlyAudio
) => {
  // turn server : chờ để sử dụng
  await fetchTurnCredentials();
  ///////////////////////////////
  //todo: access to camera, mic
  const constraints = onlyAudio ? onlyAudioContraints : defaultContraints;
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log("Successfully got local stream");
      localStream = stream;

      // hiểu rồi, localStream chỉ dành cho local, tạo ra lúc khởi tạo
      showLocalVideoPreview(localStream);

      // dispatch an action to hide overlay
      store.dispatch(setShowOverlay(false));
      isRoomHost
        ? wss.createNewRoom(identity, onlyAudio)
        : wss.joinRoom(identity, roomId, onlyAudio);
    })
    .catch((err) => {
      console.log("lổi gì vậy ba stream local::", err);
    });
};

/**
 * peers = {
 * socketId: {
 * ///todo
 * }
 * }
 */
let peers = {}; //test

let streams = [];
const getConfiguration = () => {
  const turnIceServer = getTurnIceServers();
  //const turnIceServer = false;
  if (turnIceServer) {
    console.log("using turn server with twilio :: ", turnIceServer);
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },

        ...turnIceServer,
      ],
    };
  } else {
    //todo
    console.log("using only stun server");
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};

const messengerChannel = "messenger";

export const prepareNewPeerConnection = async (
  connUserSocketId,
  isInitiator
) => {
  //todo
  const configuration = getConfiguration();

  console.log("prepareNewPeerConnection ->connUserSocketId ", connUserSocketId);
  if (!peers[connUserSocketId]) {
    peers[connUserSocketId] = new Peer({
      initiator: isInitiator,
      config: configuration,
      stream: localStream,
      channelName: messengerChannel,
    });

    /// phát đi data cho tất cả user vừa gửi đến
    peers[connUserSocketId].on("signal", (data) => {
      // webRtc offer, anser (sdp informations), ice candidates
      const signalData = {
        signal: data,
        connUserSocketId: connUserSocketId,
      };
      wss.signalPeerData(signalData);
    });

    // lắng nghe  stream từ user vừa phát đến
    peers[connUserSocketId].on("stream", (stream) => {
      //
      console.log("new stream came");
      //display các stream, cũng khá hay đó
      addStream(stream, connUserSocketId);
      ///
      streams = [...streams, stream];
    });

    /// chỗ này chưa ổn
    //// up load trước
    peers[connUserSocketId].on("data", (data) => {
      //todo
      console.log("3333333333333333333333", data);
      const messageData = JSON.parse(data);
      appendNewMessage(messageData);
    });
  }
};

export const handleSignalingData = async (data) => {
  // cách exchange data quá hay
  const { connUserSocketId, signal } = data;
  console.log(
    "handleSignalingData ->connUserSocketId cái gì đây ::: ",
    connUserSocketId
  );

  // cái signal này là dùng để lưu lại để exchange data
  peers[connUserSocketId].signal(signal);
};

export const removePeerConnection = (data) => {
  //todo
  const { socketId } = data;
  console.log("user bị remove", data);
  const videoContainer = document.getElementById(`${socketId}`);
  const videoEl = document.getElementById(`${socketId}-video`);

  if (videoContainer && videoEl) {
    console.log("vào đây chưa");
    //todo
    const tracks = videoEl.srcObject.getTracks();
    tracks.forEach((t) => t.stop());

    /// sao đoạn này chưa remove
    videoEl.srcObject = null;
    videoContainer.removeChild(videoEl);
    videoContainer.parentNode.removeChild(videoContainer);

    if (peers[socketId]) {
      //todo
      console.log("tại sao lại xóa vậy kuuuuu ");
      peers[socketId].destroy();
      delete peers[socketId];
    }

    // delete peers[socketId];

    //test
    console.log("peers-disconnect::", peers);
  }
};

const showLocalVideoPreview = (stream) => {
  console.log("loading 1 di ba");
  //todo
  const videosContainer = document.getElementById("videos_portal");
  videosContainer.classList.add("videos_portal_styles");
  ///
  let videoContainer = document.getElementById("my_room");

  if (videoContainer === null) {
    console.log("gi vay ba");
    videoContainer = document.createElement("div");
    videoContainer.id = "my_room";

    //videoContainer.id = "my_room";
    videoContainer.classList.add("video_track_container");

    ///
    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };

    /////////////
    videoContainer.appendChild(videoElement);
    //// check audio
    if (store.getState().hn_room.connectOnlyWithAudio) {
      videoContainer.appendChild(getAudioOnlyLabel());
    }
    ////////////
    videosContainer.appendChild(videoContainer);
  }
};

const addStream = (stream, connUserSocketId) => {
  const videosContainer = document.getElementById("videos_portal");
  const videoContainer = document.createElement("div");
  videoContainer.id = connUserSocketId;
  videoContainer.classList.add("video_track_container");
  //
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSocketId}-video`;
  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  /////////
  videoElement.addEventListener("click", () => {
    if (videoElement.classList.contains("full_screen")) {
      videoElement.classList.remove("full_screen");
    } else {
      videoElement.classList.add("full_screen");
    }
  });
  /////////////
  videoContainer.appendChild(videoElement);
  /////// check if other user connected with audio

  const participants = store.getState().hn_room.participants;
  //console.log("participants :: ", participants);
  const participant = participants.find((p) => p.socketId === connUserSocketId);
  ///
  if (participant?.onlyAudio) {
    videoContainer.appendChild(getAudioOnlyLabel(participant.identity));
  } else {
    videoContainer.style.position = "static";
  }
  //////////////////////
  videosContainer.appendChild(videoContainer);
};

const getAudioOnlyLabel = (identity = "") => {
  const labelContainer = document.createElement("div");
  labelContainer.classList.add("label_only_audio_container");
  //////
  const label = document.createElement("p");
  label.classList.add("label_only_audio_text");
  label.innerHTML = `Only audio ::  ${identity}`;
  /////
  labelContainer.appendChild(label);
  return labelContainer;
};

/////////////////// Button Logic //////////////

export const toggleMic = (isMuted) => {
  //tdo:
  localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
};

export const toggleCamera = (isDisabled) => {
  //todo
  localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
};

export const toggleScreenShare = (
  isScreenSharingActive,
  screenSharingStream = null
) => {
  //todo
  if (isScreenSharingActive) {
    //todo
    switchVideoTracks(localStream);
  } else {
    //todo
    switchVideoTracks(screenSharingStream);
  }
};

export const switchVideoTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};

/////////////////////////// Message /////
const appendNewMessage = (messageData) => {
  //todo
  const messages = store.getState().hn_room.messages;
  store.dispatch(setMessages([...messages, messageData]));
};

export const sendMessageUsingDataChannel = async (messageContent) => {
  //todo
  console.log("sao không gửi vậy ba", messageContent);
  const identity = store.getState().hn_room.identity;
  const localMessageData = {
    content: messageContent,
    identity,
    messageCreatedByMe: true,
  };

  appendNewMessage(localMessageData);

  const messageData = {
    content: messageContent,
    identity,
  };

  const stringifiedMessageData = JSON.stringify(messageData);

  for (let socketId in peers) {
    console.log(socketId);
    console.log(peers[socketId]);
    peers[socketId].send(stringifiedMessageData);
  }
};
