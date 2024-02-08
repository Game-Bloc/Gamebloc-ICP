import React, { useEffect, useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import { IoSend } from "react-icons/io5"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import ClipLoader from "react-spinners/ClipLoader"

interface Props {
  modal: () => void
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const TransferModal = ({ modal }: Props) => {
  const [recipient, setRecipient] = useState<string>("")
  const [color, setColor] = useState("#ffffff")
  const [amountToSend, setAmountToSend] = useState<number>()
  const [date, setDate] = useState<number>()
  const { isLoading, sendICP } = useGameblocHooks()

  const onSendChange = (e: any) => {
    e.preventDefault()
    const input = e.target.value
    setAmountToSend(input)
  }

  const onRecipientChange = (e: any) => {
    e.preventDefault()
    const input = e.target.value
    setRecipient(input)
  }

  useEffect(() => {
    setDate(Date.now())
  }, [])

  const transferICP = () => {
    sendICP(
      recipient,
      amountToSend,
      date,
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

                  <div className="flex flex-col w-[80%] mt-4">
                    <p className="text-[.7rem] lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                      Amount to send
                    </p>
                    <div className="flex flex-col items-center pt-[.6rem] pl-[.5rem] h-[2.5rem] border-[#F6B8FC] bg-[#f6b8fc7a] border border-solid rounded-[8px] w-full">
                      <input
                        className="border-none bg-[transparent] text-white placeholder:text-[0.8rem] placeholder:text-white focus:outline-none focus:ring-0 text-[0.8rem] appearance-none w-full"
                        type="number"
                        placeholder="0.00"
                        onChange={onSendChange}
                        value={amountToSend}
                      />
                    </div>
                    <p className="text-[.7rem] mt-8 lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                      To
                    </p>
                    <div className="flex items-center  pl-[.5rem] h-[2.5rem] border-[#F6B8FC] bg-[#f6b8fc7a] border border-solid rounded-[8px] w-full">
                      <input
                        className="border-none bg-[transparent] text-white placeholder:text-[0.8rem] placeholder:text-white focus:outline-none focus:ring-0 text-[0.8rem] appearance-none w-full"
                        type="text"
                        placeholder="Recipient IC address or principal"
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
