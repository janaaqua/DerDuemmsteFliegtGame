import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { usePlayerInfo } from "../contexts/playerInfoProvider";
import { useGameRoom } from "../contexts/GameRoomProvider";
import { useNavigate } from "react-router-dom";
import Player from "../components/Player";

export default function CreateRoomModal({ closeModal, isCreator }) {
  const { userName, setUserName, setIsCreator } = usePlayerInfo();
  const { addPlayer, gameID, setGameID } = useGameRoom();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // set GameRoom Informations
    const newPlayerID = uuidv4();
    const newPlayer = new Player({
      id: newPlayerID,
      name: userName,
      avatar: "avatar_jana.png",
      isCreator: isCreator,
    });
    addPlayer(newPlayer);
    setIsCreator(isCreator);

    if (isCreator) {
      const newGameID = uuidv4();
      setGameID(newGameID);
      // navigate to Waiting Room
      navigate(`game/${newGameID}`);
    } else {
      // TODO: Join Room
    }

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
              {isCreator ? "Spiel erstellen" : "Spiel beitreten"}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
}
