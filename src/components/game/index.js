import React, {useEffect, useState} from "react";
import lottery from "../../contracts/lottery";
import web3 from '../../web3'
import "../../styles/App.css"

const Game = (props) => {
      const [lotteryState, setLotteryState] = useState({ maxPlayers: "", usedTickets: [], yourTicket: "" ,message: ""  })
      const [cardsState, setCardsState] = useState('')
      const [loaded, setLoaded] = useState(false)
      const [updatePage,setUpdatePage] = useState(false)

      const getData = async () =>  {

            try {
                  let accounts, isOpen, maxPlayers, usedTickets;
                  let yourTicket = "N/A"
                  accounts = await web3.eth.getAccounts();
                  isOpen = await lottery.methods.isOpen().call();
                  if (isOpen) {
                        maxPlayers = (await lottery.methods.getAllLotteryTickets().call()).length
                        usedTickets = await lottery.methods.seeUsedTickets().call()
                        if (accounts.length > 0 ) {
                              yourTicket = await lottery.methods.seeYourTicket(accounts[0]).call()
                        } else {
                              yourTicket = "CONNECT TO METAMASK!"
                        }
                        setLotteryState( {...lotteryState, maxPlayers , usedTickets, yourTicket });
                        renderCards(maxPlayers, usedTickets)
                  }
            } catch(err) {
                  console.error(err)
            }
      }

      const buyTicket = async (ticket) => {
            try {
                        const accounts = await web3.eth.getAccounts();
                        if (accounts.length >0) {
                              const buyATicket = await lottery.methods.enter(ticket).send({
                                    from: accounts[0], value: web3.utils.toWei("0.01", "ether")
                              });
                        }
                  
            } catch(err) {
            console.error(err)
            }
      }    

      const renderCards = (maxPlayers,usedTickets) => {
            const cards = []

            for (let i=1; i <= maxPlayers ; i++){
                  if ((usedTickets.filter((ticket) => Number(ticket) === i)).length !== 0){
                        cards.push(<div key={i} className="card cardOff">{i}</div>) 
                  }else {
                        cards.push(<div key={i} className="card cardOn hoverable"  onClick={(e) => buyTicket(String(e.target.innerText))}>{i}</div>) 
                  }
                  
            }
            setCardsState(cards)
      }

      
      useEffect(()=> {
            renderCards()
            getData()
           
      },[updatePage])


      return (
            <div className="mainCenterContainer">
                  <div className="centerInColumns">
                        <div className="fonts2"> Buy your ticket! Only 0.01 ETH (Plus gas)</div>
                        <div>&nbsp; </div>
                        <div className="fonts1"> Available tickets:</div>
                        <div className="cardContainer">
                             {cardsState}
                        </div>
                        <div className="fonts2">Your ticket: <span style={{color: "green"}}>{lotteryState.yourTicket == 0 ? "N/A":lotteryState.yourTicket  }</span></div>
                              </div>
            </div>
      );
}

export default Game;