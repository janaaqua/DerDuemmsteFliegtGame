import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useGameRoom } from "../contexts/GameRoomProvider";
import { usePlayerInfo } from "../contexts/playerInfoProvider"
import PlayerOverview from "../components/PlayerOverview"
import Question from "../components/Question";
import Timer from "../components/Timer";
import Voting from "../components/Voting"
import Papa from 'papaparse'
import Data from "../assets/Questions1.csv"

// TODO: Voting
// TODP: Rundenanzeige und -funktionalität
export default function GamePage({ setGameReady }) {
  const MAX_ROUNDS = 3;

  // questions
  const [questionData, setQuestionData] = useState([]);
  const [questionsByPlayer, setQuestionsByPlayer] = useState(new Map());

  // player informations
  const players = useGameRoom().players?.filter(player => !player.isCreator) || [];
  const { isCreator } = usePlayerInfo();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // round informations
  const [round, setRound] = useState(1);
  const [preRound, setPreRound] = useState(true);
  const [votingPhaseStarted, setVotingPhaseStarted] = useState(false);
  const [timerStop, setTimerStop] = useState(true);

  const updateQuestionsByPlayer = (playerID, question, wasCorrect) => {
    const newMap = new Map(questionsByPlayer);
    const existingEntries = newMap.get(playerID) || [];
    newMap.set(playerID, [...existingEntries, {question, wasCorrect}]);
    setQuestionsByPlayer(newMap);

    console.log(newMap)
  }

  const nextPlayer = () => {
    if (currentPlayerIndex + 1 < players.length) {
      setCurrentPlayerIndex(currentPlayerIndex + 1)
    } else {
      setCurrentPlayerIndex(0)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      // create readable stream from the fetched responses body
      const reader = response.body.getReader();
      // read a chunk of data
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      // convert binary data into string
      const csvData = decoder.decode(result.value)
      const parsedData = Papa.parse(csvData, {header: true, skipEmptyLines: true}).data;
      setQuestionData(parsedData);
    }
  
    fetchData();
  }, [])

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
  }, [timerStop, preRound])

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

        { votingPhaseStarted && <Voting isCreator={isCreator} questionsByPlayer={questionsByPlayer} players={players}/>}

        { !preRound && !votingPhaseStarted && <Question data={questionData} nextPlayer={nextPlayer} currentPlayer={players[currentPlayerIndex]} updateQuestionsByPlayer={updateQuestionsByPlayer}/> }  
      </div>
      
      {players && <PlayerOverview players={players} currentPlayer={players[currentPlayerIndex]}/>}
      <Timer timerStop={timerStop} setTimerStop={setTimerStop}/>
    </div>
  );
}
