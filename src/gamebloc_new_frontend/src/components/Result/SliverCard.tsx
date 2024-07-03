import React from "react"

const SliverCard = () => {
  return (
    <div className=" w-full h-[fit] rounded-md bg-gradient-to-r from-[transparent]   to-[#606363] p-[.04rem]">
      <div className="relative flex flex-col h-full justify-center items-center w-full rounded-md  from-[#1B1517]   to-[#292825]   bg-gradient-to-r  py-[.5rem] ">
        <div className="absolute text-[.8rem] text-[#E0DDD1] -left-[2rem] flex justify-center items-center -rotate-90 rounded-br-[12px] rounded-bl-[12px] rounded h-[1.8rem] w-[6rem] bg-[#211E1E]">
          2ND PLACE
        </div>
        <div className="rounded-md h-[fit] w-[10rem]">
          <img src={`codm2.png`} alt="" className="rounded-md" />
        </div>
        <p className="font-black text-[1rem] text-white mt-3">Harmish</p>
        <div className="mt-6 flex ">
          <div className="flex flex-col">
            <p className="text-white/60 text-[.8rem]">Total Point</p>
            <p className="text-[#eda323] text-[1rem]">180</p>
          </div>
          <div className="border border-white/10 border-l h-8 mx-[4rem]" />
          <div className="flex flex-col">
            <p className="text-white/60 text-[.8rem]">Prize</p>
            <p className="text-[#eda323] text-[1rem]">$350</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SliverCard
