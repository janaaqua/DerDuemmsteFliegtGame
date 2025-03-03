import React, { useEffect, useState } from "react";
import Question from "../components/Question";
import { Button } from "react-bootstrap";
import { useGameRoom } from "../contexts/GameRoomProvider";
import PlayerOverview from "../components/PlayerOverview"
import Timer from "../components/Timer";

// TODO: PlayerOverview
// TODP: Rundenanzeige und -funktionalität
// TODO: Runden-Timer (irgendwann im Waiting Room einstellbar)
// TODO: Am Anfang Timer (5 Sekunden), wo Frage hidden ist
export default function GamePage({ setGameReady }) {
  const MAX_ROUNDS = 3;

  const { players } = useGameRoom();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [round, setRound] = useState(1);


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
      <p className="position-absolute top-0 start-50 translate-middle-x mt-3 text-light fs-1">{players[currentPlayerIndex].name},</p>
      <Question nextPlayer={nextPlayer}/>
      {players && <PlayerOverview players={players} currentPlayer={players[currentPlayerIndex]}/>}
      <Timer />
    </div>
  );
}
