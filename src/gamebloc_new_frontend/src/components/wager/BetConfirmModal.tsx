import { Avatar } from "antd"
import React, { useEffect, useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import { useAppSelector } from "../../redux/hooks"
import hooks from "../../Functions/hooks"
import ClipLoader from "react-spinners/ClipLoader"
import { errorPopUp } from "../utils/ErrorModal"

type Prop = {
  modal: any
  id: any
  name: any
  data: any
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const BetConfirmModal = ({ modal, id, name, data }: Prop) => {
  const { bet, isLoading } = hooks()
  const [color, setColor] = useState("#ffffff")
  const _icp2Usd = useAppSelector((state) => state.IcpBalance.currentICPrice)
  const username = useAppSelector((state) => state.userProfile.username)
  const principal_id = useAppSelector((state) => state.userProfile.principal_id)
  const account_id = useAppSelector((state) => state.userProfile.account_id)
  const initials = username!.substring(0, 2).toUpperCase()
  const balance = useAppSelector((state) => state.IcpBalance.balance)
  const [dollar, setDollar] = useState<string>("")
  const [icpValue, setIcpValue] = useState<number>(0)

  const dollarChange = (e: any) => {
    e.preventDefault()
    const value = e.target.value
    setDollar(value)
  }

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

  const confirmBet = () => {
    if (balance > icpValue) {
      bet(
        data.id_hash,
        BigInt(+dollar),
        principal_id,
        account_id,
        id,
        "",
        "Bet placed",
        "Error, something went wrong",
      )
    } else {
      errorPopUp("Your ICP balance is low, pls fund your account.")
    }
  }

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
              <div className="relative  bg-primary-first rounded-2xl text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className=" bg-primary-first px-4 pt-5 shadow-md  sm:p-6 mb-4 ">
                  <RiCloseFill
                    onClick={modal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  />
                  <div className="flex justify-center items-center flex-col mt-4">
                    <p className=" text-[1rem] text-start text-[#9F9FA8] font-bold">
                      Bet on {name}
                    </p>
                    <div className="flex w-full items-center">
                      <div className="mr-4 ">
                        <Avatar
                          style={{
                            backgroundColor: "#f6b8fc",
                            color: "#01070E",
                            fontSize:
                              window.innerWidth >= 1200 ? "1.2rem" : ".8rem",
                          }}
                          size={window.innerWidth >= 1200 ? 80 : 50}
                        >
                          {initials}
                        </Avatar>
                      </div>
                      <div className="flex flex-col">
                        <p className=" text-[1rem] text-start text-[#9F9FA8] font-bold">
                          {username}
                        </p>
                        <div className="flex flex-row">
                          <p className="text-bold text-[1rem] mr-1  sm:text-[1rem]  text-[#ffffff]">
                            {balance}
                          </p>
                          <img src={`Icp.svg`} className="w-6 h-6 m-0" alt="" />
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div className="bg-[#1E1E21] flex justify-between items-center mt-4 px-4 py-2 w-[80vw] sm:w-[60vw] lg:max-w-80 rounded-full">
                      <p className=" text-[.85rem] text-[#A1A1AA] font-bold">
                        Available
                      </p>
                      <p className=" text-[.85rem] text-[#A1A1AA] font-bold">
                        ${(balance * _icp2Usd).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col bg-[#1E1E21] items-center justify-center rounded-xl mt-4 p-4 w-[80vw] sm:w-[60vw] lg:max-w-80">
                      <p className="text-[.7rem] text-[#9F9FA8]">
                        Enter the value of your bet
                      </p>
                      <div className=" my-4 items-center pl-2 h-[2rem] border-[#595959] hover:border-primary-second w-[5rem]  bg-[#141414] border-solid border rounded-[6px] flex">
                        <input
                          className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                          placeholder="$"
                          type="text"
                          onChange={dollarChange}
                          value={dollar}
                        />
                      </div>
                      <div className="flex flex-row items-center">
                        <p className="text-[.7rem] mr-1 text-[#9F9FA8]">
                          Total: {icpValue.toFixed(8)}
                        </p>
                        <img src={`Icp.svg`} className="w-3 h-3 m-0" alt="" />
                      </div>
                    </div>
                    <button
                      onClick={() => confirmBet()}
                      className="py-2 px-8 mt-3 bg-[#211422] text-primary-second w-full  lg:max-w-80  text-xs sm:text-sm rounded-full "
                    >
                      <div className="flex justify-center items-center text-[0.65rem] text-primary-second font-bold sm:text-[.85rem]">
                        {isLoading ? (
                          <div className="flex items-center justify-center ">
                            <p className="text-[0.65rem] mr-2 text-primary-second font-bold sm:text-[.85rem]">
                              Wait
                            </p>
                            <ClipLoader
                              color={color}
                              loading={isLoading}
                              cssOverride={override}
                              size={10}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          </div>
                        ) : (
                          "Confirm bet"
                        )}
                      </div>
                    </button>
                    <p className="mt-2 text-white/80 text-center text-[.7rem]">
                      By clicking on confirm an amount of {icpValue.toFixed(8)}{" "}
                      ICP will be deducted for this bet!
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

export default BetConfirmModal
