import React from "react"
import { useCountdown } from "./CountDown"
import ShowCounter from "./ShowCounter"

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  )
}
