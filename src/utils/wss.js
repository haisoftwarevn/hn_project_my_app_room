import io from "socket.io-client";
import store from "../store/store";
import { setRoomId, setParticipants } from "../store/actions";
import * as webRTCHandler from "../utils/webRTCHandler";
const SERVER = "http://192.168.1.85:5002";

let socket = null;

export const connectWithSocketIoServer = () => {
  //todo
  socket = io(SERVER);

  socket.on("connect", () => {
    //todo
    console.log("successfully connected with socket io server ::", socket.id);
  }); //ok

  socket.on("room-id", (data) => {
    //todo
    const { roomId } = data;
    store.dispatch(setRoomId(roomId));
  }); // ok

  socket.on("room-update", (data) => {
    const { connectedUsers } = data;
    store.dispatch(setParticipants(connectedUsers));
  }); // ok

  socket.on("conn-prepare", (data) => {
    //todo
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

    /// kết thúc quá trình chuẩn bị,
    /// thông báo đên các user, chuẩn bị exchange
    socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  }); //ok

  socket.on("conn-signal", (data) => {
    //todo

    webRTCHandler.handleSignalingData(data);
  }); //ok

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;

    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  }); // ok

  socket.on("user-disconnected", (data) => {
    //todo

    webRTCHandler.removePeerConnection(data);
  });
};

export const createNewRoom = (identity, onlyAudio) => {
  //emit an event to server that you want to create a room
  const data = {
    identity,
    onlyAudio,
  };

  socket.emit("create-new-room", data);
}; //ok

export const joinRoom = (identity, roomId, onlyAudio) => {
  //todo: emit an event to server that you want to join a room

  const data = {
    roomId,
    identity,
    onlyAudio,
  };

  socket.emit("join-room", data);
}; //ok

export const signalPeerData = (signalData) => {
  socket.emit("conn-signal", signalData);
}; //ok
