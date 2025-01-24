import React from "react"

const infoCard = () => {
  return (
    <div className="flex  flex-col justify-center items-center relative p-4  w-full lg:w-[50%]  h-fit border  border-solid border-[#9F9FA8] rounded-xl ">
      <div className="absolute top-4 left-4 flex justify-center items-center bg-[#1E1E21] w-fit p-1 rounded-md px-2">
        <p className="text-[.7rem] text-[#A1A1AA]">Blitzkrieg</p>
      </div>
      <div className="absolute top-4 right-4 flex justify-center items-center bg-[#1E1E21] w-fit p-1 rounded-md px-2">
        <p className="text-[.7rem] text-[#A1A1AA]">Single</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className=" text-[1rem] text-white font-bold">Mod War III</p>
        <p className="text-sm sm:text-[.85rem] mt-1 font-normal text-[#9F9FA8]">
          Gambloc
        </p>
      </div>
      <div className="flex flex-col justify-center items-center mt-3">
        <p className=" text-[1rem] text-white font-bold">00:00:58</p>
        <p className="text-[.7rem] text-[#9F9FA8]">
          Saturday 25th Feburary, 2025
        </p>
      </div>
    </div>
  )
}

export default infoCard
