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

interface Props {
  owner: string
  icp: number
  poolPrice: string
  entryPrice: string
  tourType: any
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
  poolPrice,
  entryPrice,
  tourType,
  create_tour,
}: Props) => {
  const navigate = useNavigate()
  const [active, setActive] = useState<string>("first")
  const [recipient, setRecipient] = useState<string>("")
  const [warning, setWarning] = useState<string>("")
  const [color, setColor] = useState("#ffffff")
  const [date, setDate] = useState<number>()
  const [createdAt, setCreatedAt] = useState<string>("")
  const { paid, payICPfee } = useGameblocHooks()
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const username = useAppSelector((state) => state.userProfile.username)
  const notification_id = useAppSelector((state) => state.IcpBalance.id)
  const balance = useAppSelector((state) => state.IcpBalance.balance)
  const principal = useAppSelector((state) => state.userProfile.principal_id)
  const _principal = Principal.fromText(principal)

  useEffect(() => {
    setCreatedAt(generateDate())
    setDate(Date.now())
  }, [])

  const handlePaymentChange = (payment: string) => {
    setSelectedPayment(payment)
  }

  const payFee = () => {
    payICPfee(
      "16efdc385d2c87b7c2e4913689bd228656841e4689c65a2720e03507e2d5f5e2",
      tourType === "Prepaid" ? +poolPrice : +entryPrice,
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
                  {/* <RiCloseFill
                    onClick={modal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  /> */}
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
                            status: "finish",
                            icon: <DollarOutlined className="w-4 h-4" />,
                          },
                          {
                            title: "Join",
                            status: "process",
                            icon: <UsergroupAddOutlined className="w-4 h-4" />,
                          },
                          {
                            title: "Success",
                            status: "wait",
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
                              {icp.toFixed(8)} ICP
                            </p>
                          </div>
                        </div>

                        <button
                          disabled={selectedPayment === "ICP" ? false : true}
                          onClick={() =>
                            // paid === true ? setActive("second") : payFee()
                            create_tour()
                          }
                          className={`flex mt-8 text-black text-[.9rem] ${
                            selectedPayment === "ICP"
                              ? "bg-primary-second"
                              : "bg-primary-second/15"
                          } font-bold  justify-center items-center py-6  px-6 w-full h-[1.5rem] rounded-full `}
                        >
                          {paid === false ? "Approve" : "Next"}
                        </button>
                        <p className="mt-2 text-white/80 text-center text-[.7rem]">
                          By proceeding you approve a fee of $
                          {tourType === "Prepaid" ? poolPrice : entryPrice} to
                          be deducted from your wallet.
                        </p>
                      </>
                    )}
                    {active === "second" && (
                      <div className="mt-2">
                        <button
                          onClick={() => create_tour}
                          className="flex mt-8 text-black text-[.9rem] font-bold  justify-center items-center py-6  px-6 w-full h-[1.5rem] rounded-full bg-primary-second"
                        >
                          Create Tournament
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
                          onClick={() => navigate("/dashboard")}
                          className="flex mt-8 text-black text-[.9rem] font-bold  justify-center items-center py-6  px-6 w-full h-[1.5rem] rounded-full bg-primary-second"
                        >
                          Back to Tournament
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
