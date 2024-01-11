import React from "react"

const SquadCard = () => {
  return (
    <div className="bg-[#030C15] w-full rounded-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={`frame.svg`} alt="" />
        <div className="flex flex-col ml-4">
          <h2 className="text-white font-bold text-[.9rem] sm:text-[1.2rem]">
            PeakyFblinders
          </h2>
          <p className="text-white text-[.8rem]">
            Clan Tag -
            <span className="text-[#E0DFBA]  text-[.8rem]"> pFbサ</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SquadCard
