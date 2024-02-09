import React from "react"
import { RiCloseFill } from "react-icons/ri"
import MemberCard from "./MemberCard"

interface Props {
  modal: () => void
  data: any
}

const ViewSquadModal = ({ modal, data }: Props) => {
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-white/20 bg-opacity-75 transition-opacity">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full ">
              <div className="relative bg-[#030C15] w-[90%] md:max-w-[55%]  lg:max-w-[40%] 2xl:max-w-[30%] border border-solid border-[#595959] rounded-[25px] overflow-hidden">
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
                          {data.name}
                        </h2>
                        <p className="text-white text-[.8rem]">
                          Clan Tag -
                          <span className="text-[#E0DFBA]  text-[.8rem]">
                            {" "}
                            {data.tag}
                          </span>
                        </p>
                        <div className=" px-[2px] rounded-sm flex items-center w-fit  mt-1 bg-primary-second">
                          <img
                            src={`member.png`}
                            className="m-0 w-[.7rem] h-[.7rem]"
                            alt=""
                          />
                          <p className="text-black ml-1 text-[.7rem]">
                            {data.members.length}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-[1.5rem] mb-[1.5rem] border border-solid border-[#2E3438] w-full" />
                    <div className="flex flex-col gap-4">
                      {data.members.map((gamer: any, index: any) => (
                        <MemberCard
                          key={index}
                          gamer={gamer}
                          captain={data.captain}
                        />
                      ))}
                    </div>
                    <div className="mt-[1rem] mb-[1rem] border border-solid border-[#2E3438] w-full" />
                    {/* <div className="flex justify-end mt-3">
                      <p className="text-primary-second rounded-md pt-[.15rem] pb-[.15rem]  px-[.6rem]  sm:px-4   border border-solid sm:py-2  border-primary-second hover:text-black hover:bg-primary-second  text-[0.85rem] sm:text-sm cursor-pointer">
                        Leave
                      </p>
                    </div> */}
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
