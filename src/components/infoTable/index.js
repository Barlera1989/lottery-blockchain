import React, { useState, useEffect } from "react";
import web3 from "../../web3";
import lottery from "../../contracts/lottery";

import "../../styles/App.css";
import "../../styles/infoTable.css";

const InfoTable = (props) => {
  const [loading, setLoading] = useState(true);
  const [lotteryState, setLotteryState] = useState({
    games: 0,
    total_prizes: 0,
    tickets: [],
    winnings: false,
    onGoing: "LOADING",
    color: "black",
  });

  const getContractData = async () => {
    let isOpen, games, total_prizes, tickets, winnings;

    try {
      isOpen = await lottery.methods.isOpen().call();
      games = await lottery.methods.numberOfGames().call();
      total_prizes = await lottery.methods.totalAwards().call();
      if (isOpen) {
        tickets = await lottery.methods.seeUsedTickets().call();
        winnings = await web3.eth.getBalance(lottery.options.address);
        setLotteryState({
          ...lotteryState,
          games,
          total_prizes,
          tickets,
          winnings,
          onGoing: "OPEN",
          color: "green",
        });
        setLoading(false);
      } else {
        setLotteryState({
          ...lotteryState,
          games,
          total_prizes,
          onGoing: "CLOSED",
          color: "red",
        });
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getContractData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="infoTableContainer">loading...</div>
      ) : (
        <div className="infoTableContainer">
          <div className="infoTableTitle">Statistics:</div>
          <div>&nbsp; </div>
          <div className="infoTableTexts">
            GAMES PLAYED: <br /> {lotteryState.games}{" "}
          </div>
          <div className="infoTableTexts">
            TOTAL PRIZES: <br />
            {lotteryState.total_prizes / 10 ** 18} ETH{" "}
          </div>
          <div>&nbsp; </div>
          <div className="infoTableTitle">Current Game:</div>
          <div>&nbsp; </div>
          <div className="infoTableTexts">
            BUYED TICKETS:{" "}
            {lotteryState.tickets.length === 0
              ? 0
              : lotteryState.tickets.length}{" "}
          </div>
          <div className="infoTableTexts">
            PRIZE:{" "}
            {lotteryState.winnings
              ? (lotteryState.winnings * 0.8) / 10 ** 18 + " ETH"
              : "N/A"}
          </div>
          <div className="infoTableTexts">
            STATUS: &nbsp;
            <span className="blink" style={{ color: lotteryState.color }}>
              {lotteryState.onGoing}
            </span>{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default InfoTable;
