import React, { useEffect, useState } from "react"
import CountDownTimer from "../utils/CountDownTimer"
import { convertToMilliseconds, formatDate } from "../utils/utills"

interface Prop {
  data: any
}
const infoCard = ({ data }: Prop) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const inputDateString = data.starting_date
    const result = convertToMilliseconds(inputDateString)
    setCount(result)
  }, [])

  return (
    <div className="flex  flex-col justify-center items-center relative p-4  w-full lg:w-[50%]  h-fit border  border-solid border-[#9F9FA8] rounded-xl ">
      <div className="absolute top-4 left-4 flex justify-center items-center bg-[#1E1E21] w-fit p-1 rounded-md px-2">
        <p className="text-[.7rem] text-[#A1A1AA]">
          {Object.keys(data.tournament_type)[0].toUpperCase()}
        </p>
      </div>
      <div className="absolute top-4 right-4 flex justify-center items-center bg-[#1E1E21] w-fit p-1 rounded-md px-2">
        <p className="text-[.7rem] text-[#A1A1AA]">{data.game_type}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className=" text-[1rem] text-white font-bold">{data.title}</p>
        <p className="text-sm sm:text-[.85rem] mt-1 font-normal text-[#9F9FA8]">
          {data.creator}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center mt-3">
        {/* <p className=" text-[1rem] text-white font-bold">00:00:58</p> */}
        <CountDownTimer targetDate={count} />
        <p className="text-[.7rem] mt-2 text-[#9F9FA8]">
          {formatDate(data.starting_date)}
        </p>
      </div>
    </div>
  )
}

export default infoCard
