import React from "react"

const DateTimeDisplay = ({ value, type }) => {
  return (
    <div className="">
      <p>{value}</p>
      <span>{type}</span>
    </div>
  )
}

export default DateTimeDisplay
