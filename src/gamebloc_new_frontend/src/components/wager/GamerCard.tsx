import React from "react"
import { ConfigProvider, Progress } from "antd"
import { SiNintendogamecube } from "react-icons/si"
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6"

const GamerCard = () => {
  return (
    <div className="flex  flex-col p-4 border  border-solid border-[#9F9FA8] rounded-xl ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <div className="flex justify-center items-center p-2 bg-white/10 rounded-[12px]  w-fit">
              <SiNintendogamecube className=" text-[#9F9FA8] w-6 h-6" />
            </div>
            <p className=" ml-4 text-[.7rem] text-[#9F9FA8] font-bold">
              Deonorla
            </p>
          </div>
          <div className="flex flex-col ml-12 items-center ">
            <ConfigProvider
              theme={{
                token: {
                  colorText: "#9F9FA8",
                  fontSize: 5,
                },
              }}
            >
              <Progress
                type="circle"
                percent={32}
                steps={8}
                size={"small"}
                trailColor="rgba(159, 159, 168, 1)"
                strokeColor="rgba(61, 181, 105, 1)"
              />
            </ConfigProvider>
            <p className="text-[.7rem] my-3 text-[#9F9FA8]">Win Rate</p>
          </div>
        </div>
        {/* STATS */}
        <div className="flex mt-8 flex-col w-[60%] lg:-[50%]">
          <div className="bg-[#111E18] flex justify-between items-center mb-2 p-2 w-full rounded-lg">
            <div className="flex items-center">
              <FaArrowTrendUp className=" text-[#3DB569] w-6 h-6" />
              <p className="text-[.7rem] ml-2 text-[#3DB569] font-bold">Wins</p>
            </div>
            <p className="text-[.7rem] ml-2 text-[#3DB569] font-bold">5</p>
          </div>
          <div className="bg-[#211416] flex justify-between items-center mb-2 p-2 w-full rounded-lg">
            <div className="flex items-center">
              <FaArrowTrendDown className=" text-[#EA4343] w-6 h-6" />
              <p className="text-[.7rem] ml-2 text-[#EA4343] font-bold">
                losses
              </p>
            </div>
            <p className="text-[.7rem] ml-2 text-[#EA4343] font-bold">5</p>
          </div>
        </div>
      </div>
      <button className="py-2 px-8 mt-3 bg-[#211422] text-primary-second w-full  text-xs sm:text-sm rounded-full ">
        Place Bet
      </button>
    </div>
  )
}

export default GamerCard
