import axios from "axios";

const serverApi = "http://192.168.1.85:5002/api";

export const getRoomExists = async (roomId) => {
  //todo

  const response = await axios.get(`${serverApi}/room-exists/${roomId}`);

  return response.data;
};

export const getTurnCredentials = async () => {
  //todo
  const response = await axios.get(`${serverApi}/get-turn-credentials`);
  return response.data;
};
