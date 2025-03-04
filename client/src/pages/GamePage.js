import React, { useEffect, useState } from "react";
import Question from "../components/Question";
import { Button } from "react-bootstrap";
import { useGameRoom } from "../contexts/GameRoomProvider";
import PlayerOverview from "../components/PlayerOverview"
import Timer from "../components/Timer";
import { usePlayerInfo } from "../contexts/playerInfoProvider"

// TODO: REMOVE GAME CREATOR FROM PLAYER LIST!
// TODO: PlayerOverview
// TODP: Rundenanzeige und -funktionalität
// TODO: Runden-Timer (irgendwann im Waiting Room einstellbar)
// TODO: Am Anfang Timer (5 Sekunden), wo Frage hidden ist
export default function GamePage({ setGameReady }) {
  const MAX_ROUNDS = 3;

  const { players } = useGameRoom();
  const { isCreator } = usePlayerInfo();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [roundStarted, setRoundStarted] = useState(false);


  const nextPlayer = () => {
    if (currentPlayerIndex + 1 < players.length) {
      setCurrentPlayerIndex(currentPlayerIndex + 1)
    } else {
      setCurrentPlayerIndex(0)
    }
  };

  useEffect(() => {
    if(round >= MAX_ROUNDS) {
      // show result
    }
  }, [round])

  return (
    <div id="main-container">
      <div id="spaceship-container"></div>

      <div className="position-absolute top-0 start-0 m-3 text-light">Runde {round} / {MAX_ROUNDS}</div>
      <Button onClick={() => {setGameReady(false)}} className="position-absolute top-0 end-0 m-3"><i className="bi bi-box-arrow-left"></i></Button>

      <div className="windowContent text-light">
      { roundStarted ? 
        <>
          <Question nextPlayer={nextPlayer} currentPlayerName={players[currentPlayerIndex].name}/>
        </>
      :
        <>
        {isCreator ? 
          <Button onClick={() => {setRoundStarted(true)}}>Runde starten</Button>
        :
          <p className="fs-3">Runde startet gleich...</p>
        }
        </>
      }
      </div>
      
      {players && <PlayerOverview players={players} currentPlayer={players[currentPlayerIndex]}/>}
      <Timer />
    </div>
  );
}
