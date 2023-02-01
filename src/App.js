import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroductionPage from "./IntroductionPage/IntroductionPage";
import JoinRoomPage from "./JoinRoomPage/JoinRoomPage";
import RoomPage from "./RoomPage/RoomPage";

import { connectWithSocketIoServer } from "../src/utils/wss";
function App() {
  useEffect(() => {
    connectWithSocketIoServer();
  }, []);
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/join-room" element={<JoinRoomPage />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/*" element={<IntroductionPage />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
