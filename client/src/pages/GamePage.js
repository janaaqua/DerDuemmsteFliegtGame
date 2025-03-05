import React, { useEffect, useState } from "react";
import Question from "../components/Question";
import { Button } from "react-bootstrap";
import { useGameRoom } from "../contexts/GameRoomProvider";
import PlayerOverview from "../components/PlayerOverview"
import Timer from "../components/Timer";
import { usePlayerInfo } from "../contexts/playerInfoProvider"
import Voting from "../components/Voting"

// TODO: Voting
// TODP: Rundenanzeige und -funktionalität
export default function GamePage({ setGameReady }) {
  const MAX_ROUNDS = 3;

  // player informations
  const players = useGameRoom().players?.filter(player => !player.isCreator) || [];
  const { isCreator } = usePlayerInfo();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // round informations
  const [round, setRound] = useState(1);
  const [preRound, setPreRound] = useState(true);
  const [votingPhaseStarted, setVotingPhaseStarted] = useState(false);
  const [timerStop, setTimerStop] = useState(true);


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

  useEffect(() => {
    // round ended
    if(timerStop && !preRound) {
      setVotingPhaseStarted(true);
    }
  }, [timerStop])

  return (
    <div id="main-container">
      <div id="spaceship-container"></div>

      <div className="position-absolute top-0 start-0 m-3 text-light">Runde {round} / {MAX_ROUNDS}</div>
      <Button onClick={() => {setGameReady(false)}} className="position-absolute top-0 end-0 m-3"><i className="bi bi-box-arrow-left"></i></Button>

      <div className="windowContent text-light">
        { preRound && ( isCreator ? (
            <Button onClick={() => {setPreRound(false); setTimerStop(false)}}>
              Runde starten
              </Button>
              ) : (
              <p className="fs-3">Runde startet gleich...</p>
            )
        )}

        { votingPhaseStarted && <Voting />}

        { !preRound && !votingPhaseStarted && <Question nextPlayer={nextPlayer} currentPlayerName={players[currentPlayerIndex].name}/> }  
      </div>
      
      {players && <PlayerOverview players={players} currentPlayer={players[currentPlayerIndex]}/>}
      <Timer timerStop={timerStop} setTimerStop={setTimerStop}/>
    </div>
  );
}
