import React, { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import {
  CheckCircleOutlined,
  CheckOutlined,
  DollarOutlined,
  LoadingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons"
import { Checkbox, CheckboxProps, ConfigProvider, Steps } from "antd"
import PaymentCard from "./payment/PaymentCard"
import { useNavigate } from "react-router-dom"
import { generateDate } from "../utils/utills"
import { Principal } from "@dfinity/principal"
import ClipLoader from "react-spinners/ClipLoader"
import { RiCloseFill } from "react-icons/ri"

interface Props {
  owner: string
  icp: number
  gameType: string
  done: boolean
  updating: boolean
  poolPrice: string
  entryPrice: string
  tourType: any
  modal: () => void
  create_tour: () => void
}
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const PaymentModal2 = ({
  owner,
  icp,
  done,
  modal,
  gameType,
  updating,
  poolPrice,
  entryPrice,
  tourType,
  create_tour,
}: Props) => {
  const navigate = useNavigate()
  const [active, setActive] = useState<string>("first")
  const [color, setColor] = useState("#ffffff")
  const [date, setDate] = useState<number>()
  const [amount, setAmount] = useState<number>(null)
  const [createdAt, setCreatedAt] = useState<string>("")
  const { paid, isLoading, payICPfee } = useGameblocHooks()
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const username = useAppSelector((state) => state.userProfile.username)
  const notification_id = useAppSelector((state) => state.IcpBalance.id)
  const principal = useAppSelector((state) => state.userProfile.principal_id)
  const _principal = Principal.fromText(principal)
  const _icp2Usd = useAppSelector((state) => state.IcpBalance.currentICPrice)

  useEffect(() => {
    setCreatedAt(generateDate())
    setDate(Date.now())
    if (gameType === "Duo") {
      setAmount(+icp.toFixed(8) * 2)
    } else if (gameType === "Squad") {
      setAmount(+icp.toFixed(8) * 4)
    } else {
      setAmount(+icp.toFixed(8))
    }
  }, [])

  const handlePaymentChange = (payment: string) => {
    setSelectedPayment(payment)
  }

  console.log("icp", +icp.toFixed(8))
  const payFee = () => {
    if (tourType === "Prepaid") {
      payICPfee(
        "09ea6271433060d798e7fd7f0aa1e71c28e849e8c2ba89b638124b66824ef361",
        +icp.toFixed(8),
        date,
        _principal,
        createdAt,
        notification_id,
        username,
        "Payment Approved",
        "Something went wrong",
        "",
      )
    } else {
      payICPfee(
        "09ea6271433060d798e7fd7f0aa1e71c28e849e8c2ba89b638124b66824ef361",
        amount,
        date,
        _principal,
        createdAt,
        notification_id,
        username,
        "Payment Approved",
        "Something went wrong",
        "",
      )
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
        <div className="fixed inset-0 bg-[#fff]/20 bg-opacity-75 transition-opacity">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full ">
              <div className="relative border-white/10 border border-solid bg-primary-first w-[90%] md:max-w-[55%]  lg:max-w-[40%] 2xl:max-w-[30%] rounded-[25px] overflow-hidden">
                <div className="bg-primary-first py-4   flex flex-col justify-center items-center">
                  {active === "first" && paid === false ? (
                    <RiCloseFill
                      onClick={modal}
                      className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                    />
                  ) : (
                    <></>
                  )}
                  <div className="">
                    <img
                      src={`Icp.svg`}
                      className="mt-3rem mb-[.3rem] w-[3rem] h-[3rem]"
                      alt=""
                    />
                  </div>
                  {/* <h1 className="font-valorant mt-2 text-primary-second text-[1.1rem] text-semibold">
                    Payment
                  </h1> */}
                  <div className="w-[80%] mb-4">
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimaryActive: "#F6B8FC",
                          colorPrimary: "#F6B8FC",
                          colorPrimaryHover: "#F6B8FC",
                          colorText: "#fff",
                          colorBgContainer: "#000",
                          colorTextDisabled: "#808080",
                          colorTextDescription: "#808080",
                          colorSplit: "#808080",
                        },
                      }}
                    >
                      <Steps
                        size="small"
                        className="step mt-4 ml-4 md:ml-0"
                        items={[
                          {
                            title: "Pay",
                            status: paid === true ? "finish" : "process",
                            icon:
                              paid === true ? (
                                <DollarOutlined className="w-4 h-4" />
                              ) : (
                                <LoadingOutlined className="w-4 h-4" />
                              ),
                          },
                          {
                            title: "Join",
                            status: done === true ? "finish" : "process",
                            icon:
                              done === true ? (
                                <UsergroupAddOutlined className="w-4 h-4" />
                              ) : (
                                <LoadingOutlined className="w-4 h-4" />
                              ),
                          },
                          {
                            title: "Success",
                            status: done && paid === true ? "finish" : "wait",
                            icon: <CheckCircleOutlined className="w-4 h-4" />,
                          },
                        ]}
                      />
                    </ConfigProvider>
                    {active === "first" && (
                      <>
                        <p className="font-bold mt-3 mb-6 text-center text-primary-second text-[1rem] md:text-[1.1rem] text-semibold">
                          Select payment option
                        </p>
                        {/* <PaymentCard
                          onChange={() => handlePaymentChange("CkUsdc")}
                          paymentTitle="CkUsdc"
                          img="ckusdc.svg"
                          selectedPayment={selectedPayment}
                          handlePaymentChange={handlePaymentChange}
                        /> */}
                        <PaymentCard
                          onChange={() => handlePaymentChange("ICP")}
                          paymentTitle="ICP"
                          img="Icp.svg"
                          selectedPayment={selectedPayment}
                          handlePaymentChange={handlePaymentChange}
                          owner={owner}
                        />
                        <div className="flex flex-col mt-2 lg:mt-4 p-4">
                          <div className="flex flex-col lg:flex-row  justify-between items-center w-full">
                            <p className="text-[.8rem] lg:text-[1rem]  text-white/80  ">
                              Transfer Amount
                            </p>
                            <p className=" text-[.9rem] lg:text-[1.2rem] font-bold text-white/80  ">
                              {gameType === "Duo" && tourType === "Crowdfunded"
                                ? +icp.toFixed(8) * 2
                                : gameType === "Squad" &&
                                  tourType === "Crowdfunded"
                                ? +icp.toFixed(8) * 4
                                : icp.toFixed(8)}{" "}
                              ICP
                            </p>
                          </div>
                        </div>
                        {_icp2Usd === 0 ? (
                          <p></p>
                        ) : (
                          <button
                            disabled={selectedPayment === "ICP" ? false : true}
                            onClick={() =>
                              paid === true ? setActive("second") : payFee()
                            }
                            className={`flex mt-8 text-black text-[.9rem] ${
                              selectedPayment === "ICP"
                                ? "bg-primary-second"
                                : "bg-primary-second/15"
                            } font-bold  justify-center items-center py-6  px-6 w-full h-[1.5rem] rounded-full `}
                          >
                            {isLoading ? (
                              <ClipLoader
                                color={color}
                                loading={isLoading}
                                cssOverride={override}
                                size={20}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                              />
                            ) : (
                              <p className="font-semibold">
                                {paid === false ? "Approve" : "Next"}
                              </p>
                            )}
                          </button>
                        )}
                        {_icp2Usd === 0 ? (
                          <p className="mt-2 text-white/80 text-center text-[.7rem]">
                            Pls check back some other time, ICP price is
                            currently unavailable
                          </p>
                        ) : (
                          <p className="mt-2 text-white/80 text-center text-[.7rem]">
                            By proceeding you approve the amount of $
                            {tourType === "Prepaid"
                              ? poolPrice
                              : gameType === "squad" && tourType !== "Prepaid"
                              ? +entryPrice * 4
                              : gameType === "Duo" && tourType !== "Prepaid"
                              ? +entryPrice * 2
                              : entryPrice}{" "}
                            worth of ICP to be deducted from your wallet.
                          </p>
                        )}
                      </>
                    )}
                    {active === "second" && (
                      <div className="mt-2">
                        <button
                          onClick={() =>
                            done === true ? setActive("third") : create_tour()
                          }
                          className="flex mt-8 text-black text-[.9rem] font-bold  justify-center items-center py-6  px-6 w-full h-[1.5rem] rounded-full bg-primary-second"
                        >
                          {updating ? (
                            <ClipLoader
                              color={color}
                              loading={updating}
                              cssOverride={override}
                              size={20}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            <p className="font-semibold">
                              {" "}
                              {done === true ? "Next" : "Create Tournament"}
                            </p>
                          )}
                        </button>
                      </div>
                    )}
                    {active === "third" && (
                      <div className="mt-2">
                        <div className="mt-8 mb-4 flex w-full justify-center">
                          <img src={`check2.png`} alt="" />
                        </div>
                        <p className="font-bold mt-3 mb-6 text-center text-primary-second text-[1.1rem] text-semibold">
                          successful
                        </p>
                        <button
                          onClick={() => navigate("/profile")}
                          className="flex mt-8 text-black text-[.9rem] font-bold  justify-center items-center py-6  px-6 w-full h-[1.5rem] rounded-full bg-primary-second"
                        >
                          Profile
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

export default PaymentModal2
