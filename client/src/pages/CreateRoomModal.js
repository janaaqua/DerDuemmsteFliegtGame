import React, { useState } from "react";
import { Modal, Form, Button, Carousel, Image } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { usePlayerInfo } from "../contexts/playerInfoProvider";
import { useGameRoom } from "../contexts/GameRoomProvider";
import { useNavigate } from "react-router-dom";
import Player from "../components/Player";
import avatars from "../components/AvatarMap";

export default function CreateRoomModal({ closeModal, isCreator }) {
  const { userName, setUserName, setIsCreator } = usePlayerInfo();
  const { setPlayers, addPlayer, gameID, setGameID } = useGameRoom();
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setCarouselIndex(selectedIndex);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setPlayers([]);

    // set GameRoom Informations
    const newPlayerID = uuidv4();
    const newPlayer = new Player({
      id: newPlayerID,
      name: userName,
      avatar: avatars[carouselIndex],
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
            <Form.Label className="mt-3">Dein Avatar:</Form.Label>
            <Carousel interval={null} indicators={false} onSelect={handleSelect}>
              {avatars.map((avatar) => {
                return (
                  <Carousel.Item key={avatar}>
                    <Image style={{ height: "300px" }} src={avatar}/>
                  </Carousel.Item>
                )
              })}
                
             
            </Carousel>
            <Button type="submit" className="mt-3">
              {isCreator ? "Spiel erstellen" : "Spiel beitreten"}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
}
