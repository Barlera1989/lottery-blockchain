import "./styles/App.css";
import NavComponent from "./components/navbar";
import InfoTable from "./components/infoTable";
import Gameplay from "./components/gameplay";
import Start from "./components/start";
import CenterContainer from "./components/MainMenu";
import Game from "./components/game";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NavComponent />
              <CenterContainer />
              <InfoTable />
            </div>
          }
        />
        <Route
          path="/gameplay"
          element={
            <div>
              <NavComponent />
              <Gameplay />
              <InfoTable />
            </div>
          }
        />
        <Route
          path="/start"
          element={
            <div>
              <NavComponent />
              <Start />
              <InfoTable />
            </div>
          }
        />
        <Route
          path="/play"
          element={
            <div>
              <NavComponent />
              <Game />
              <InfoTable />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
