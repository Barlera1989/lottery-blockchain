import React from "react";
import "../../styles/App.css";
import "../../styles/texts.css";

const Gameplay = (props) => {
  return (
    <div className="mainCenterContainer">
      <div className="centerInColumns slowAppear">
        <div className="whiteTitle"> RULES:</div>
        <div>&nbsp;</div>
        <div className="whiteTexts"> EVERYONE CAN CREATE A LOTTERY GAME</div>
        <div className="whiteTexts">
          {" "}
          THE GAME CREATOR RECIEVES 15% OF ALL WINNINGS
        </div>
        <div className="whiteTexts">
          {" "}
          THE GAME WILL CHOOSE HOW MANY TICKETS WILL BE AVAILABLE
        </div>
        <div className="whiteTexts">
          {" "}
          PLAYERS WILL COMPETE FOR 80% OF WINNINGS
        </div>
        <div className="whiteTexts">
          {" "}
          ANYTIME, GAME CREATOR CAN RUN THE LOTTERY
        </div>
        <div className="whiteTexts">
          {" "}
          THE CONTRACT OWNER WILL RECIEVE 5% OF WINNINGS EACH CONTRACT
        </div>
        <div className="whiteTexts">
          {" "}
          ANOTHER GAME CAN START ONLY AFTER A GAME IS CLOSED
        </div>
        <div className="whiteTexts">
          {" "}
          THE CREATOR OF THE CONTRACT CAN END A GAME, AND EVERYONE GET IT'S
          MONEY BACK
        </div>
        <div>&nbsp;</div>
        <div className="whiteTitle"> ENJOY !!</div>
      </div>
    </div>
  );
};

export default Gameplay;
