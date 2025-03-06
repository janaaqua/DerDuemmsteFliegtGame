import React, { useState, useEffect } from 'react'
import { Button } from "react-bootstrap"
import { usePlayerInfo } from '../contexts/playerInfoProvider'


// TODO: index random value < data.length, wenn Frage fertig diese als "gesehen" markieren
export default function Question({ data, nextPlayer, currentPlayer, updateQuestionsByPlayer }) {
const [questionIndex, setQuestionIndex] = useState(0);
const { isCreator } = usePlayerInfo();
const [isCorrect, setIsCorrect] = useState(null);
const [questionAnswered, setQuestionAnswered] = useState(false);

useEffect(() => {
  if (data.length > 0) {
    randomIndex()
  }
},[data])

function randomIndex() {
  const randomIndex = Math.floor(Math.random() * data.length);
  return randomIndex
}

function handleIsCorrect() {
  setIsCorrect(true)
  setQuestionAnswered(true)
  updateQuestionsByPlayer(currentPlayer.id, data[questionIndex].Frage, true)
}

function handleIsIncorrect() {
  setIsCorrect(false)
  setQuestionAnswered(true)
  updateQuestionsByPlayer(currentPlayer.id, data[questionIndex].Frage, false)
}

function handleNextQuestion() {
  setIsCorrect(null)
  setQuestionAnswered(false)

  // next question
  setQuestionIndex(randomIndex())
  nextPlayer();
}

  return (
    <div className="d-flex flex-column align-items-center text-center" /*style={isCreator ? {top: "30%"} : { top: "35%"}}*/>
      <div className="fs-3 mb-3">{currentPlayer.name},</div>
      {data.length > 0 && questionIndex < data.length && (<div className="fs-1 mb-3">{data[questionIndex].Frage}</div>) }
      

      {isCreator && !questionAnswered && data.length > 0 &&
      <>
        <div className="fs-3 mb-4">(Antwort: {data[questionIndex].Antwort})</div>
        <div className="d-flex gap-3">
          <Button variant="success" onClick={handleIsCorrect}>Richtig</Button>
          <Button variant="danger" onClick={handleIsIncorrect}>Falsch</Button>
        </div>
      </>
      }

      {isCorrect && questionAnswered &&
        <div className="fs-3 mb-4 text-success">
          <i className="bi bi-check-circle-fill"> </i>
          {data[questionIndex].Antwort}
        </div> 
      }
      {!isCorrect && questionAnswered &&
        <div className="fs-3 mb-4 text-danger">
          <i className="bi bi-x-circle-fill"> </i>
          {data[questionIndex].Antwort}
          </div> 
      }

      {isCreator && questionAnswered && <Button onClick={handleNextQuestion}>Nächste Frage</Button>}
      </div>
  )
}
