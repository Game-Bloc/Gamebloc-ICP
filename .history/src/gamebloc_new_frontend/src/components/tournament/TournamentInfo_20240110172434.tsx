import React from "react"

const TournamentInfo = () => {
  return (
    <div className="mt-8 w-full p-4 ">
      <div className="flex flex-col">
        <div className="flex gap-4 xl:gap-8">
          <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
            <div className="flex flex-col w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
              <p className="text-[.8rem]  text-white">Entry Fee</p>
              <h1 className=" text-[2rem] sm:text-[3rem] font-valorant bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                $10
              </h1>
            </div>
          </div>
          <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
            <div className="flex flex-col w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
              <p className="text-[.8rem]  text-white">Prize Pool</p>
              <h1 className="text-[2rem] sm:text-[3rem] font-valorant bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                $400
              </h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8 mt-4">
          <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
            <div className="flex flex-col justify-center items-center w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
              <p className="text-[.8rem]  text-white">1st</p>
              <img src={`price1.svg`} className="mt-4" alt="" />
              <h1 className="text-[1.5rem] font-valorant mt-4 bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                $200
              </h1>
            </div>
          </div>
          <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
            <div className="flex flex-col justify-center items-center w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
              <p className="text-[.8rem]  text-white">2nd</p>
              <img src={`price1.svg`} className="mt-4" alt="" />
              <h1 className="text-[1.5rem] font-valorant mt-4 bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                $100
              </h1>
            </div>
          </div>
          <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
            <div className="flex flex-col justify-center items-center w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
              <p className="text-[.8rem]  text-white">3rd</p>
              <img src={`price1.svg`} className="mt-4" alt="" />
              <h1 className="text-[1.5rem] font-valorant mt-4 bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                $50
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-[1.5rem] mb-[1.5rem] border border-solid border-[#2E3438] w-full" />

        <div className="flex flex-col">
          <div className="flex items-center">
            <img src={`calender2.png`} className="m-0" alt="" />
            <h2 className="text-[0.8rem] ml-3 font-semibold sm:text-base  text-white">
              Timeline [GMT+1]
            </h2>
          </div>
          <div className="mt-8 w-full flex flex-col">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <img src={`check.svg`} className="m-0" alt="" />
                <p className="text-[.85rem] ml-3 text-primary-second ">
                  Registration opens
                </p>
              </div>
              <p className="text-[.85rem] text-primary-second ">Ongoing</p>
            </div>
            <div className="flex justify-between mt-4 items-center w-full">
              <div className="flex items-center">
                <img src={`check.svg`} className="m-0 text-[#2E3438]" alt="" />
                <p className="text-[.85rem] ml-3 text-[#2E3438] ">
                  Registration closes
                </p>
              </div>
              <p className="text-[.85rem] text-[#2E3438] ">Jan 25 @ 12:00 AM</p>
            </div>
            <div className="flex justify-between mt-4 items-center w-full">
              <div className="flex items-center">
                <img src={`check.svg`} className="m-0" alt="" />
                <p className="text-[.85rem] ml-3 text-[#2E3438] ">
                  Tournament begins
                </p>
              </div>
              <p className="text-[.85rem] text-[#2E3438] ">Jan 26 @ 12:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentInfo
