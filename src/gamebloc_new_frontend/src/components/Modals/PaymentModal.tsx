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
import { hooks } from "../../Functions/hooks"
import { FaEthereum } from "react-icons/fa6"
import { useAuth } from "../../Auth/use-auth-client"

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
  const { ethAddress } = useAuth()
  const [active, setActive] = useState<string>("first")
  const [color, setColor] = useState("#ffffff")
  const [date, setDate] = useState<number>()
  const [icp, setIcpValue] = useState<number>(null)
  const _icp2Usd = useAppSelector((state) => state.IcpBalance.currentICPrice)
  const [createdAt, setCreatedAt] = useState<string>("")
  const {
    paid,
    done,
    isLoading,
    payICPfee,
    approveFee,
    joinTournamentSqaud,
    joinTournament,
  } = useGameblocHooks()
  const [showJuna, setShowJuna] = useState(true)
  const [junaValue, setJunaValue] = useState<number>(null)
  const { junaTxnHash, junaFeePaid, approveJuna } = hooks()
  const junaBalance = useAppSelector((state) => state.juna.junaBalance)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const notification_id = useAppSelector((state) => state.IcpBalance.id)
  const username = useAppSelector((state) => state.userProfile.username)
  const game_type =
    data.game_type.toUpperCase() === "SINGLE" ||
    data.game_type.toUpperCase() == "TEAMVTEAM"
  const principal = useAppSelector((state) => state.userProfile.principal_id)
  const tourType =
    Object.keys(data.tournament_type)[0].toUpperCase() === "PREPAID"
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
      } else {
        setIcpValue(0)
      }
    }
    const calculateJunaValue = () => {
      const dollarAmount = tourType ? +data.total_prize : +data.entry_prize
      if (junaBalance > 0 && dollarAmount > 0) {
        const junaValue = dollarAmount
        console.log("junaValue", junaValue)
        setJunaValue(junaValue)
      } else {
        setJunaValue(0)
      }
    }
    calculateJunaValue()
    calculateIcpValue()
  }, [data.poolPrize, data.entryPrice, _icp2Usd, tourType])

  const payFee = () => {
    if (data.game_type === "Duo") {
      {
        !showJuna
          ? approveFee(
              +icp.toFixed(8) * 2,
              "Payment Approved",
              "Something went wrong",
              "",
            )
          : approveJuna(
              +junaValue.toFixed(8) * 2,
              "Payment Successful",
              "Something went wrong",
              "",
            )
      }
    } else if (data.game_type === "Squad") {
      {
        !showJuna
          ? approveFee(
              +icp.toFixed(8) * 4,
              "Payment Approved",
              "Something went wrong",
              "",
            )
          : approveJuna(
              +junaValue.toFixed(8) * 4,
              "Payment Successful",
              "Something went wrong",
              "",
            )
      }
    } else {
      {
        !showJuna
          ? approveFee(
              +icp.toFixed(8),
              "Payment Approved",
              "Something went wrong",
              "",
            )
          : approveJuna(
              +junaValue.toFixed(8),
              "Payment Successful",
              "Something went wrong",
              "",
            )
      }
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
                    {showJuna ? (
                      <FaEthereum className="text-[#f6b8fc]" size={18} />
                    ) : (
                      <img
                        src={`Icp.svg`}
                        className="mt-3rem mb-[.3rem] w-[3rem] h-[3rem]"
                        alt=""
                      />
                    )}
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
                            title: (
                              <p className="text-[0.6rem] sm:text-[0.75rem]">
                                Pay
                              </p>
                            ),
                            status: paid === true ? "finish" : "process",
                            icon:
                              paid === true ? (
                                <DollarOutlined className="w-2 h-2 sm:w-4 sm:h-4 " />
                              ) : (
                                <LoadingOutlined className="w-2 h-2 sm:w-4 sm:h-4 " />
                              ),
                          },
                          {
                            title: (
                              <p className="text-[0.6rem] sm:text-[0.75rem]">
                                Join
                              </p>
                            ),
                            status: done === true ? "finish" : "process",
                            icon:
                              done === true ? (
                                <UsergroupAddOutlined className="w-2 h-2 sm:w-4 sm:h-4 " />
                              ) : (
                                <LoadingOutlined className="w-2 h-2 sm:w-4 sm:h-4 " />
                              ),
                          },
                          {
                            title: (
                              <p className="text-[0.6rem] sm:text-[0.75rem]">
                                Success
                              </p>
                            ),
                            status: done && paid === true ? "finish" : "wait",
                            icon: (
                              <CheckCircleOutlined className="w-2 h-2 sm:w-4 sm:h-4 " />
                            ),
                          },
                        ]}
                      />
                    </ConfigProvider>
                    {active === "first" && (
                      <>
                        <p className="font-bold mt-3 mb-6 text-center text-primary-second text-[1.1rem] text-semibold">
                          Select payment option
                        </p>
                        {/* Toggle for ICP/Juna */}
                        <div className="flex items-center justify-center gap-2 mt-2 mb-2">
                          <span
                            className={`text-xs font-semibold ${
                              !showJuna
                                ? "text-primary-second"
                                : "text-white/60"
                            }`}
                          >
                            ICP
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={showJuna}
                              onChange={() => setShowJuna((v) => !v)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 border border-primary-second  peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-second rounded-full peer peer-checked:bg-primary-second transition-all"></div>
                            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
                          </label>
                          <span
                            className={`text-xs font-semibold ${
                              showJuna ? "text-primary-second" : "text-white/60"
                            }`}
                          >
                            JUNA
                          </span>
                        </div>
                        {/* <PaymentCard
                          onChange={() => handlePaymentChange("CkUsdc")}
                          paymentTitle="CkUsdc"
                          img="ckusdc.svg"
                          selectedPayment={selectedPayment}
                          handlePaymentChange={handlePaymentChange}
                        /> */}
                        <PaymentCard
                          onChange={() =>
                            handlePaymentChange(!showJuna ? "ICP" : "JUNA")
                          }
                          paymentTitle={!showJuna ? "ICP" : "JUNA"}
                          img="Icp.svg"
                          selectedPayment={selectedPayment}
                          handlePaymentChange={handlePaymentChange}
                          owner={principal}
                          showJuna={showJuna}
                          ethAddress={ethAddress}
                        />
                        <div className="flex flex-col mt-4 p-4">
                          <div className="flex justify-between items-center w-full">
                            <p className="text-[.9rem] lg:text-[1rem]  text-white/80  ">
                              Transfer Amount
                            </p>
                            <p className=" text-[.9rem] lg:text-[1.2rem] font-bold text-white/80  ">
                              {!showJuna
                                ? data.game_type === "Duo"
                                  ? +icp?.toFixed(8) * 2
                                  : data.game_type === "Squad"
                                  ? +icp?.toFixed(8) * 4
                                  : icp?.toFixed(8)
                                : data.game_type === "Duo"
                                ? +junaValue?.toFixed(8) * 2
                                : data.game_type === "Squad"
                                ? +junaValue?.toFixed(8) * 4
                                : junaValue?.toFixed(8)}
                              {!showJuna ? " ICP" : " JUNA"}
                            </p>
                          </div>
                        </div>
                        {_icp2Usd === 0 ? (
                          <p></p>
                        ) : (
                          <button
                            disabled={
                              selectedPayment === "ICP" ||
                              selectedPayment === "JUNA"
                                ? false
                                : true
                            }
                            onClick={
                              data.game_type === "Single" ||
                              data.game_type === "TeamvTeam"
                                ? () =>
                                    paid === true || junaFeePaid === true
                                      ? setActive("second")
                                      : payFee()
                                : players.map(
                                    (squad: any) => squad.captain,
                                  )[0] === username
                                ? () =>
                                    paid === true
                                      ? setActive("second")
                                      : payFee()
                                : () =>
                                    errorPopUp(
                                      "Only a squad captain can join on your behalf",
                                    )
                            }
                            className={`flex mt-8 text-black text-[.9rem] ${
                              selectedPayment === "ICP" ||
                              selectedPayment === "JUNA"
                                ? "bg-primary-second"
                                : "bg-primary-second/15"
                            } font-bold  justify-center items-center py-6  px-6 w-full h-[1.5rem] rounded-full `}
                          >
                            {isLoading || junaTxnHash ? (
                              <ClipLoader
                                color={color}
                                loading={isLoading || junaTxnHash}
                                cssOverride={override}
                                size={20}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                              />
                            ) : (
                              <p className="font-semibold">
                                {paid === true || junaFeePaid === true
                                  ? "Next"
                                  : "Approve"}
                              </p>
                            )}
                          </button>
                        )}
                        {!showJuna ? (
                          _icp2Usd === 0 ? (
                            <p className="mt-2 text-white/80 text-center text-[.7rem]">
                              Pls check back some other time, ICP price is
                              currently unavailable
                            </p>
                          ) : (
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
                          )
                        ) : (
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
                            worth of JUNA to be deducted from your wallet.
                          </p>
                        )}
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
