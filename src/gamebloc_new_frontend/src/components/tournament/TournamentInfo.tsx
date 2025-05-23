import React, { useEffect, useState } from "react"
import CountDownTimer from "../utils/CountDownTimer"
import { useCountdown } from "../utils/CountDown"
import { useAppSelector } from "../../redux/hooks"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import ClipLoader from "react-spinners/ClipLoader"
import { useParams } from "react-router-dom"
import { useGetAllSquad } from "../../Functions/blochooks"
import { useUpdateAllSquad } from "../../Functions/blochooks"
import FallbackLoading from "../Modals/FallBackLoader"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { useAuth } from "../../Auth/use-auth-client"
import LoginModal2 from "../Modals/LoginModal2"
import JoinAsSolo from "../Modals/JoinAsSolo"
import JoinAsSquad from "../Modals/JoinAsSquad"
import { hasDateReached, inProgress } from "../utils/utills"
import PaymentModal from "../Modals/PaymentModal"
import WagerModal from "../Modals/WagerModal"
import hooks from "../../Functions/hooks"
import Loader from "../Modals/Loader"
interface Props {
  data: any
}

const TournamentInfo = ({ data }: Props) => {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const [count, setCount] = useState(0)
  const MySwal = withReactContent(Swal)
  const [color, setColor] = useState("#ffffff")
  const [forceClose, setForceClose] = useState(false)
  const bet = useAppSelector((state) => state.userWager)
  const [days, hours, minutes, seconds] = useCountdown(count)
  const owner = useAppSelector((state) => state.userProfile.username)
  const { noData, updating, getAllSquads } = useGetAllSquad()
  const { updateAllSquads } = useUpdateAllSquad()
  const principal = useAppSelector((state) => state.userProfile.principal_id)
  const squad_id = useAppSelector((state) => state.userProfile.squad_badge)
  const { isLoading, getProfile, start_tournament } = useGameblocHooks()
  const squad = useAppSelector((state) => state.squad)
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
  const [openSoloModal, setOpenSoloModal] = useState<boolean>(false)
  const [openSquadModal, setOpenSquadModal] = useState<boolean>(false)
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false)
  const [openWager, setOpenWager] = useState<boolean>(false)
  const { getExpectedReward, getUserBet } = hooks()
  const option =
    Object.keys(data.tournament_type)[0].toUpperCase() == "BLITZKRIEG" &&
    data.creator == owner
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  }

  const per_kill =
    Object.keys(data.tournament_variation)[0].toUpperCase() == "INFINITE" &&
    Object.keys(data.tournament_type)[0].toUpperCase() == "BLITZKRIEG"
      ? data?.users?.length
      : data?.no_of_participants

  const errorPopUp = (errorMsg: string) => {
    MySwal.fire({
      position: "center",
      icon: "error",
      text: errorMsg,
      showConfirmButton: true,
      background: "#01070E",
      color: "#fff",
    })
  }

  const handleWagerModal = () => {
    setOpenWager(false)
    setForceClose(true)
    setOpenPaymentModal(true)
  }

  const handleWagerModal2 = () => {
    setOpenWager(false)
    setForceClose(true)
  }

  const squadCount = () => {
    let totalCount = 0
    data?.squad?.forEach(
      (player: any) => (totalCount += player?.members?.length),
    )
    return totalCount
  }
  const handleLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }
  const handleSoloModal = () => {
    setOpenSoloModal(!openSoloModal)
  }

  const handleSquadModal = () => {
    setOpenSquadModal(!openSquadModal)
  }

  const convertToMilliseconds = (inputDateString: String) => {
    const dateTimeMatch = inputDateString.match(
      /(\d{1,2}:\d{2}\s*[APMapm]+)\s*(\d{4}-\d{2}-\d{2})/,
    )

    if (!dateTimeMatch) {
      console.error("Invalid date format")
      return NaN
    }

    const [, time, date] = dateTimeMatch

    // Extract hours, minutes, and AM/PM from the time part
    const [hoursStr, minutesStr] = time.split(":")
    const hours = parseInt(hoursStr, 10)
    const minutes = parseInt(minutesStr, 10)
    const isPM = /pm/i.test(time)

    // Extract year, month, and day from the date part
    const [yearStr, monthStr, dayStr] = date.split("-")
    const year = parseInt(yearStr, 10)
    const month = parseInt(monthStr, 10) - 1
    const day = parseInt(dayStr, 10)

    // Convert 12-hour format to 24-hour format
    let adjustedHours = hours
    if (isPM && hours !== 12) {
      adjustedHours += 12
    } else if (!isPM && hours === 12) {
      adjustedHours = 0
    }

    // Create a new Date object with the components
    const dateObject = new Date(year, month, day, adjustedHours, minutes)

    // Check for invalid date
    if (isNaN(dateObject.getTime())) {
      console.error("Invalid date")
      return NaN
    }

    // Get the timestamp in milliseconds
    const timestampInMilliseconds = dateObject.getTime()

    return timestampInMilliseconds
  }

  const formatDate = (inputDate) => {
    // Split the input string by space
    var parts = inputDate.split(" ")

    // Extract time
    var time = parts[0]

    // Extract am/pm
    var ampm = parts[1]

    // Extract date
    var dateParts = parts[2].split("-")
    var year = dateParts[0]
    var month = parseInt(dateParts[1])
    var day = parseInt(dateParts[2])

    // Convert month to word
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    var monthWord = months[month - 1]

    // Convert day to word
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    var dayOfWeek = new Date(year, month - 1, day).getDay()
    var dayWord = days[dayOfWeek]

    // Create the formatted string
    var formattedDate =
      time +
      " " +
      ampm +
      ", " +
      dayWord +
      " " +
      monthWord +
      " " +
      day +
      ", " +
      year

    return formattedDate
  }

  useEffect(() => {
    getExpectedReward(id, principal)
    getUserBet(id, principal)
    if (squad?.length > 0) {
      updateAllSquads()
    } else {
      getAllSquads()
    }
    const inputDateString = data.starting_date
    const result = convertToMilliseconds(inputDateString)
    setCount(result)
  }, [])

  const timer = setTimeout(() => {
    if (
      days == 0 &&
      hours == 0 &&
      minutes == 0 &&
      seconds == 0 &&
      Object.keys(data.status)[0].toUpperCase() !== "GAMECOMPLETED"
    ) {
      start_tournament(id)
      console.log("Match in progress")
    }
  }, 5000)

  useEffect(() => {
    timer
  }, [timer])

  const handleModal = () => {
    setOpenPaymentModal(false)
  }

  if (updating) {
    return (
      <div className="w-full mt-8 h-[10vh] flex justify-center items-center">
        <Loader />
      </div>
    )
  } else {
    return (
      <div>
        <div className="flex flex-col sm:mx-4  overflow-x-hidden overflow-y-scroll">
          <div className="mt-8 w-full p-4 ">
            <div className="flex flex-col">
              <div className="flex gap-4 xl:gap-8">
                <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                  <div className="flex flex-col w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
                    <p className="text-[.8rem]  text-white">Entry Fee</p>
                    <h1 className=" text-[2rem] sm:text-[3rem] font-valorant bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
                      {data.entry_prize == 0 ? "FREE" : `$${data.entry_prize}`}
                    </h1>
                  </div>
                </div>
                <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                  <div className="flex flex-col w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
                    <p className="text-[.8rem]  text-white">Prize Pool</p>
                    <h1 className="text-[2rem] sm:text-[3rem] font-valorant bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
                      {(Object.keys(data.tournament_type)[0].toUpperCase() ===
                        "CROWDFUNDED" &&
                        data.game_type.toUpperCase() === "SINGLE") ||
                      data.game_type.toUpperCase() === "TEAMVTEAM"
                        ? `$${data.entry_prize * data?.users?.length}`
                        : Object.keys(data.tournament_type)[0].toUpperCase() ==
                            "CROWDFUNDED" &&
                          data.game_type.toUpperCase() === "DUO"
                        ? `$${data.entry_prize * squadCount()}`
                        : Object.keys(data.tournament_type)[0].toUpperCase() ==
                            "CROWDFUNDED" &&
                          data.game_type.toUpperCase() === "SQUAD"
                        ? `$${data.entry_prize * squadCount()}`
                        : `$${data.total_prize}`}
                    </h1>
                  </div>
                </div>
              </div>
              {Object.keys(data.tournament_type)[0].toUpperCase() ===
              "BLITZKRIEG" ? (
                <div className="mt-8">
                  <h1 className="text-[1rem]  font-bold bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
                    Prize : ${(data.total_prize / per_kill).toFixed(2)} per kill
                  </h1>
                </div>
              ) : (
                <>
                  {data.no_of_winners === 1 ? (
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8 mt-4">
                      <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                        <div className="flex flex-col justify-center items-center w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
                          <p className="text-[.8rem]  text-white">1st</p>
                          <img src={`price1.svg`} className="mt-4" alt="" />
                          <h1 className="text-[1.5rem] font-valorant mt-4 bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                            {Object.keys(
                              data.tournament_type,
                            )[0].toUpperCase() === "CROWDFUNDED" &&
                            (data.game_type.toUpperCase() === "SINGLE" ||
                              data.game_type.toUpperCase() === "TEAMVTEAM")
                              ? `$${(
                                  data.entry_prize * data?.users?.length
                                ).toFixed(2)}`
                              : Object.keys(
                                  data.tournament_type,
                                )[0].toUpperCase() == "CROWDFUNDED" &&
                                data.game_type.toUpperCase() === "DUO"
                              ? `$${(data.entry_prize * squadCount()).toFixed(
                                  2,
                                )}`
                              : Object.keys(
                                  data.tournament_type,
                                )[0].toUpperCase() == "CROWDFUNDED" &&
                                data.game_type.toUpperCase() === "SQUAD"
                              ? `$${(data.entry_prize * squadCount()).toFixed(
                                  2,
                                )}`
                              : `$${data.total_prize.toFixed(2)}`}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ) : data.no_of_winners === 2 ? (
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8 mt-4">
                      <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                        <div className="flex flex-col justify-center items-center w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
                          <p className="text-[.8rem]  text-white">1st</p>
                          <img src={`price1.svg`} className="mt-4" alt="" />
                          <h1 className="text-[1.5rem] font-valorant mt-4 bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                            {Object.keys(
                              data.tournament_type,
                            )[0].toUpperCase() === "CROWDFUNDED" &&
                            data.game_type.toUpperCase() === "SINGLE"
                              ? `$${(
                                  data.entry_prize *
                                  data?.users?.length *
                                  0.6
                                ).toFixed(2)}`
                              : Object.keys(
                                  data.tournament_type,
                                )[0].toUpperCase() == "CROWDFUNDED" &&
                                data.game_type.toUpperCase() === "DUO"
                              ? `$${(
                                  data.entry_prize *
                                  squadCount() *
                                  0.6
                                ).toFixed(2)}`
                              : Object.keys(
                                  data.tournament_type,
                                )[0].toUpperCase() == "CROWDFUNDED" &&
                                data.game_type.toUpperCase() === "SQUAD"
                              ? `$${(
                                  data.entry_prize *
                                  squadCount() *
                                  0.6
                                ).toFixed(2)}`
                              : `$${(data.total_prize * 0.6).toFixed(2)}`}
                          </h1>
                        </div>
                      </div>
                      <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                        <div className="flex flex-col justify-center items-center w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
                          <p className="text-[.8rem]  text-white">2nd</p>
                          <img src={`price2.svg`} className="mt-4" alt="" />
                          <h1 className="text-[1.5rem] font-valorant mt-4 bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                            {Object.keys(
                              data.tournament_type,
                            )[0].toUpperCase() === "CROWDFUNDED" &&
                            data.game_type.toUpperCase() === "SINGLE"
                              ? `$${(
                                  data.entry_prize *
                                  data?.users?.length *
                                  0.4
                                ).toFixed(2)}`
                              : Object.keys(
                                  data.tournament_type,
                                )[0].toUpperCase() == "CROWDFUNDED" &&
                                data.game_type.toUpperCase() === "DUO"
                              ? `$${(
                                  data.entry_prize *
                                  squadCount() *
                                  0.4
                                ).toFixed(2)}`
                              : Object.keys(
                                  data.tournament_type,
                                )[0].toUpperCase() == "CROWDFUNDED" &&
                                data.game_type.toUpperCase() === "SQUAD"
                              ? `$${(
                                  data.entry_prize *
                                  squadCount() *
                                  0.4
                                ).toFixed(2)}`
                              : `$${(data.total_prize * 0.4).toFixed(2)}`}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8 mt-4">
                      <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                        <div className="flex flex-col justify-center items-center w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
                          <p className="text-[.8rem]  text-white">1st</p>
                          <img src={`price1.svg`} className="mt-4" alt="" />
                          <h1 className="text-[1.5rem] font-valorant mt-4 bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                            {Object.keys(
                              data.tournament_type,
                            )[0].toUpperCase() === "CROWDFUNDED" &&
                            data.game_type.toUpperCase() === "SINGLE"
                              ? `$${(
                                  data.entry_prize *
                                  data?.users?.length *
                                  0.5
                                ).toFixed(2)}`
                              : Object.keys(
                                  data.tournament_type,
                                )[0].toUpperCase() == "CROWDFUNDED" &&
                                data.game_type.toUpperCase() === "DUO"
                              ? `$${(
                                  data.entry_prize *
                                  squadCount() *
                                  0.5
                                ).toFixed(2)}`
                              : Object.keys(
                                  data.tournament_type,
                                )[0].toUpperCase() == "CROWDFUNDED" &&
                                data.game_type.toUpperCase() === "SQUAD"
                              ? `$${(
                                  data.entry_prize *
                                  squadCount() *
                                  0.5
                                ).toFixed(2)}`
                              : `$${(data.total_prize * 0.5).toFixed(2)}`}
                          </h1>
                        </div>
                      </div>
                      <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                        <div className="flex flex-col justify-center items-center w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
                          <p className="text-[.8rem]  text-white">2nd</p>
                          <img src={`price2.svg`} className="mt-4" alt="" />
                          <h1 className="text-[1.5rem] font-valorant mt-4 bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                            {Object.keys(
                              data.tournament_type,
                            )[0].toUpperCase() === "CROWDFUNDED" &&
                            data.game_type.toUpperCase() === "SINGLE"
                              ? `$${(
                                  data.entry_prize *
                                  data?.users?.length *
                                  0.3
                                ).toFixed(2)}`
                              : Object.keys(
                                  data.tournament_type,
                                )[0].toUpperCase() == "CROWDFUNDED" &&
                                data.game_type.toUpperCase() === "DUO"
                              ? `$${(
                                  data.entry_prize *
                                  squadCount() *
                                  0.3
                                ).toFixed(2)}`
                              : Object.keys(
                                  data.tournament_type,
                                )[0].toUpperCase() == "CROWDFUNDED" &&
                                data.game_type.toUpperCase() === "SQUAD"
                              ? `$${(
                                  data.entry_prize *
                                  squadCount() *
                                  0.3
                                ).toFixed(2)}`
                              : `$${(data.total_prize * 0.3).toFixed(2)}`}
                          </h1>
                        </div>
                      </div>
                      <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                        <div className="flex flex-col justify-center items-center w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
                          <p className="text-[.8rem]  text-white">3rd</p>
                          <img src={`price3.svg`} className="mt-4" alt="" />
                          <h1 className="text-[1.5rem] font-valorant mt-4 bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                            {Object.keys(
                              data.tournament_type,
                            )[0].toUpperCase() === "CROWDFUNDED" &&
                            data.game_type.toUpperCase() === "SINGLE"
                              ? `$${(
                                  data.entry_prize *
                                  data?.users?.length *
                                  0.2
                                ).toFixed(2)}`
                              : Object.keys(
                                  data.tournament_type,
                                )[0].toUpperCase() == "CROWDFUNDED" &&
                                data.game_type.toUpperCase() === "DUO"
                              ? `$${(
                                  data.entry_prize *
                                  squadCount() *
                                  0.2
                                ).toFixed(2)}`
                              : Object.keys(
                                  data.tournament_type,
                                )[0].toUpperCase() == "CROWDFUNDED" &&
                                data.game_type.toUpperCase() === "SQUAD"
                              ? `$${(
                                  data.entry_prize *
                                  squadCount() *
                                  0.2
                                ).toFixed(2)}`
                              : `$${(data.total_prize * 0.2).toFixed(2)}`}
                          </h1>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="mt-[1.5rem] mb-[1.5rem] border border-solid border-[#2E3438] w-full" />

              <div className="flex flex-col">
                <div className="flex items-center">
                  <img src={`calender2.png`} className="m-0" alt="" />
                  <h2 className="text-[0.8rem] ml-3 font-semibold sm:text-base  text-white">
                    Timeline [GMT+1]
                  </h2>
                </div>
                <div className="mt-8 w-full flex flex-col">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center">
                      <img
                        src={
                          days == 0 &&
                          hours == 0 &&
                          minutes == 0 &&
                          seconds == 0
                            ? `check2.svg`
                            : `check.svg`
                        }
                        className="m-0"
                        alt=""
                      />
                      <p
                        className={
                          days == 0 &&
                          hours == 0 &&
                          minutes == 0 &&
                          seconds == 0
                            ? "text-[.7rem] md:text-[.85rem]  ml-3 text-[#2E3438]"
                            : "text-[.7rem] md:text-[.85rem]  ml-3 text-primary-second "
                        }
                      >
                        Registration
                      </p>
                    </div>
                    <p
                      className={
                        days == 0 && hours == 0 && minutes == 0 && seconds == 0
                          ? "text-[.7rem] md:text-[.85rem]   text-[#2E3438]"
                          : "text-[.7rem] md:text-[.85rem]   text-primary-second "
                      }
                    >
                      Ongoing
                    </p>
                  </div>
                  <div className="flex md:justify-between mt-4 items-center w-full">
                    <div className="flex items-center">
                      <img
                        src={
                          days == 0 &&
                          hours == 0 &&
                          minutes == 0 &&
                          seconds == 0
                            ? `check2.svg`
                            : `check.svg`
                        }
                        className="m-0"
                        alt=""
                      />
                      <p
                        className={
                          days == 0 &&
                          hours == 0 &&
                          minutes == 0 &&
                          seconds == 0
                            ? "text-[.7rem] md:text-[.85rem]  ml-3 text-[#2E3438]  "
                            : "text-[.7rem] md:text-[.85rem]  ml-3 text-primary-second"
                        }
                      >
                        Registration closes
                      </p>
                    </div>
                    <p
                      className={
                        days == 0 && hours == 0 && minutes == 0 && seconds == 0
                          ? "text-[.7rem] md:text-[.85rem] ml-4   text-[#2E3438]"
                          : "text-[.7rem] md:text-[.85rem]  ml-4  text-primary-second "
                      }
                    >
                      {formatDate(data.starting_date)}
                    </p>
                  </div>
                  <div className="flex md:justify-between  mt-4 items-center w-full">
                    <div className="flex items-center">
                      <img
                        src={
                          days == 0 &&
                          hours == 0 &&
                          minutes == 0 &&
                          seconds == 0
                            ? `check.svg`
                            : `check2.svg`
                        }
                        className="m-0"
                        alt=""
                      />
                      <p
                        className={
                          days == 0 &&
                          hours == 0 &&
                          minutes == 0 &&
                          seconds == 0
                            ? "text-[.7rem] md:text-[.85rem]  ml-3 text-primary-second "
                            : "text-[.7rem] md:text-[.85rem]  ml-3 text-[#2E3438]"
                        }
                      >
                        Tournament begins
                      </p>
                    </div>
                    <p
                      className={
                        days == 0 && hours == 0 && minutes == 0 && seconds == 0
                          ? "text-[.7rem] md:text-[.85rem] ml-4  text-primary-second "
                          : "text-[.7rem] md:text-[.85rem] ml-4  text-[#2E3438]"
                      }
                    >
                      {formatDate(data.starting_date)}
                    </p>
                  </div>
                </div>

                <div className=" mt-8 w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                  <div className="flex flex-col w-full rounded-md  bg-primary-first p-4">
                    <CountDownTimer targetDate={count} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          {Object.keys(data.status)[0].toUpperCase() === "GAMECOMPLETED" ? (
            <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-[#f55d2f] rounded-md items-center sm:py-2">
              <p className="font-semibold">Ended</p>
            </button>
          ) : days == 0 && hours == 0 && minutes == 0 && seconds == 0 ? (
            <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-[#FFA500] rounded-md items-center sm:py-2">
              <p className="font-semibold">In progress</p>
            </button>
          ) : (
            <>
              {(Object.keys(data.tournament_type)[0].toUpperCase() ==
                "PREPAID" &&
                data.creator == owner) ||
              (Object.keys(data.tournament_type)[0].toUpperCase() ==
                "BLITZKRIEG" &&
                data.creator == owner) ? (
                <div></div>
              ) : data.users.some((index: any) => index.includes(owner)) ===
                  true ||
                data.squad.some(
                  (players: any) =>
                    players.members.some((gamer: any) =>
                      gamer.name.includes(owner),
                    ) === true,
                ) ? (
                days == 0 && hours == 0 && minutes == 0 && seconds == 0 ? (
                  <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-[#FFA500] rounded-md items-center sm:py-2">
                    <p className="font-semibold">In progress</p>
                  </button>
                ) : principal !== "" ? (
                  <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-[#63aa88] rounded-md items-center sm:py-2">
                    <p className="font-semibold">Joined</p>
                  </button>
                ) : (
                  <button
                    onClick={() => handleLoginModal()}
                    className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center sm:py-2"
                  >
                    <p className="font-semibold">Login to Join</p>
                  </button>
                )
              ) : (
                <button
                  onClick={
                    principal !== ""
                      ? () => {
                          setOpenPaymentModal(true)
                        }
                      : () => handleLoginModal()
                  }
                  className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[18rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-2"
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
                      {data.game_type.toUpperCase() === "SINGLE" ||
                      data.game_type.toUpperCase() === "TEAMVTEAM"
                        ? "Join Solo Tournament"
                        : "Join Tournament with Squad"}
                    </p>
                  )}
                </button>
              )}
            </>
          )}
        </div>
        {openLoginModal && <LoginModal2 modal={handleLoginModal} />}
        {/* {openSoloModal && (
          <JoinAsSolo
            modal={handleSoloModal}
            owner={owner}
            userId={principal}
            id={id}
          />
        )}
        {openSquadModal && (
          <JoinAsSquad
            modal={handleSquadModal}
            squad_id={squad_id}
            id={id}
            squad={squad}
            data={data}
          />
        )} */}
        {openPaymentModal && (
          <PaymentModal
            id={id}
            squad={squad}
            data={data}
            squad_id={squad_id}
            owner={owner}
            creator={data.creator}
            userId={principal}
            modal={handleModal}
          />
        )}
        {Object.keys(data.status)[0].toUpperCase() === "GAMEINPROGRESS" ||
        Object.keys(data.status)[0].toUpperCase() === "GAMECOMPLETED" ||
        data.users.some((index: any) => index.includes(owner)) === true ||
        data.squad.some((players: any) =>
          players.members.some((gamer: any) => gamer.name.includes(owner)),
        ) === true ||
        (Object.keys(data.tournament_type)[0].toUpperCase() == "PREPAID" &&
          data.creator == owner) ? (
          <></>
        ) : !forceClose &&
          (openWager || bet?.staker_principal_id !== principal) ? (
          <WagerModal
            data={data}
            option={option}
            modal={handleWagerModal}
            handleModal={handleWagerModal2}
          />
        ) : null}
      </div>
    )
  }
}

export default TournamentInfo
