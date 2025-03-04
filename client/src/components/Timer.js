import React, { useState } from 'react'

export default function Timer() {
    const [timeLeft, setTimeLeft] = useState();
    
  return (
    <div className="position-absolute top-0 start-50 translate-middle-x mt-3 text-light fs-1">02:13</div>
  )
}
