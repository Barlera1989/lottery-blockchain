import React from "react";
import "../../styles/App.css"
import ethereum from './ethereum.png'
import react from './react.png'
import chai from './chai.png'
import hardhat from './hardhat.png'
import infura from './infura.png'
import node from './node.png'
import remix from './remix.png'
import solidity from './solidity.png'
import web3 from './web3.png'



const CenterContainer = (props) => {

      return (
            <div className="mainCenterContainer slowAppear">
                  <div className="centerInColumns">
                        <div className="fonts1"> WELCOME TO THE LOTTERY GAME! </div>
                        <div className="fonts1"> THIS IS A GAME WITH EDUCATIONAL PURPOSES </div>
                        <div className="fonts1"> THE CONTRACT IS DEPLOYED AND VERIFIED IN THE EHTEREUM RINKEBY NETWORK </div>
                        <div className="fonts1"> YOU CAN ACCESS THE CONTRACT HERE </div>
                        <div className="fonts1"> &nbsp; </div>
                        <div className="fonts1"> CONTRACT AND TESTS MADE WITH REMIX, INFURA ,HARDHAT AND NODE.JS </div>
                        <div className="fonts1"> FRONT-END INTERFACE CONNECTION WAS MADE WITH REACT AND WEB3 </div>

                        <div className="imagesContainer">
                              <img className="imgs" src={chai} alt="" />
                              <img className="imgs" src={ethereum} alt="" />
                              <img className="imgs" src={hardhat} alt="" />
                              <img className="imgs" src={infura} alt="" />
                              <img className="imgs" src={node} alt="" />
                              <img className="imgs" src={react} alt="" />
                              <img className="imgs" src={remix} alt="" />
                              <img className="imgs" src={solidity} alt="" />
                              <img className="imgs" src={web3} alt="" />                          
                        </div>
                  
                  </div>
             
            </div>
      );
};

export default CenterContainer;
