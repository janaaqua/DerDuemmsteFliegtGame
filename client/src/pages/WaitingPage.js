import React, { useRef } from "react";
import { Form, InputGroup, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import PlayerList from "../components/PlayerList";
import { useGameRoom } from "../contexts/GameRoomProvider";

export default function WaitingPage({ setGameReady }) {
  const inputElement = useRef();
  const gameID = useParams().gameID;
  const { players } = useGameRoom();
  const gameDomain = "https://localhost:3000/" + gameID;
  const navigate = useNavigate();

  const selectCopiedField = () => {
    inputElement.current.select();
  };

  function handleGameStart() {
    if (players.length >= 1) {
      setGameReady(true);
    } else {
      // Hinweis
      console.log("Not enough players");
    }
  }

  function handleLeaveRoom() {

    navigate("/")
  }

  // TODO: Show that successfully copied gameDomain
  return (
    <div id="main-container">
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh", width: "50vw" }}>
        <Form className="w-100">
          <Form.Group>
            <Form.Label>Link zum Beitreten:</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                readOnly
                type="text"
                ref={inputElement}
                onFocus={(event) => {}}
                value={gameDomain}
              />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(gameDomain);
                  selectCopiedField();
                }}
              >
                Kopieren
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
        <PlayerList />
        <Button onClick={handleGameStart} className="mt-3">
          Spiel starten
        </Button>
      </Container>
      <Button onClick={handleLeaveRoom} className="position-absolute top-0 end-0 m-3"><i className="bi bi-box-arrow-left"></i></Button>
    </div>
  )
}
