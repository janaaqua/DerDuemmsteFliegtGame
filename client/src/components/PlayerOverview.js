import React, {useEffect} from 'react'
import { Image } from "react-bootstrap"
import Avatar1 from "../assets/images/avatar_jana.png"

// TODO: Avatar Image
// TODO: how to center flex elements
// TODO: Hearts Icons
export default function PlayerOverview({ players, currentPlayer }) {

  return (
    <div className="position-absolute bottom-0 start-50 translate-middle-x fs-5 text-light mb-3">
        <div className="d-flex gap-5 justify-content-center align-items-center">
        {players.map(player => {
            return (
                <div key={player.id} className={player.id === currentPlayer.id ? "text-primary text-center" : "text-center"}>
                    <div >{player.name}</div>
                    <div>{"♥ ".repeat(player.lives)}</div>
                    <Image className={player.id === currentPlayer.id ? "border rounded-circle border-primary border-3" : ""} style={{width: "90px"}} src={Avatar1}/>
                </div>
            )
        })}
        </div>
    </div>
  )
}
