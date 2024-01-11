import React from "react"
import { RiCloseFill } from "react-icons/ri"

interface Props {
  modal: () => void
}

const ViewSquadModal = ({ modal }: Props) => {
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full ">
              <div className="relative bg-[#030C15] w-[90%] md:max-w-[55%]  lg:max-w-[40%] 2xl:max-w-[30%] rounded-[25px] overflow-hidden">
                <div className="bg-[#030C15] p-[2rem] flex flex-col  ">
                  <RiCloseFill
                    onClick={modal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  />
                  <div className="mt-4 flex  flex-col">
                    <div className="flex items-center">
                      <img src={`frame.svg`} className="m-0" alt="" />
                      <div className="flex flex-col ml-4">
                        <h2 className="text-white font-bold text-[.9rem] sm:text-[1.2rem]">
                          PeakyFblinders
                        </h2>
                        <p className="text-white text-[.8rem]">
                          Clan Tag -
                          <span className="text-[#E0DFBA]  text-[.8rem]">
                            {" "}
                            pFbサ
                          </span>
                        </p>
                        <div className="p-[.2rem] rounded-md flex items-center w-fit  mt-2 bg-primary-second">
                          <img src={`member.png`} className="m-0" alt="" />
                          <p className="text-black ml-1 text-base">8</p>
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
    </div>
  )
}

export default ViewSquadModal
