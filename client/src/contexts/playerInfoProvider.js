import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const PlayerInfoContext = React.createContext();

export function usePlayerInfo() {
  return useContext(PlayerInfoContext);
}

export function PlayerInfoProvider({ children }) {
  const [userName, setUserName] = useLocalStorage("userName");
  const [isCreator, setIsCreator] = useState(false);

  return (
    <PlayerInfoContext.Provider value={{ userName, setUserName, isCreator, setIsCreator }}>
      {children}
    </PlayerInfoContext.Provider>
  );
}
