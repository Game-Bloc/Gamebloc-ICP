import React, { useEffect, useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import { IoSend } from "react-icons/io5"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import ClipLoader from "react-spinners/ClipLoader"
import { useAppSelector } from "../../redux/hooks"
import { generateDate } from "../utils/utills"

// export const ALPHANUM_REGEX = /^[a-zA-Z0-9]+$/
interface Props {
  modal: () => void
  _principal: any
  notification_id: number
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const TransferModal = ({ modal, _principal, notification_id }: Props) => {
  const [recipient, setRecipient] = useState<string>("")
  const [warning, setWarning] = useState<string>("")
  const [color, setColor] = useState("#ffffff")
  const [amountToSend, setAmountToSend] = useState<number>()
  const [date, setDate] = useState<number>()
  const [createdAt, setCreatedAt] = useState<string>("")
  const { isLoading, sendICP, getICPBalance } = useGameblocHooks()
  const username = useAppSelector((state) => state.userProfile.username)
  const balance = useAppSelector((state) => state.IcpBalance.balance)

  const onSendChange = (e: any) => {
    e.preventDefault()
    const input = e.target.value
    setAmountToSend(input)
  }

  const validateAccountId = (text): boolean => {
    return text.length === 64
  }
  const onRecipientChange = (e: any) => {
    e.preventDefault()
    const input = e.target.value
    setRecipient(input)
  }

  useEffect(() => {
    setCreatedAt(generateDate())
    getICPBalance()
    setDate(Date.now())
  }, [])

  const transferICP = () => {
    if (recipient == "" || !validateAccountId(recipient)) {
      console.log("result", validateAccountId(recipient))
      setWarning("Invalid wallet address")
      return
    }

    if (isNaN(amountToSend)) {
      setWarning("Invalid amount")
      return
    }

    if (balance < amountToSend) {
      setWarning("Insufficient balance")
      return
    }
    sendICP(
      recipient,
      amountToSend,
      date,
      _principal,
      createdAt,
      notification_id,
      username,
      "Transfer Successful",
      "Transfer Failed",
      "/profile",
    )
  }

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
            <div className="flex items-center justify-center min-h-full ">
              <div className="relative border-white/10 border border-solid bg-primary-first w-[90%] md:max-w-[55%]  lg:max-w-[40%] 2xl:max-w-[30%] rounded-[25px] overflow-hidden">
                <div className="bg-primary-first  p-[2rem] flex flex-col justify-center items-center">
                  <RiCloseFill
                    onClick={modal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  />
                  <div className="">
                    <img
                      src={`Icp.svg`}
                      className="mt-3rem mb-[.3rem] w-[3rem] h-[3rem]"
                      alt=""
                    />
                  </div>
                  <h1 className="font-valorant mt-4 text-primary-second text-[1.1rem] text-semibold">
                    Transfer ICP
                  </h1>

                  <div className="flex flex-col w-[100%] md:w-[80%] mt-4">
                    <p className="text-[.7rem] lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                      Amount to send
                    </p>
                    <div className="flex flex-col items-center pb-[.6rem] h-[2.5rem] border-[#F6B8FC]/30 bg-[#f6b8fc7a]/20 border border-solid rounded-[8px] w-full">
                      <input
                        className="border-none bg-[transparent] text-white/80 placeholder:text-[0.8rem] placeholder:text-white/80 focus:outline-none focus:ring-0 text-[0.8rem] appearance-none w-full"
                        type="number"
                        placeholder="0.00"
                        onChange={onSendChange}
                        value={amountToSend}
                      />
                    </div>
                    <p className="text-[.7rem] mt-8 lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                      To
                    </p>
                    <div className="flex items-center  h-[2.5rem] border-[#F6B8FC]/30 bg-[#f6b8fc7a]/20 border border-solid rounded-[8px] w-full">
                      <input
                        className="border-none bg-[transparent] text-white/80 placeholder:text-[0.8rem] placeholder:text-white/80 focus:outline-none focus:ring-0 text-[0.8rem] appearance-none w-full"
                        type="text"
                        placeholder="Wallet address"
                        value={recipient}
                        onChange={onRecipientChange}
                      />
                    </div>
                  </div>

                  <p className="text-[.7rem] text-start mt-8 lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                    Network fee
                  </p>
                  <div className="rounded-lg w-[80%] flex justify-between items-center bg-primary-second/20 py-3 px-2">
                    <p className="text-[.7rem] lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                      Instant
                    </p>
                    <div className="flex flex-col">
                      <p className=" justify-end text-[.7rem] lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                        $0.0001
                      </p>
                      <p className="justify-end text-[.7rem] lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                        0.0001 ICP
                      </p>
                    </div>
                  </div>
                  {warning != "" ? (
                    <p className="text-[.7rem] lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                      {warning}
                    </p>
                  ) : (
                    <></>
                  )}

                  <button
                    onClick={() => transferICP()}
                    className="justify-center w-[10rem] px-6 text-[.6rem] sm:text-base text-black mt-[0.8rem]  sm:mt-[1.5rem] flex bg-primary-second/70 hover:bg-primary-second rounded-[9999px] items-center cursor-pointer py-3"
                  >
                    {isLoading ? (
                      <div className="flex items-center  gap-2">
                        <p className="text-[0.65rem] mr-2  font-bold sm:text-[.85rem]">
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
                      <div className="flex  items-center gap-2">
                        <p className="text-[0.65rem] mr-2  font-bold sm:text-[.85rem]">
                          Send
                        </p>
                        <IoSend />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransferModal
