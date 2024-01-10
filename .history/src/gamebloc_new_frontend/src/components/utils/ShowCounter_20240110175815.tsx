import React from "react"
import DateTimeDisplay from "./DisplayTimeDisplay"

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex ">
      <DateTimeDisplay value={days} type={"Days"} />
      <p className="">:</p>
      <DateTimeDisplay value={hours} type={"Hours"} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={"Mins"} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={"Seconds"} />
    </div>
  )
}

export default ShowCounter
