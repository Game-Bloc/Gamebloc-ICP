import React from "react"
import { RiCloseFill } from "react-icons/ri"

type Prop = {
  modal: any
}

const AssignPointsModal = ({ modal }: Prop) => {
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-[#fff]/20 bg-opacity-75 transition-opacity">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full">
              <div className="relative  bg-primary-first border border-solid border-[#5041BC] rounded-lg  overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className=" bg-primary-first pt-5 shadow-md pb-4 ">
                  <div className="flex flex-col">
                    <RiCloseFill
                      onClick={() => modal()}
                      className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                    />
                    <div className="px-8 ">
                      <p className="text-white text-base my-3">Player IGN</p>
                      <p className="text-[#999999] text-[.8rem]">
                        The real-username
                      </p>
                    </div>
                    <div className="my-3 border border-solid border-[#2E3438] w-full" />
                    <div className="px-8  flex flex-col gap-8">
                      <div className="flex justify-between items-center">
                        <p className="text-white text-base my-3">Kills</p>
                        <div className="flex ml-[5rem] items-center gap-2">
                          <img
                            src={`minus.png`}
                            className="m-0 cursor-pointer w-[1rem] h-[1rem]"
                            alt=""
                          />
                          <p className=" text-[.85rem] text-white border-primary-second border border-solid rounded-[3px] h-[2.3rem] w-[2.5rem] p-2 flex justify-center items-center cursor-pointer">
                            {" "}
                            300
                          </p>
                          <img
                            src={`plus.png`}
                            className="m-0 cursor-pointer w-[1rem] h-[1rem]"
                            alt=""
                          />
                        </div>
                        <p className=" text-[.85rem] text-white border-primary-second border border-solid rounded-[3px] h-[2.3rem] w-[2.5rem] p-2 flex justify-center items-center cursor-pointer">
                          {" "}
                          300
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-white text-base my-3">
                          Position points
                        </p>
                        <div className="flex items-center gap-2">
                          <img
                            src={`minus.png`}
                            className="m-0 cursor-pointer w-[1rem] h-[1rem]"
                            alt=""
                          />
                          <p className=" text-[.85rem] text-white border-primary-second border border-solid rounded-[3px] h-[2.3rem] w-[2.5rem] p-2 flex justify-center items-center cursor-pointer">
                            {" "}
                            300
                          </p>
                          <img
                            src={`plus.png`}
                            className="m-0 cursor-pointer w-[1rem] h-[1rem]"
                            alt=""
                          />
                        </div>
                        <p className=" text-[.85rem] text-white border-primary-second border border-solid rounded-[3px] h-[2.3rem] w-[2.5rem] p-2 flex justify-center items-center cursor-pointer">
                          {" "}
                          300
                        </p>
                      </div>
                      <div className="flex gap-4 items-center">
                        <p className="text-white text-base my-3">
                          Points deduction
                        </p>

                        <div className="  items-center pl-2 h-[2rem] border-primary-second hover:border-primary-second  bg-[#141414] border-solid border rounded-[3px] flex">
                          <input
                            className="border-none w-[3rem] text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                            placeholder=""
                            type="number"
                            // onChange={onUserChange}
                            // value={noOfUsers}
                          />
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <p className="text-white text-base my-3">
                          Total points
                        </p>

                        <div className="  ml-[2.3rem] items-center pl-2 h-[2rem] border-primary-second hover:border-primary-second  bg-[#141414] border-solid border rounded-[3px] flex">
                          <input
                            className="border-none w-[3rem] text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                            placeholder=""
                            type="number"
                            // onChange={onUserChange}
                            // value={noOfUsers}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full px-8 mt-4 justify-end">
                      <button className="bg-[#303B9C] py-2 px-4 flex justify-around items-center  ">
                        <p className="text-[.85rem] text-white">Done</p>
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
  )
}

export default AssignPointsModal
