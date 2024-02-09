import React from "react"
import { RiCloseFill } from "react-icons/ri"
import { FaUserFriends } from "react-icons/fa"
import { PiPowerBold } from "react-icons/pi"
import { GiMoneyStack } from "react-icons/gi"

type model = {
  modal: () => void
  name: any
  gameName: any
  startDate: any
  entryPrize: any
  gameType: any
  playersCount: any
}

const NewModal = ({
  modal,
  name,
  gameName,
  startDate,
  entryPrize,
  gameType,
  playersCount,
}: model) => {
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-[#fff]/20  bg-opacity-75 transition-opacity">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full ">
              <div className="relative bg-white w-[55%] rounded-[25px] overflow-hidden">
                <div className="bg-[#0F131B] flex flex-col justify-center items-center ">
                  <RiCloseFill
                    onClick={modal}
                    className="absolute text-white right-4 text-[2rem] top-4 cursor-pointer"
                  />
                  <div className="w-full flex ">
                    <img src={`modalimg.svg`} className="m-0 w-[52%]" alt="" />
                    <div className="mt-[4rem] mr-0 mb-4  ml-4 2xl:ml-8 ">
                      <p className="text-[0.8rem] text-[#E49A83]">{name}</p>
                      <div className="flex flex-col my-4">
                        <p className="text-[1.2rem] mt-[.5rem] font-[Oswald]">
                          {gameName}
                        </p>
                        <div className="flex px-[12px] justify-center items-center bg-[#686868] w-[3rem]">
                          <p className="text-[.7rem]">mobile</p>
                        </div>
                      </div>
                      <div className="flex flex-col mt-4">
                        <p className="text-[.8rem] font-[Oswald] mt-[.5rem]">
                          Registration{" "}
                          <span style={{ color: "#549C30" }}>Ongoing</span>
                        </p>
                        <div className="flex  mt-[.5rem] mb-4 items-center">
                          <FaUserFriends className="text-primary-second text-[1.5rem]" />
                          <p className="text-primary-second ml-[.5rem]">
                            {playersCount} Participants
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium text-[1.1rem] ">{gameType}</p>
                        <div className="mt-[.8rem] flex">
                          <div className="flex flex-col">
                            <p className="text-[.8rem] font-normal">Prize</p>
                            <p className="text-[1.1rem] text-primary-second mt-[.2rem] font-normal">
                              $20000
                            </p>
                          </div>
                          <div className="flex ml-[2rem] flex-col">
                            <p className="text-[.8rem] font-normal">
                              {" "}
                              Registration
                            </p>
                            <p className="text-[1.1rem]] text-primary-second mt-[.2rem] font-normal">
                              ${entryPrize}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-4 flex-col">
                        <p className="text-[.8rem] font-normal">Start Date</p>
                        <p className="text-[1.1rem]  text-primary-second mt-[.2rem] font-normal">
                          {startDate}
                        </p>
                      </div>

                      <div className="my-4 flex justify-between  gap-4 items-center w-full">
                        <button className="bg-[#549C30] flex justify-center items-center rounded-[7px] py-[.5rem] px-[1rem] cursor-pointer">
                          <PiPowerBold className="text-white text-[1.5rem]" />
                          <p className="ml-[.4rem] text-[..8rem]"> start</p>
                        </button>
                        <button className="bg-[#BB1E10] flex justify-center items-center rounded-[7px] py-[.5rem] px-[1rem] cursor-pointer">
                          <PiPowerBold className="text-white text-[1.5rem] rotate-180" />
                          <p className="ml-[.4rem] text-[..8rem]"> End</p>
                        </button>
                        <button className="bg-[#A309B1] flex justify-center items-center rounded-[7px] py-[.5rem] px-[1rem] cursor-pointer">
                          <GiMoneyStack className="text-white text-[1.5rem]" />
                          <p className="ml-[.4rem] text-[..8rem]"> Pay</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewModal
