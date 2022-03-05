import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import web3 from "../../web3";
import logo from "./logo.png";

import metamaskLogo from "./metamask.png";
import "../../styles/App.css";
import "../../styles/navbar.css";
import "../../styles/texts.css";
import "../../styles/images.css";

const NavComponent = (props) => {
  const navigate = useNavigate();
  const [connected, setConnected] = useState(false);

  const getConnectState = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) setConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getConnectState();
  }, []);

  return (
    <div className="navbar_c">
      <img className="lotteryImage" src={logo} alt="" />
      <div className="centerInRows">
        <div className="whiteTexts links" onClick={() => navigate("/")}>
          {" "}
          HOME
        </div>
        <div className="whiteTexts links" onClick={() => navigate("/gameplay")}>
          {" "}
          GAMEPLAY{" "}
        </div>
        <div className="whiteTexts links" onClick={() => navigate("/start")}>
          {" "}
          START A GAME{" "}
        </div>
        <div className="whiteTexts links" onClick={() => navigate("/play")}>
          {" "}
          BUY TICKET{" "}
        </div>
        <div className="metamaskImageContainer links">
          <img className="metamaskImage" src={metamaskLogo} alt="" />
          {connected ? (
            <div className="metamaskContainerText">Wallet connected</div>
          ) : (
            <div className="metamaskContainerText">Connect to Metamask</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavComponent;
