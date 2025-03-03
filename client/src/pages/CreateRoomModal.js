import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { usePlayerInfo } from "../contexts/playerInfoProvider";
import { useGameRoom } from "../contexts/GameRoomProvider";
import { useNavigate } from "react-router-dom";
import Player from "../components/Player";

export default function CreateRoomModal({ closeModal }) {
  const { userName, setUserName, setIsCreator } = usePlayerInfo();
  const { addPlayer, setGameID } = useGameRoom();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // set GameRoom Informations
    const newPlayerID = uuidv4();
    const newPlayer = new Player({
      id: newPlayerID,
      name: userName,
      avatar: "avatar_jana.png",
      isCreator: true,
    });
    addPlayer(newPlayer);
    setIsCreator(true);
    const newGameID = uuidv4();
    setGameID(newGameID);

    // navigate to Waiting Room
    navigate(`game/${newGameID}`);
    closeModal();
  }

  // TODO: Form.Group mit avatar-auswahl
  return (
    <>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form className="w-100" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Dein Nutzername:</Form.Label>
            <Form.Control
              type="text"
              required
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <Button type="submit" className="mt-3">
              Spiel erstellen
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
}
