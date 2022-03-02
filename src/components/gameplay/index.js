import React from "react";
import "../../styles/App.css"

const Gameplay = (props) => {
 
      return (
            <div className="mainCenterContainer">
                  <div className="centerInColumns">
                        <div className="fonts2"> RULES:</div>
                        <div>&nbsp;</div>
                        <div className="fonts1"> EVERYONE CAN CREATE A LOTTERY GAME</div>
                        <div className="fonts1"> THE GAME CREATOR RECIEVES 15% OF ALL WINNINGS</div>
                        <div className="fonts1"> THE GAME WILL CHOOSE HOW MANY TICKETS WILL BE AVAILABLE</div>
                        <div className="fonts1"> PLAYERS WILL COMPETE FOR 80% OF WINNINGS</div>
                        <div className="fonts1"> ANYTIME, GAME CREATOR CAN RUN THE LOTTERY</div>
                        <div className="fonts1"> THE CONTRACT OWNER WILL RECIEVE 5% OF WINNINGS EACH CONTRACT</div>
                        <div className="fonts1"> ANOTHER GAME CAN START ONLY AFTER A GAME IS CLOSED</div>
                        <div className="fonts1"> THE CREATOR OF THE CONTRACT CAN END A GAME, AND EVERYONE GET IT'S MONEY BACK</div>
                        <div>&nbsp;</div>
                        <div className="fonts2"> ENJOY !!</div>
                  </div>
            </div>
      );
};

export default Gameplay;
