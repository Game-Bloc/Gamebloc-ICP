import React from "react"
import { RiCloseFill } from "react-icons/ri"
import { useAppSelector } from "../../../redux/hooks"
import Copy from "../../../components/utils/Copy"

type prop = {
  handleQRModal: any
}
const QrModal = ({ handleQRModal }: prop) => {
  const accountId = useAppSelector((state) => state.userProfile.account_id)

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
                <div className=" bg-primary-first px-4 pt-5 shadow-md pb-6 sm:p-6 ">
                  <RiCloseFill
                    onClick={handleQRModal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  />
                  <div className="flex flex-col justify-center items-center ">
                    <p className=" text-[1rem] mt-3 text-center text-primary-second font-bold">
                      Deposit ICP
                    </p>
                    {/*  */}
                    <img src={`qr.png`} className=" mt-8 w-20 h-20" alt="" />
                    <div className="w-full mt-4 flex flex-col justify-center items-center">
                      <p className="text-bold text-[.7rem] p-[.65rem]  sm:text-[.8rem] sm:p-[.8rem] text-[#9B9B9B]">
                        Your icp wallet address
                      </p>
                      <div className="flex items-center">
                        <h2 className=" text-white p-[.5rem] text-bold text-[.85rem] sm:text-[1rem] ">
                          {accountId
                            ? accountId.substring(0, 7) +
                              "......" +
                              accountId.substring(56, 64)
                            : null}
                        </h2>
                        <Copy textToCopy={accountId} />
                      </div>
                      <button className="bg-primary-second text-black text-[.8rem] py-4 px-6 w-full lg:w-[80%] h-[3rem] rounded-md mt-4">
                        Copy address
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

export default QrModal
