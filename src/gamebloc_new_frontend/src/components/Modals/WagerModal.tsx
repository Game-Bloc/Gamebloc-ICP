import React from "react"
import { RiCloseFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

type Prop = {
  modal: any
  data: any
  option: boolean
  handleModal: any
}

const WagerModal = ({ modal, data, handleModal, option }: Prop) => {
  const navigate = useNavigate()

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
            <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
              <div className="relative  bg-primary-first rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className=" bg-primary-first px-4 pt-5 shadow-md  sm:p-6 ">
                  <RiCloseFill
                    onClick={handleModal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  />
                  <div
                    className={` flex  flex-col w-full  sm:w-[28rem] p-4 ${
                      option ? "h-[9rem]" : "h-[11rem]"
                    }   `}
                  >
                    <h4 className="font-medium text-[#08172E] text-white/90 text-base ">
                      {" "}
                      Bet on your favourite Player
                      {option ? "" : "or Participate in this tournament"}
                    </h4>
                    <p className=" text-white/90 text-sm my-2"></p>
                    <div className=" flex mt-6 flex-row  ">
                      <button
                        onClick={() =>
                          navigate(
                            `/active-tournament/${data.id_hash}/Wager_account`,
                          )
                        }
                        className="py-2 px-8 bg-primary-second text-[#000] w-full  text-xs sm:text-sm "
                      >
                        Wager
                      </button>
                      {option ? (
                        <></>
                      ) : (
                        <button
                          className="py-2 px-8 ml-4 bg-primary-second text-[#000] w-full  text-xs sm:text-sm "
                          onClick={() => {
                            modal()
                          }}
                        >
                          Join Tournament
                        </button>
                      )}
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

export default WagerModal
