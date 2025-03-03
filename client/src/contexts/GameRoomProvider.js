import React, { useContext, useState } from "react";

const GameRoomContext = React.createContext();

export function useGameRoom() {
  return useContext(GameRoomContext);
}

export function GameRoomProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [gameID, setGameID] = useState();

  function addPlayer(newPlayer) {
    setPlayers((currentPlayers) => {
      return [...currentPlayers, newPlayer];
    });
  }

  return (
    <GameRoomContext.Provider value={{ players, addPlayer, gameID, setGameID }}>
      {children}
    </GameRoomContext.Provider>
  );
}
