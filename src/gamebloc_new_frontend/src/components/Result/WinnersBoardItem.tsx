import React from "react"

interface WinnersBoardItemProps {
  position: string
  user: string
  tickets: number
  prize: number
  imgSrc: string
}

const WinnersBoardItem = ({
  position,
  user,
  tickets,
  prize,
  imgSrc,
}: WinnersBoardItemProps) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-center">
      <div className="text-xl font-bold mb-2">{position}</div>
      <img
        src={imgSrc}
        alt={`${user} avatar`}
        className="w-24 h-24 mx-auto mb-2 rounded-full"
      />
      <div className="text-lg font-bold">{user}</div>
      <div className="text-sm">Tickets</div>
      <div className="text-2xl font-bold">{tickets.toLocaleString()}</div>
      <div className="text-sm">Prize</div>
      <div className="text-xl font-bold">{prize}</div>
    </div>
  )
}

export default WinnersBoardItem
