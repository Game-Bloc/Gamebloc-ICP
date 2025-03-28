import React, { useEffect, useRef, useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import { useAppSelector } from "../../../redux/hooks"
import hooks from "../../../Functions/hooks"
import copy from "clipboard-copy"
import { errorPopUp, SuccessPopUp } from "../../../components/utils/ErrorModal"

type Prop = {
  handlePromptModal: any
  handleFiatModal: any
}

const NairaDepositModal = ({ handleFiatModal }: Prop) => {
  const [ngnAmount, setNGNAmount] = useState("")
  const textRef = useRef()
  const [dollar, setDollar] = useState<string>("")
  const [icpValue, setIcpValue] = useState<number>(0)
  const [position, setPosition] = useState<string>("first")
  const { iWantToDeposit } = hooks()
  const ngn = useAppSelector((state) => state.IcpBalance.ngnRate)
  const balance = useAppSelector((state) => state.IcpBalance.balance)
  const _icp2Usd = useAppSelector((state) => state.IcpBalance.currentICPrice)
  const accountId = "0494721886"

  const nairaChange = (e: any) => {
    e.preventDefault()
    const value = e.target.value
    setNGNAmount(value)
  }

  const handleCopyClick = async () => {
    try {
      await copy(accountId)
      SuccessPopUp("Copied to clipboard")
      console.log("Text copied to clipboard:", accountId)
    } catch (err) {
      console.error("Copy to clipboard failed:", err)
    }
  }

  const verifyAmount = () => {
    if (ngnAmount.trim() === "") {
      errorPopUp("Please enter an amount")
      return
    }
    setPosition("second")
  }

  useEffect(() => {
    const calulateIcpNGNValue = () => {
      if (_icp2Usd > 0 && +ngnAmount > 0) {
        const icpValue = +ngnAmount / ngn / _icp2Usd
        setDollar((+ngnAmount / ngn).toString())
        setIcpValue(icpValue)
      } else {
        setIcpValue(0)
        setDollar("0")
      }
    }
    calulateIcpNGNValue()
  }, [ngnAmount, _icp2Usd, ngn])

  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-[#fff]/30 bg-opacity-75 transition-opacity">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
              <div className="relative  bg-primary-first rounded-2xl text-center overflow-hidden shadow-xl transform transition-all w-[100vw] sm:my-8 sm:max-w-lg sm:w-full">
                <div className=" bg-primary-first px-4 pt-5 shadow-md  sm:p-6 mb-4 ">
                  <RiCloseFill
                    onClick={handleFiatModal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  />
                  <div className="flex justify-center items-center flex-col mt-4">
                    <p className=" text-[1rem] text-start text-primary-second font-bold">
                      BUY ICP
                    </p>
                    <div className="flex mt-4">
                      <p className="font-bold text-[.85rem] text-[#A1A1AA]">
                        Dollar - Naira rate: ₦
                        {ngn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </p>
                    </div>
                    {/*  */}
                    {position === "first" ? (
                      <div className="flex flex-col w-[100%] md:w-[80%] mt-4">
                        <div className="flex justify-between items-center">
                          <p className="text-[.7rem] lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                            Amount to buy
                          </p>
                        </div>
                        <div className="flex flex-col items-center pb-[.6rem] h-[2.5rem] border-[#F6B8FC]/30 bg-[#f6b8fc7a]/20 border border-solid rounded-[8px] w-full">
                          <input
                            className="border-none bg-[transparent] text-white/80 placeholder:text-[0.8rem] placeholder:text-white/80 focus:outline-none focus:ring-0 text-[0.8rem] appearance-none w-full"
                            type="number"
                            placeholder="₦"
                            onChange={nairaChange}
                            value={ngnAmount}
                          />
                        </div>
                        <div className="flex justify-between px-3 lg:px-6 items-center">
                          <p className="text-[.7rem] mt-8 lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                            Value in icp
                          </p>
                          <p className="text-[.7rem] mt-8 lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                            Dollar equivalent
                          </p>
                        </div>

                        <div className="flex justify-between items-center  h-[2.5rem] px-3 lg:px-6 bg-[#f6b8fc7a]/20 border border-solid rounded-[8px] w-full">
                          <p className="text-[.7rem]  lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                            {icpValue.toFixed(4)} ICP
                          </p>
                          <p className="text-[.7rem]  lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                            ${parseFloat(dollar).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            verifyAmount()
                          }}
                          className="bg-primary-second mt-8 text-black text-[.8rem] py-2 lg:py-4 px-6 w-full lg:w-[80%] h-8 lg:h-[3rem] rounded-md "
                        >
                          Confirm amoumt
                        </button>
                        <p className="mt-6 mb-2 text-white/80 text-center text-[.65rem]">
                          Note that the price of ICP is not stable and at the
                          time of crediting your wallet the amount might
                          slightly vary both in ICP and USD.
                        </p>
                      </div>
                    ) : position === "second" ? (
                      <div className="flex flex-col w-[100%] md:w-[80%] mt-4">
                        <div className=" flex flex-col justify-center items-center">
                          <p className="flex text-white text-[0.85rem] mb-3 lg:text-[1rem]">
                            Transfer{" "}
                            <span className="font-black ml-2">
                              {" "}
                              ₦
                              {ngnAmount
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                          </p>
                          <div className="flex flex-col cursor-pointer  justify-between items-center py-6 border border-solid border-primary-second bg-primary-second/10  px-4 w-full  rounded-md">
                            <div className="flex  items-center justify-between lg:justify-around w-full">
                              <div className="flex justify-center items-center">
                                <div className="flex flex-col ">
                                  <p className="text-white text-[0.65rem] lg:text-[0.8rem]">
                                    Bank name
                                  </p>
                                  <p className=" text-white font-bold mt-4 text-[0.8rem] lg:text-[0.9rem]">
                                    GUARANTY TRUST BANK
                                  </p>
                                </div>
                              </div>
                              <div className="flex  justify-center  items-center">
                                <div className="flex flex-col ">
                                  <p className="text-white text-[0.65rem] lg:text-[0.8rem]">
                                    Account name
                                  </p>
                                  <p className=" text-white font-bold mt-4 text-[0.8rem] lg:text-[0.9rem]">
                                    OLULEYE EMMANUEL{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex mt-6 items-center justify-between lg:justify-around w-full">
                              <div className="flex justify-center ml-[1.5rem] items-center">
                                <div className="flex flex-col ">
                                  <p className="text-white text-[0.65rem] lg:text-[0.8rem]">
                                    Account number
                                  </p>
                                  <div
                                    ref={textRef}
                                    onClick={() => {
                                      handleCopyClick()
                                    }}
                                    className="flex mt-4  items-center"
                                  >
                                    <p className=" mr-1 lg:mr-3 text-white font-bold text-[0.8rem] lg:text-[0.9rem]">
                                      0494721886
                                    </p>
                                    <img src={`solar_copy-bold.png`} alt="" />
                                  </div>
                                </div>
                              </div>
                              <div className="flex  mr-[2.5rem] justify-center  items-center">
                                <div className="flex flex-col ">
                                  <p className="text-white text-[0.65rem] lg:text-[0.8rem]">
                                    Amount
                                  </p>
                                  <p className=" text-white font-bold mt-4 text-[0.8rem] lg:text-[0.9rem]">
                                    ₦
                                    {ngnAmount
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="mt-2 mb-3 text-white/80 text-center text-[.65rem]">
                            Note: Kindly transfer the exact amount to the
                            account details above
                          </p>
                          <button
                            onClick={() => {
                              setPosition("third")
                            }}
                            className="bg-primary-second mt-8 text-black text-[.8rem] py-2 lg:py-4 px-6 w-full lg:w-[80%] h-8 lg:h-[3rem] rounded-md "
                          >
                            I’ve sent the money
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className=" flex flex-col justify-center items-center">
                        <p className="text-[1rem] text-white mt-4">
                          Congratulations! You’ve successfully transferred ₦
                          {ngnAmount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          to Gamebloc.
                        </p>
                        <p className="text-[.8rem] text-white/70 mt-4">
                          Great news! Your wallet will be funded with the
                          equivalent amount of ICP shortly. The process may take
                          3-10 minutes, so please be patient and refresh your
                          profile page periodically to see the update.
                        </p>
                        <button
                          onClick={handleFiatModal}
                          className="bg-primary-second mt-8 text-black text-[.8rem] py-2 lg:py-4 px-6 w-full lg:w-[80%] h-8 lg:h-[3rem] rounded-md "
                        >
                          Return to profile
                        </button>
                      </div>
                    )}
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

export default NairaDepositModal
