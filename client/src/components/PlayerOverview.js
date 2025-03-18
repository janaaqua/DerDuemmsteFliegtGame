import React, {useEffect} from 'react'
import { Image } from "react-bootstrap"
import avatars from './AvatarMap';

// TODO: Avatar Image
export default function PlayerOverview({ players, currentPlayer }) {

  return (
    <div className="position-absolute bottom-0 start-50 translate-middle-x fs-5 text-light mb-3">
        <div className="d-flex gap-5 justify-content-center align-items-center">
        {players.map(player => (
                <div key={player.id} className="text-primary text-center">
                    <Image className={player.id === currentPlayer.id ? "bordered-image mb-2" : "borderless-image mb-2"} src={player.avatar}/>
                    {/*<div className="mt-2">{player.name}</div>*/}
                    <div>
                      { Array.from({ length: player.lives }, (_, index) => (
                         <i key={index} className="bi bi-heart-fill fs-6"> </i>
                         )) }
                    </div>
                </div>
            )
        )}
        </div>
    </div>
  )
}
