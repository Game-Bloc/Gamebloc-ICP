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
import SoloModal from "./payment/SoloModal"
import SquadModal from "./payment/SquadModal"
import { useNavigate } from "react-router-dom"
import { generateDate } from "../utils/utills"
import { Principal } from "@dfinity/principal"
import { RiCloseFill } from "react-icons/ri"
import ClipLoader from "react-spinners/ClipLoader"
import { errorPopUp } from "../utils/ErrorModal"

interface Props {
  owner: string
  id: string
  creator: any
  userId?: string
  squad?: any
  data?: any
  squad_id?: string
  modal: () => void
}
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const PaymentModal = ({
  modal,
  owner,
  id,
  creator,
  userId,
  squad,
  data,
  squad_id,
}: Props) => {
  const navigate = useNavigate()
  const [active, setActive] = useState<string>("first")
  const [recipient, setRecipient] = useState<string>("")
  const [warning, setWarning] = useState<string>("")
  const [color, setColor] = useState("#ffffff")
  const [amountToSend, setAmountToSend] = useState<number>()
  const [date, setDate] = useState<number>()
  const [amount, setAmount] = useState<number>(null)
  const [icp, setIcpValue] = useState<number>(null)
  const _icp2Usd = useAppSelector((state) => state.IcpBalance.currentICPrice)
  const [createdAt, setCreatedAt] = useState<string>("")
  const {
    paid,
    done,
    isLoading,
    payICPfee,
    joinTournamentSqaud,
    joinTournament,
  } = useGameblocHooks()
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const notification_id = useAppSelector((state) => state.IcpBalance.id)
  const username = useAppSelector((state) => state.userProfile.username)
  const balance = useAppSelector((state) => state.IcpBalance.balance)
  const game_type = data.game_type.toUpperCase() === "SINGLE"
  const principal = useAppSelector((state) => state.userProfile.principal_id)
  const _principal = Principal.fromText(principal)
  const tourType =
    Object.keys(data.tournament_type)[0].toUpperCase() == "PREPAID"
  const players = squad.filter((player: any) =>
    player.members.some((member: any) => member.name === username),
  )

  useEffect(() => {
    setCreatedAt(generateDate())
    setDate(Date.now())
    if (
      creator === owner ||
      Object.keys(data.tournament_type)[0].toUpperCase() === "PREPAID"
    ) {
      setActive("second")
    }
  }, [])

  useEffect(() => {
    const calculateIcpValue = () => {
      const dollarAmount = tourType ? +data.total_prize : +data.entry_prize
      if (_icp2Usd > 0 && dollarAmount > 0) {
        const icpValue = dollarAmount / _icp2Usd
        setIcpValue(icpValue)
        console.log("icp", _icp2Usd)
        console.log("icp...", icpValue)
      } else {
        setIcpValue(0)
      }
    }

    calculateIcpValue()
  }, [_icp2Usd])

  const payFee = () => {
    if (data.game_type === "Duo") {
      payICPfee(
        "87baf3adfba79b407337212611da1f52d8db5518a592412f5d7d319c12a8a59e",
        +icp?.toFixed(8) * 2,
        date,
        _principal,
        createdAt,
        notification_id,
        username,
        "Payment Approved",
        "Something went wrong",
        "",
      )
    } else if (data.game_type === "Squad") {
      payICPfee(
        "87baf3adfba79b407337212611da1f52d8db5518a592412f5d7d319c12a8a59e",
        +icp?.toFixed(8) * 4,
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
        "87baf3adfba79b407337212611da1f52d8db5518a592412f5d7d319c12a8a59e",
        +icp?.toFixed(8),
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

  const handlePaymentChange = (payment: string) => {
    setSelectedPayment(payment)
  }

  const join_tour_squad = (
    squad_id: any,
    id: any,
    playerIGNs: any,
    success: string,
    error: string,
    route: string,
  ) => {
    // console.log("squad_id", squad_id)
    // console.log("id", id)
    // console.log("playerIGNs", playerIGNs)
    joinTournamentSqaud(squad_id, id, playerIGNs, success, error, route)
  }

  const join_tour_solo = (
    owner: any,
    id: any,
    userId: any,
    playerIgn: any,
    success: string,
    error: string,
    route: string,
  ) => {
    joinTournament(owner, id, userId, playerIgn, success, error, route)
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
                        <p className="font-bold mt-3 mb-6 text-center text-primary-second text-[1.1rem] text-semibold">
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
                          owner={principal}
                        />
                        <div className="flex flex-col mt-4 p-4">
                          <div className="flex justify-between items-center w-full">
                            <p className="text-[.9rem] lg:text-[1rem]  text-white/80  ">
                              Transfer Amount
                            </p>
                            <p className=" text-[.9rem] lg:text-[1.2rem] font-bold text-white/80  ">
                              {data.game_type === "Duo"
                                ? +icp?.toFixed(8) * 2
                                : data.game_type === "Squad"
                                ? +icp?.toFixed(8) * 4
                                : icp?.toFixed(8)}{" "}
                              ICP
                            </p>
                          </div>
                        </div>
                        <button
                          disabled={selectedPayment === "ICP" ? false : true}
                          onClick={
                            players.map((squad: any) => squad.captain)[0] ===
                            username
                              ? () =>
                                  paid === true ? setActive("second") : payFee()
                              : () =>
                                  errorPopUp(
                                    "Only a squad captain can join on your behalf",
                                  )
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
                              {paid === true ? "Next" : "Approve"}
                            </p>
                          )}
                        </button>

                        <p className="mt-2 text-white/80 text-center text-[.7rem]">
                          By proceeding you approve the amount of $
                          {Object.keys(
                            data.tournament_type,
                          )[0].toUpperCase() === "PREPAID"
                            ? data.total_prize
                            : data.game_type === "squad" &&
                              Object.keys(
                                data.tournament_type,
                              )[0].toUpperCase() !== "PREPAID"
                            ? +data.entry_prize * 4
                            : data.game_type === "Duo" &&
                              Object.keys(
                                data.tournament_type,
                              )[0].toUpperCase() !== "PREPAID"
                            ? +data.entry_prize * 2
                            : data.entry_prize}{" "}
                          worth of ICP to be deducted from your wallet.
                        </p>
                      </>
                    )}
                    {active === "second" && (
                      <div>
                        {game_type ? (
                          <SoloModal
                            id={id}
                            done={done}
                            owner={owner}
                            userId={userId}
                            joinSolo={join_tour_solo}
                            isLoading={isLoading}
                            setActive={setActive}
                          />
                        ) : (
                          <SquadModal
                            done={done}
                            setActive={setActive}
                            squad={squad}
                            data={data}
                            squad_id={squad_id}
                            isLoading={isLoading}
                            id={id}
                            joinTournamentSqaud={join_tour_squad}
                          />
                        )}
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

export default PaymentModal
