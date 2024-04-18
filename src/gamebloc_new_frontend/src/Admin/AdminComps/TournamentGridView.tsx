import React from "react"

const TournamentGridView = () => {
  return (
    <div className="grid grid-cols-3 gap-8 mt-4 ">
      <div className="flex justify-between items-center px-3 border py-4 border-[#5041BC] group cursor-pointer">
        <p className="text-white text-[.85rem] ">Player IGN</p>
        <div className="hidden gap-4 group-hover:flex">
          <img src={`view.png`} alt="" />
          <img src={`delete-red.png`} className="ml-3 cursor-pointer" alt="" />
        </div>
      </div>
      <div className="flex justify-between items-center px-3 border py-4 border-[#5041BC] group cursor-pointer">
        <p className="text-white text-[.85rem] ">Player IGN</p>
        <div className="hidden gap-4 group-hover:flex">
          <img src={`view.png`} alt="" />
          <img src={`delete-red.png`} className="ml-3 cursor-pointer" alt="" />
        </div>
      </div>
      <div className="flex justify-between items-center px-3 border py-4 border-[#5041BC] group cursor-pointer">
        <p className="text-white text-[.85rem] ">Player IGN</p>
        <div className="hidden gap-4 group-hover:flex">
          <img src={`view.png`} alt="" />
          <img src={`delete-red.png`} className="ml-3 cursor-pointer" alt="" />
        </div>
      </div>
      <div className="flex justify-between items-center px-3 border py-4 border-[#5041BC] group cursor-pointer">
        <p className="text-white text-[.85rem] ">Player IGN</p>
        <div className="hidden gap-4 group-hover:flex">
          <img src={`view.png`} alt="" />
          <img src={`delete-red.png`} className="ml-3 cursor-pointer" alt="" />
        </div>
      </div>
      <div className="flex justify-between items-center px-3 border py-4 border-[#5041BC] group cursor-pointer">
        <p className="text-white text-[.85rem] ">Player IGN</p>
        <div className="hidden gap-4 group-hover:flex">
          <img src={`view.png`} alt="" />
          <img src={`delete-red.png`} className="ml-3 cursor-pointer" alt="" />
        </div>
      </div>
    </div>
  )
}

export default TournamentGridView
