import * as api from "./api";

let TURNIceServer = null;

export const fetchTurnCredentials = async () => {
  const responseData = await api.getTurnCredentials();
  if (responseData.token?.iceServers) {
    TURNIceServer = responseData.token.iceServers;
  }

  return TURNIceServer;
};

export const getTurnIceServers = () => {
  return TURNIceServer;
};
