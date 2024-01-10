import React from "react"
import DateTimeDisplay from "./DisplayTimeDisplay"

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex ">
      <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
      <p>:</p>
      <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
    </div>
  )
}

export default ShowCounter
