import React, { useState, useEffect } from 'react'
import { Button } from "react-bootstrap"
import Papa from 'papaparse'
import Data from "../assets/Questions1.csv"
import { usePlayerInfo } from '../contexts/playerInfoProvider'


// TODO: index random value < data.length, wenn Frage fertig diese als "gesehen" markieren
export default function Question({ nextPlayer, currentPlayerName }) {
const [data, setData] = useState([]);
const [questionIndex, setQuestionIndex] = useState(0);
const { isCreator } = usePlayerInfo();
const [isCorrect, setIsCorrect] = useState(null);
const [questionAnswered, setQuestionAnswered] = useState(false);

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
    setData(parsedData);
  }

  fetchData();
}, [])

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
}

function handleIsIncorrect() {
  setIsCorrect(false)
  setQuestionAnswered(true)
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
      <div className="fs-3 mb-3">{currentPlayerName},</div>
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
