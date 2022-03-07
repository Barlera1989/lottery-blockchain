import React, { useState, useEffect } from "react";
import lottery from "../../contracts/lottery";
import web3 from "../../web3";

import "../../styles/App.css";
import "../../styles/startGame.css";
import "../../styles/texts.css";

const Start = (props) => {
  const [lotteryState, setLotteryState] = useState({
    message: "",
    maxPlayers: 0,
    managerFunctions: true,
  });

  const messageEvents = {
    initialMessage: "No game is running. You can start one!",
    beforeOpen: "Generating new lottery.",
    open: "You are the manager! You can end the game anytime.",
    beforeClose: "Finishing game!",
    closed: "Game over! A new game can be started",
    notManager: "You aren't the manager! Nothing to do here.",
    error: "Something is wrong. Try again ",
    canceled: "Operation canceled!",
  };

  const endGame = async () => {
    if (lotteryState.managerFunctions) {
      setLotteryState({ ...lotteryState, message: messageEvents.beforeClose });
      try {
        const accounts = await web3.eth.getAccounts();
        await lottery.methods.pickWinner().send({ from: accounts[0] });
        setLotteryState({ ...lotteryState, message: messageEvents.closed });
        window.location.reload();
      } catch (err) {
        console.error(err);
        setLotteryState({ ...lotteryState, message: messageEvents.canceled });
      }
    }
  };

  const onSubmitEvent = async (event) => {
    event.preventDefault();
    if (lotteryState.managerFunctions) {
      setLotteryState({ ...lotteryState, message: messageEvents.beforeOpen });
      try {
        const accounts = await web3.eth.getAccounts();
        await lottery.methods
          .createLottery(lotteryState.maxPlayers)
          .send({ from: accounts[0] });
        setLotteryState({ ...lotteryState, message: messageEvents.open });
        window.location.reload();
      } catch (err) {
        console.error(err);
        setLotteryState({ ...lotteryState, message: messageEvents.canceled });
      }
    }
  };

  const getConnectState = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const isOpen = await lottery.methods.isOpen().call();
      //setLotteryState( {...lotteryState, message: messageEvents.noGame, managerFunctions: true });
      if (isOpen) {
        const manager = await lottery.methods.seeCurrentManager().call();
        if (accounts[0] == manager) {
          setLotteryState({ ...lotteryState, message: messageEvents.open });
        } else {
          setLotteryState({
            ...lotteryState,
            message: messageEvents.notManager,
            managerFunctions: false,
          });
        }
      } else {
        setLotteryState({
          ...lotteryState,
          message: messageEvents.initialMessage,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getConnectState();
  }, []);

  return (
    <div className="mainCenterContainer">
      <div className="centerInColumns">
        <div className="startTableStatus startTableStatusText">
          {" "}
          START A GAME: ONLY ONE ROUND AT TIME ALLOWED.
        </div>
        <div className="whiteTexts startInstructionsPosition">
          INSTRUCTIONS:
          <br /> <br />1 - IF NO GAME IS RUNNING, ANYONE CAN START A GAME <br />
          2 - TO START A GAME, JUST ENTER MAX PLAYERS NUMBERS AND ENTER START
          GAME.
          <br />
          3 - ONCE GAME HAS STARTED, PLAYERS CAN BUY TICKETS IN THE BUY TICKETS
          SECTION.
          <br />
          4 - THE MANAGER CAN END THE GAME ANYTIME HE WANTS, EVEN IF PLAYERS
          JUST DID'T BUY TICKETS
          <br />
          {"(REMEMBER THAT TRANSACTIONS COSTS MONEY/ GAS)"}
          <br />5 - ONCE A GAME IS FINISHED, ANOTHER GAME CAN BE STARTED.
        </div>

        <div className="startGameContainer">
          <div className="blackTitle"> Start a Game</div>
          <div>&nbsp; </div>
          <form className="formContainer" onSubmit={onSubmitEvent}>
            <div className="inputContainer">
              <div className="blackTexts"> Select max players:</div>
              <input
                className="inputArea"
                value={lotteryState.maxPlayers}
                onChange={(event) =>
                  setLotteryState({
                    ...lotteryState,
                    maxPlayers: event.target.value,
                  })
                }
              />
            </div>
            <button className="button"> START GAME</button>
          </form>
          <div>&nbsp;</div>

          <div className="blackTitle"> End Game</div>
          <button className="button" onClick={() => endGame()}>
            {" "}
            END GAME
          </button>
          <div>&nbsp;</div>
          <span className="blackTexts"> Info: {lotteryState.message}</span>
        </div>
      </div>
    </div>
  );
};

export default Start;
