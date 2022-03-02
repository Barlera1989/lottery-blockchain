import React, {useState,  useEffect } from "react";
import logo from "./logo.png";
import metamaskLogo from "./metamask.png";
import { useNavigate } from "react-router-dom";
import "../../styles/App.css"
import "../../styles/navbar.css"
import web3 from '../../web3'

const NavComponent = (props) => {
      const navigate = useNavigate();
      const [connected, setConnected] = useState(false)


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
                        <div className="metamaskButtonContainer links" >
                              <img className="metamaskImage" src={metamaskLogo} alt="" />
                              {connected? <div className="fonts4">Wallet connected</div> : <div className="fonts3" >Connect to Metamask</div>}
                        </div>
                  </div>
            </div>
      );
};

export default NavComponent;
