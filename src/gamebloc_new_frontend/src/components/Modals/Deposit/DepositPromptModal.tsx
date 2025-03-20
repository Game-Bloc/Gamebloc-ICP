import React, { useEffect, useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import { useAppSelector } from "../../../redux/hooks"

type Prop = {
  handlePromptModal: any
  handleQRModal: any
  handleFiatModal: any
}

const DepositPromptModal = ({
  handlePromptModal,
  handleFiatModal,
  handleQRModal,
}: Prop) => {
  const _icp2Usd = useAppSelector((state) => state.IcpBalance.currentICPrice)
  const balance = useAppSelector((state) => state.IcpBalance.balance)
  const [dollar, setDollar] = useState<string>("")
  const [icpValue, setIcpValue] = useState<number>(0)

  useEffect(() => {
    const calculateIcpValue = () => {
      if (_icp2Usd > 0 && +dollar > 0) {
        const icpValue = +dollar / _icp2Usd
        setIcpValue(icpValue)
      } else {
        setIcpValue(0)
      }
    }
    calculateIcpValue()
  }, [dollar, _icp2Usd])

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
                    onClick={handlePromptModal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  />
                  <div className="flex flex-col ">
                    <p className=" text-[1rem] mt-3 text-center text-primary-second font-bold">
                      Deposit ICP
                    </p>
                    {/*  */}
                    <div className="bg-[#1E1E21] flex justify-between items-center mt-4 px-4 py-2 w-[80vw] sm:w-[80vw] lg:max-w-[29rem] rounded-full">
                      <p className=" text-[.85rem] text-[#A1A1AA] font-bold">
                        Available
                      </p>
                      <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center ">
                          <p className="text-bold text-[1rem] mr-1  sm:text-[1rem]  text-[#A1A1AA]">
                            {balance}
                          </p>
                          <img
                            src={`Icp.svg`}
                            className="w-4 h-4 mr-3"
                            alt=""
                          />
                        </div>
                        <p className="text-[1rem] text-[#A1A1AA] mr-4">≈</p>
                        <p className="text-[.85rem] text-[#A1A1AA] font-bold">
                          ${(balance * _icp2Usd).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    {/*  */}
                    <div className="flex flex-col lg:flex-row mt-8 gap-8">
                      <button className="flex cursor-pointer  justify-between items-center py-6 border border-solid border-primary-second hover:bg-primary-second/20  px-4 w-full h-[2.4rem] rounded-md">
                        <div className="flex items-center w-full">
                          <img
                            src={`gamelogo.png`}
                            alt=""
                            className="w-4 h-4 m-0"
                          />
                          <div className="flex ml-3 flex-col ">
                            <p className="text-primary-second font-bold text-[.8rem]">
                              Fiat (Naira only)
                            </p>
                          </div>
                        </div>
                        <img
                          src={`verified.png`}
                          className="w-4 h-4 m-0"
                          alt=""
                        />
                      </button>
                      <button
                        onClick={() => (handlePromptModal(), handleQRModal())}
                        className="flex cursor-pointer  justify-between items-center py-6 border border-solid border-primary-second hover:bg-primary-second/20  px-4 w-full h-[2.4rem] rounded-md"
                      >
                        <div className="flex items-center w-full">
                          <img
                            src={`user.png`}
                            alt=""
                            className="w-4 h-4 m-0"
                          />
                          <div className="flex ml-3 flex-col ">
                            <p className="text-primary-second font-bold text-[.8rem]">
                              Crypto address
                            </p>
                          </div>
                        </div>
                        <img
                          src={`wallet.png`}
                          className="w-4 h-4 m-0"
                          alt=""
                        />
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

export default DepositPromptModal
