import React from "react"
import DateTimeDisplay from "./DisplayTimeDisplay"

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex justify-between items-center ">
      <DateTimeDisplay value={days} type={"Days"} />
      <p className="text-[2rem] mt-[-1rem] sm:text-[3rem] font-bold bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
        :
      </p>
      <DateTimeDisplay value={hours} type={"Hours"} />
      <p className="text-[2rem] mt-[-1rem] sm:text-[3rem] font-bold bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
        :
      </p>
      <DateTimeDisplay value={minutes} type={"Mins"} />
      <p className="text-[2rem] mt-[-1rem] sm:text-[3rem] font-bold bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
        :
      </p>
      <DateTimeDisplay value={seconds} type={"Seconds"} />
    </div>
  )
}

export default ShowCounter
