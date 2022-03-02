import React, {useState,  useEffect } from "react";
import logo from "./logo.png";
import metamaskLogo from "./metamask.png";
import { useNavigate } from "react-router-dom";
import "../../styles/App.css"
import "../../styles/navbar.css"
import Web3 from "web3";
import web3 from '../../web3'
import lottery from "../../contracts/lottery";

const NavComponent = (props) => {
      const navigate = useNavigate();
      const [connected, setConnected] = useState(false)

      const connectMetamask = async () => {
            try{
                  window.ethereum.request({ method: "eth_requestAccounts" });
                  const web3 = new Web3(window.ethereum);
            } catch (err){
                  console.error(err)
            }
        }

        const getConnectState = async () => {
            try{
                  const accounts = await web3.eth.getAccounts();
                  if(accounts.length > 0) setConnected(true)
             } catch (err){
                  console.error(err)
            }
        }

        useEffect(() => {
            getConnectState()
        },[])


      return (
            <div className="navbar_c">
                  <img src={logo} alt="" />
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <div className='fonts1 links' onClick={() => navigate('/')}> HOME</div>
                        <div className='fonts1 links' onClick={() => navigate('/gameplay')}> GAMEPLAY </div>
                        <div className='fonts1 links' onClick={() => navigate('/start')}> START A GAME </div>
                        <div className='fonts1 links' onClick={() => navigate('/play')}> BUY TICKET </div>
                        <div onClick={()=> connectMetamask()} className="metamaskButtonContainer links" >
                              <img className="metamaskImage" src={metamaskLogo} alt="" />
                              {connected? <div className="fonts3">Wallet connected</div> : <div className="fonts3" >Connect to Metamask</div>}
                        </div>
                  </div>
            </div>
      );
};

export default NavComponent;
