import React from "react"
import { SiNintendogamecube } from "react-icons/si"
import { FaArrowTrendUp } from "react-icons/fa6"

const GamerCard = () => {
  return (
    <div className="flex  flex-col p-4 border  border-solid border-[#9F9FA8] rounded-xl ">
      <div className="flex gap-3">
        <div className="flex items-center">
          <div className="flex justify-center items-center p-2 bg-white/10 rounded-[12px]  w-fit">
            <SiNintendogamecube className=" text-[#9F9FA8] w-6 h-6" />
          </div>
          <p className=" ml-4 text-[.7rem] text-white font-bold">Deonorla</p>
        </div>
        {/* STATS */}
        <div className="flex flex-col">
          <div className="bg-[#111E18] flex justify-between items-center mb-2 p-2">
            <div className="flex">
              <FaArrowTrendUp className=" text-[#9F9FA8] w-6 h-6" />
              <p className="text-[.7rem] ml-2 text-[#3DB569]">Wins</p>
            </div>
            <p className="text-[.7rem] ml-2 text-[#3DB569]">5</p>
          </div>
          <div className="bg-[#211416] flex justify-between items-center mb-2 p-2">
            <div className="flex">
              <FaArrowTrendUp className=" text-[#9F9FA8] w-6 h-6" />
              <p className="text-[.7rem] ml-2 text-[#EA4343]">losses</p>
            </div>
            <p className="text-[.7rem] ml-2 text-[#EA4343]">5</p>
          </div>
        </div>
      </div>
      <button className="py-2 px-8 ml-4 bg-primary-second text-[#000] w-full  text-xs sm:text-sm rounded-full ">
        Place Bet
      </button>
    </div>
  )
}

export default GamerCard
