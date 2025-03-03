import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { useGameRoom } from "../contexts/GameRoomProvider";
import Player from "./Player";

export default function PlayerList() {
  const { players, addPlayer } = useGameRoom();

  function handleClick() {
    const newPlayerID = Math.floor(Math.random() * 100000);
    const newPlayer = new Player({
      id: newPlayerID,
      name: "Thorsten",
      isCreator: false,
    });

    addPlayer(newPlayer);
  }

  return (
    <ListGroup>
      {players.map((player) => {
        return (
          <ListGroup.Item key={player.id}>
            {player.name}
            {player.isCreator ? (
              <Badge bg="primary" pill>
                Ersteller
              </Badge>
            ) : (
              <></>
            )}
          </ListGroup.Item>
        );
      })}
      <ListGroup.Item action onClick={handleClick}>
        Neuer Player
      </ListGroup.Item>
    </ListGroup>
  );
}
