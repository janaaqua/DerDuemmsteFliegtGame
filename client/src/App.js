import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";

//pages & contexts
import HomePage from "./pages/HomePage";
import WaitingPage from "./pages/WaitingPage";
import GamePage from "./pages/GamePage";
import { PlayerInfoProvider } from "./contexts/playerInfoProvider";
import { SocketProvider } from "./contexts/SocketProvider";
import { GameRoomProvider } from "./contexts/GameRoomProvider";

//TODO: WaitingRoom Teilnehmer Liste, Socket Logik
function App() {
  const [gameReady, setGameReady] = useState(false);

  return (
    <SocketProvider>
      <PlayerInfoProvider>
        <GameRoomProvider>
          <Router>
            <Routes>
              <Route path="/" exact element={<HomePage />}></Route>
              <Route
                path="/game/:gameID"
                element={
                  gameReady ? (
                    <GamePage setGameReady={setGameReady} />
                  ) : (
                    <WaitingPage setGameReady={setGameReady} />
                  )
                }
              ></Route>
            </Routes>
          </Router>
        </GameRoomProvider>
      </PlayerInfoProvider>
    </SocketProvider>
  )
}

export default App;
