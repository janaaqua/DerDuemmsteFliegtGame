import React from 'react'
import { Table, Button } from "react-bootstrap"

export default function Voting( { isCreator, questionsByPlayer, players }) {

  const handleVote = (playerID) => {

  }

  return (
    <>
    <div className="fs-2 mb-3">Wer hatte die dümmste Antwort?</div>
    <Table className="votingTable" style={{ width: "100%"}}>
      <thead>
        <tr>
          {Array.from(questionsByPlayer.keys()).map((playerID) => (
              <th key={playerID} className="fs-3" style={{ border: "none" }}>{players.find((player) => player.id === playerID).name}{ isCreator && <Button className="ms-3" onClick={handleVote(playerID)}>Vote</Button>}</th>          
          ))}
        </tr>
      </thead>
      <tbody className="text-light">
      {Array.from({ length: Math.max(...Array.from(questionsByPlayer.values()).map(arr => arr.length), 0) }).map((_, rowIndex) => (
      <tr key={rowIndex}>
        {Array.from(questionsByPlayer.keys()).map((playerID) => {
          const playerQuestions = questionsByPlayer.get(playerID) || [];
          return (
            <td key={`${playerID}-${rowIndex}`} className={playerQuestions[rowIndex].wasCorrect ? "text-success" : "text-danger"} style={{ border: "none" }}>
              {playerQuestions[rowIndex] ? playerQuestions[rowIndex].question : ""}
            </td>
          );
        })}
      </tr>
    ))}
      </tbody>
    </Table>
    </>
  )
}
