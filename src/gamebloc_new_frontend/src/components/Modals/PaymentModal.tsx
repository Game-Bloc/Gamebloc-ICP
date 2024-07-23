import React, { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import {
  CheckCircleOutlined,
  DollarOutlined,
  LoadingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons"
import { Checkbox, CheckboxProps, ConfigProvider, Steps } from "antd"
import PaymentCard from "./payment/PaymentCard"
import SoloModal from "./payment/SoloModal"
import SquadModal from "./payment/SquadModal"

interface Props {
  owner: string
  id: string
  userId: string
  squad: any
  data: any
  squad_id: string
}
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const PaymentModal = ({ owner, id, userId, squad, data, squad_id }: Props) => {
  const animationContainer = useRef(null)
  const [active, setActive] = useState<string>("third")
  const [recipient, setRecipient] = useState<string>("")
  const [warning, setWarning] = useState<string>("")
  const [color, setColor] = useState("#ffffff")
  const [amountToSend, setAmountToSend] = useState<number>()
  const [date, setDate] = useState<number>()
  const [createdAt, setCreatedAt] = useState<string>("")
  const { isLoading, sendICP, getICPBalance } = useGameblocHooks()
  const username = useAppSelector((state) => state.userProfile.username)
  const balance = useAppSelector((state) => state.IcpBalance.balance)
  const game_type = data.game_type.toUpperCase() === "SINGLE"
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`)
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
                        <p className="font-bold mt-3 mb-6 text-center text-primary-second text-[1.1rem] text-semibold">
                          Select payment option
                        </p>
                        <PaymentCard
                          onChange={onChange}
                          paymentTitle="CkUsdc"
                          img="ckusdc.svg"
                        />
                        <PaymentCard
                          onChange={onChange}
                          paymentTitle="ICP"
                          img="Icp.svg"
                        />
                        <div className="flex flex-col mt-4 p-4">
                          <div className="flex justify-between items-center w-full">
                            <p className="text-[.9rem] lg:text-[1rem]  text-white/80  ">
                              Transfer Amount
                            </p>
                            <p className=" text-[.9rem] lg:text-[1.2rem] font-bold text-white/80  ">
                              $5.00
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setActive("second")}
                          className="flex mt-8 text-black text-[.9rem] font-bold  justify-center items-center py-6  px-6 w-full h-[1.5rem] rounded-full bg-primary-second"
                        >
                          Approve
                        </button>
                      </>
                    )}
                    {active === "second" && (
                      <div>
                        {game_type ? (
                          <SoloModal owner={owner} id={id} userId={userId} />
                        ) : (
                          <SquadModal
                            squad={squad}
                            data={data}
                            squad_id={squad_id}
                            id={id}
                          />
                        )}
                      </div>
                    )}
                    {active === "third" && (
                      <div className="mt-2">
                        <p className="font-bold mt-3 mb-6 text-center text-primary-second text-[1.1rem] text-semibold">
                          Confirmation
                        </p>
                        <div className="mt-8">
                          {/* <div ref={animationContainer}></div> */}
                        </div>
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

export default PaymentModal
