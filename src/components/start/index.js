import React, {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/App.css"
import "../../styles/startGame.css"
import web3 from '../../web3'
import lottery from "../../contracts/lottery";

const Start = (props) => {
    const [lotteryState, setLotteryState] = useState({message:"No game is running. You can start one.", maxPlayers:0, managerFunctions: true})

    const messageEvents = {
          beforeOpen: "Generating new lottery.",
          open: "You are the manager! You can end the game anytime.",
          beforeClose: "Finishing game!",
          closed: "Game over! A new game can be started",
          notManager : "You aren't the manager! Nothing to do here.",
          error: "Something is wrong. Try again "
    }

    const endGame = async () =>{
      if (lotteryState.managerFunctions) {
          setLotteryState( {...lotteryState, message: messageEvents.beforeClose });  
          try{
                
                const accounts = await web3.eth.getAccounts();
            await lottery.methods
            .pickWinner()
            .send({ from: accounts[0]});
            setLotteryState( {...lotteryState, message: messageEvents.closed });  
       }catch (err) {
            console.error(err)
            setLotteryState( {...lotteryState, message: messageEvents.error });  
            }
      }
      }

    const onSubmitEvent = async (event) => {
        event.preventDefault();
            if (lotteryState.managerFunctions) {
                  setLotteryState( {...lotteryState, message: messageEvents.beforeOpen });
                  try {
                        const accounts = await web3.eth.getAccounts();
                        await lottery.methods
                        .createLottery(lotteryState.maxPlayers)
                        .send({ from: accounts[0]});
                        setLotteryState( {...lotteryState, message:  messageEvents.open  });
                  }catch (err){
                        console.error(err)
                        setLotteryState( {...lotteryState, message: messageEvents.error });  
                  }
            }
      };

      const getConnectState = async () => {
            try{
                  const accounts = await web3.eth.getAccounts();
                  const isOpen = await lottery.methods.isOpen().call()
                  //setLotteryState( {...lotteryState, message: messageEvents.noGame, managerFunctions: true }); 
                  if (isOpen) {
                        const manager = await lottery.methods.seeCurrentManager().call()
                        if (accounts[0] == manager) {
                              setLotteryState( {...lotteryState, message: messageEvents.open }); 
                        } else {
                              setLotteryState( {...lotteryState, message: messageEvents.notManager, managerFunctions: false }); 
                        }
                              
                  }

             } catch (err){
                  console.error(err)
            }
        }

  useEffect(() => {
      getConnectState()
  },[lotteryState.message])

      return (
            <div className="mainCenterContainer">
                  <div className="centerInColumns">
                        <div className="startTableStatus startTableStatusText"> START A GAME: ONLY ONE ROUND AT TIME ALLOWED.</div>
                        
                        <div className="startGameContainer">
                        <div className='startTableTitle'> Options:</div>
                        <div>&nbsp;</div>
                        <div className='startTableTitle'> Start a Game</div>
                        <form className="formContainer"  onSubmit={onSubmitEvent}>
                              <div className="inputContainer">

                              <div className='startTableTexts'> Select max players:</div>
                              <input className="inputArea"
                                    value={lotteryState.maxPlayers}
                                    onChange={(event) => setLotteryState({...lotteryState, maxPlayers:  event.target.value})}
                                    />
                                    </div>
                               <button className="button"> START GAME</button>
                        </form>
                        <div>&nbsp;</div>
                       
                        <div className='startTableTitle'> End Game</div>
                        <button className="button" onClick={() => endGame()}> END GAME</button>
                        <div>&nbsp;</div>
                        <span className='startTableTexts'> Info: {lotteryState.message}</span>

                        </div>
                        
                  </div>
                 {/*  <div className="fonts1"> Status: {lotteryState.message}</div> */}
             
            </div>
      );
};

export default Start;
