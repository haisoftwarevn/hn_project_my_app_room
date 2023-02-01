import React, { useEffect } from "react";
import logo from "../resources/images/logo.png";
import "./IntroductionPage.css";
import ConnectingButtons from "./ConnectingButtons";
////
import { setIsRoomHost } from "../store/actions";
import { useDispatch } from "react-redux";
const IntroductionPage = () => {
  const dispatch = useDispatch();
  ////

  useEffect(() => {
    dispatch(setIsRoomHost(false));
  }, []);
  //todo
  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <img className="introduction_page_image" src={logo} />
        <ConnectingButtons />
      </div>
    </div>
  );
};

export default IntroductionPage;
