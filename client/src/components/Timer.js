import React, { useState, useEffect, useCallback, useRef } from 'react'

export default function Timer( { timerStop, setTimerStop }) {
  const MINUTES_PER_ROUND = 0;
  const SECONDS_PER_ROUND = 20;

  const [minutesLeft, setMinutesLeft] = useState(MINUTES_PER_ROUND);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_ROUND);

  const minutesLeftRef = useRef(minutesLeft);
  const secondsLeftRef = useRef(secondsLeft);

  const updateTimer = useCallback(() => {
    if (minutesLeftRef.current <= 0 && secondsLeftRef.current <= 0) {
      // Reset Timer
      setMinutesLeft(MINUTES_PER_ROUND);
      setSecondsLeft(SECONDS_PER_ROUND);
      setTimerStop(true);
    }  else {
      if (secondsLeftRef.current === 0) {
        setMinutesLeft(m => m - 1);
        setSecondsLeft(59);
      } else {
        setSecondsLeft(s => s - 1);
      }
    }
  }, []);

  // Synchronize Ref with State
  useEffect(() => {
    minutesLeftRef.current = minutesLeft;
    secondsLeftRef.current = secondsLeft;
  }, [minutesLeft, secondsLeft]);

  useEffect(() => {
    if (timerStop) return;

    const interval = setTimeout(updateTimer, 1000);
    return () => clearTimeout(interval);
  }, [minutesLeft, secondsLeft, timerStop]);
    
  return (
    <div className="position-absolute top-0 start-50 translate-middle-x mt-3 text-light fs-1">
      {minutesLeft < 10 ? "0" + minutesLeft: minutesLeft}:
      {secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}
    </div>
  )
}
