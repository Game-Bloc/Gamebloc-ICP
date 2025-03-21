import React, { useEffect, useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import { useAppSelector } from "../../../redux/hooks"

type Prop = {
  handlePromptModal: any
  handleFiatModal: any
}

const NairaDepositModal = ({ handlePromptModal, handleFiatModal }: Prop) => {
  const [ngnAmount, setNGNAmount] = useState("")
  const balance = useAppSelector((state) => state.IcpBalance.balance)
  const ngn = useAppSelector((state) => state.IcpBalance.ngnRate)
  const _icp2Usd = useAppSelector((state) => state.IcpBalance.currentICPrice)
  const [icpValue, setIcpValue] = useState<number>(0)
  const [dollar, setDollar] = useState<string>("")

  const nairaChange = (e: any) => {
    e.preventDefault()
    const value = e.target.value
    setNGNAmount(value)
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
              <div className="relative  bg-primary-first rounded-2xl text-center overflow-hidden shadow-xl transform transition-all w-[80vw] sm:my-8 sm:max-w-lg sm:w-full">
                <div className=" bg-primary-first px-4 pt-5 shadow-md  sm:p-6 mb-4 ">
                  <RiCloseFill
                    onClick={handleFiatModal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  />
                  <div className="flex justify-center items-center flex-col mt-4">
                    <p className=" text-[1rem] text-start text-primary-second font-bold">
                      BUY ICP
                    </p>
                    {/*  */}
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
                      {/* <p className="text-[.7rem] mt-8 lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                        To
                      </p> */}
                      <div className="flex justify-between items-center  h-[2.5rem] px-3 lg:px-6 bg-[#f6b8fc7a]/20 border border-solid rounded-[8px] w-full">
                        <p className="text-[.7rem]  lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                          {icpValue.toFixed(4)} ICP
                        </p>
                        <p className="text-[.7rem]  lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                          ${parseFloat(dollar).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button className="bg-primary-second mt-8 text-black text-[.8rem] py-2 lg:py-4 px-6 w-full lg:w-[80%] h-8 lg:h-[3rem] rounded-md ">
                      Confirm amoumt
                    </button>
                    <p className="mt-6 mb-2 text-white/80 text-center text-[.65rem]">
                      Note that the price of ICP is not stable and by the time
                      of crediting your wallet the amount might slightly vary
                      both in ICP and USD.
                    </p>
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
