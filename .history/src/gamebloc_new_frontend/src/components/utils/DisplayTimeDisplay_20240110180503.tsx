import React from "react"

const DateTimeDisplay = ({ value, type }) => {
  return (
    <div className="flex flex-col">
      <p className="text-[2rem] sm:text-[3rem] font-bold bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
        {value}
      </p>
      <span className="text-[.8rem] sm:text-[1rem] font-bold bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
        {type}
      </span>
    </div>
  )
}

export default DateTimeDisplay
