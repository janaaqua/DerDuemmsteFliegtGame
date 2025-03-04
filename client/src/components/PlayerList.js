import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { useGameRoom } from "../contexts/GameRoomProvider";
import Player from "./Player";
import avatars from "./AvatarMap";

export default function PlayerList() {
  const { players, addPlayer } = useGameRoom();

  function handleClick() {
    const newPlayerID = Math.floor(Math.random() * 100000);
    const newPlayer = new Player({
      id: newPlayerID,
      name: "Fridolin",
      avatar: avatars[1],
      isCreator: false,
    });

    addPlayer(newPlayer);
  }

  return (
    <ListGroup className="w-100">
      {players.map((player) => {
        return (
          <ListGroup.Item key={player.id}>
            {player.name}
            {player.isCreator ? (
              <Badge className="ms-2" bg="primary">
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
