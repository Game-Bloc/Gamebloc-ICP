import React, { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import Sidebar from "../components/dashboardComps/Sidebar"
import { IoIosArrowRoundBack } from "react-icons/io"
import {
  Select,
  DatePicker,
  TimePicker,
  ConfigProvider,
  theme,
  Skeleton,
} from "antd"
import { useNavigate } from "react-router-dom"
import { useParams, useLocation } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import { useGameblocHooks } from "../Functions/gameblocHooks"
import { ulid } from "ulid"
import dayjs from "dayjs"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import type { Dayjs } from "dayjs"
import type { DatePickerProps } from "antd"
import type { RangePickerProps } from "antd/es/date-picker"
import ClipLoader from "react-spinners/ClipLoader"
import { DotChartOutlined } from "@ant-design/icons"
import { GameType } from "../../../declarations/kitchen/kitchen.did"
import FallbackLoading from "../components/Modals/FallBackLoader"
import { useAuth } from "../Auth/use-auth-client"
import Editor from "../components/Texteditor/Editor"
import PaymentModal2 from "../components/Modals/PaymentModal2"
const loader = require("../../assets/category1.svg").default
const loader1 = require("../../assets/category2.svg").default
const loader2 = require("../../assets/category3.svg").default
const loader3 = require("../../assets/category4.svg").default

const CreateTournament = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const { id } = useParams<{ id: string }>()
  // const game_name = new URLSearchParams(location.search).get("title") || ""
  const game_name = "Call of Duty Mobile"
  const [color, setColor] = useState("#ffffff")
  const [poolPrize, setPoolPrize] = useState("")
  const [entryPrice, setEntryPrize] = useState("")
  const [noOfUsers, setNoOfUsers] = useState<number>(0)
  const [tournamentType, setTournamentType] = useState<string>("")
  const [gameType, setGameType] = useState<string>("")
  const [variantType, setVariantType] = useState(null)
  const [gameName, setGameName] = useState<string>("")
  const [noOfWinners, setNoOfWinners] = useState<number>(0)
  const [tourType, setTourType] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [tournamentRules, setTournamentRules] = useState<string>("")
  const [initialTime, setInitialTime] = useState<string>("")
  const [initialDate, setInitialDate] = useState<string>("")
  const [startingDate, setStartingDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [tournamentID, setTournamentID] = useState<string>("")
  const [active, setActive] = useState<string>("first")
  const _icp2Usd = useAppSelector((state) => state.IcpBalance.currentICPrice)
  const [icpValue, setIcpValue] = useState<number>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { done, updating, createTournament, getICPBalance, getProfile } =
    useGameblocHooks()
  const [isImageLoaded, setImageLoaded] = useState<boolean>(false)
  const MySwal = withReactContent(Swal)
  const name = useAppSelector((state) => state.userProfile.username)
  const balance = useAppSelector((state) => state.IcpBalance.balance)
  const creator_id = useAppSelector((state) => state.userProfile.id_hash)
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false)
  const principal = useAppSelector((state) => state.userProfile.principal_id)

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  }

  const generateULID = () => {
    const date = new Date()
    let day = date.getDate()
    const id = ulid(day)
    setTournamentID(id)
    // console.log("ulid:", id)
  }

  useEffect(() => {
    generateULID()
    getICPBalance()
    getProfile()
    const getTimeDate = () => {
      const value = initialTime.concat(" ", initialDate)
      setStartingDate(value)
    }

    if (tournamentType === "Prepaid") {
      setTourType("Prepaid")
      setVariantType({ Prepaid: null })
    } else if (tournamentType === "Blitzkrieg") {
      setTourType("Blitzkrieg")
      setVariantType({ Blitzkrieg: null })
    } else {
      setTourType("Crowdfunded")
      setVariantType({ Crowdfunded: null })
    }
    getTimeDate()
  }, [
    tournamentType,
    initialDate,
    initialTime,
    startingDate,
    isAuthenticated,
    // getTournamentCount,
  ])
  console.log(balance)

  useEffect(() => {
    const calculateIcpValue = () => {
      const dollarAmount =
        tourType === "Prepaid" || "Blitzkrieg" ? +poolPrize : +entryPrice
      if (_icp2Usd > 0 && dollarAmount > 0) {
        const icpValue = dollarAmount / _icp2Usd
        setIcpValue(icpValue)
      } else {
        setIcpValue(0)
      }
    }

    calculateIcpValue()
  }, [poolPrize, entryPrice, _icp2Usd, tourType])

  useEffect(() => {
    if (close) {
      setOpenModal(false)
    }
  }, [close])

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageLoaded(true)
    }
    img.src = loader
  }, [loader])

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  const filterOption1 = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day")
    return null
  }

  const CustomDisabledDate = (current: Dayjs) => {
    const oneDayAfterStart = initialDate
      ? dayjs(initialDate).add(1, "day")
      : dayjs().add(1, "day")
    return current && current < oneDayAfterStart.endOf("day")
  }

  const onTimeChange = (time: Dayjs | null, timeString: string) => {
    const value = timeString
    setInitialTime(value)
  }

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    const value = dateString
    setInitialDate(value)
  }

  const onEndDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    const value = dateString
    setEndDate(value)
  }

  const getTimeDate = () => {
    const value = initialTime.concat(" ", initialDate)
    setStartingDate(value)
    console.log("starting:", startingDate)
  }

  const onPriceChange = (e: any) => {
    e.preventDefault()
    const priceinput = e.target.value
    setPoolPrize(priceinput)
    setEntryPrize("")
  }

  const onEntryChange = (e: any) => {
    e.preventDefault()
    const entryInput = e.target.value
    setEntryPrize(entryInput)
    setPoolPrize("")
  }

  const handleContent = (rules: any) => {
    setTournamentRules(rules)
  }

  const onTitleChange = (e: any) => {
    e.preventDefault()
    const title = e.target.value
    setTitle(title)
  }

  const onUserChange = (e: any) => {
    e.preventDefault()
    const userNumberInput = e.target.value
    setNoOfUsers(+userNumberInput)
  }

  const onGameChange = (e: any) => {
    e.preventDefault()
    const gameInput = e.target.value
    setGameName(gameInput)
  }

  const handleTournamentTypeChange = (value: string) => {
    setTournamentType(value)
  }

  const handleGameTYpe = (value: string) => {
    value === "MP/BR Single"
      ? setGameType("Single")
      : value === "BR Duo"
      ? setGameType("Duo")
      : value === "BR Squad"
      ? setGameType("Squad")
      : setGameType("Single")
  }

  const handleWinnersChange = (value: string) => {
    setNoOfWinners(+value)
  }

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

  const handleModal = () => {
    setOpenPaymentModal(false)
  }

  const create_tour = () => {
    console.log("Participants", noOfUsers)
    console.log("Winners", noOfWinners)
    console.log("Creator", name)
    console.log("Tournament ID", tournamentID)
    console.log("tournament Rules", tournamentRules)
    console.log("tournament type", tournamentType)
    console.log("Starting Date", startingDate)
    console.log("Entry price", +entryPrice)
    console.log("Total price", +poolPrize)
    console.log("Game", game_name)
    console.log("Game Type", gameType)
    console.log("Game Title", title)
    console.log("End Time", endDate)
  }

  const proceed_to_payment = () => {
    if (
      noOfUsers === 0 ||
      noOfWinners === 0 ||
      tournamentRules.trim() === "" ||
      tournamentType.trim() === "" ||
      startingDate.trim() === "" ||
      title.trim() === "" ||
      endDate.trim() === "" ||
      initialDate.trim() === "" ||
      initialTime.trim() === ""
    ) {
      errorPopUp("Field Input is invalid !")
    } else {
      if (
        (tourType === "Prepaid" && balance > icpValue) ||
        (tourType === "Crowdfunded" && balance > icpValue)
      ) {
        setOpenPaymentModal(true)
      } else {
        errorPopUp("Your ICP balance is low, pls fund your account.")
      }
    }
  }

  const _tour = () => {
    createTournament(
      1,
      tournamentID,
      { AcceptingPlayers: null },
      name,
      [],
      creator_id,
      game_name,
      [],
      [],
      [],
      BigInt(+poolPrize),
      tournamentRules,
      startingDate,
      variantType,
      +entryPrice,
      noOfWinners,
      BigInt(noOfUsers),
      gameType,
      endDate,
      title,
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      "Successful",
      "Try again something went wrong",
      "",
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full mt-8 h-screen flex justify-center items-center">
        <FallbackLoading />
      </div>
    )
  } else {
    return (
      <div className="">
        <section className="flex gap-6">
          <Header />
          <Sidebar />
          <div className="flex flex-col ">
            <div className="m-4 mt-24  ">
              <div className="flex flex-col">
                <div
                  onClick={() => navigate(-1)}
                  className="flex  items-center cursor-pointer"
                >
                  <IoIosArrowRoundBack className="text-primary-second" />
                  <p className="text-primary-second ml-2 text-[0.8rem]">Back</p>
                </div>
                <div className="flex flex-col lg:flex-row ">
                  <div className=" w-full lg:w-[50%] mt-4 sm:mt-8 lg:mx-4 flex flex-col">
                    <div className="flex w-full justify-center items-center">
                      {!isImageLoaded && (
                        <div className="flex flex-col w-full h-full justify-center items-center">
                          <Skeleton.Node
                            className=" bg-[#505050] "
                            active={true}
                          >
                            <DotChartOutlined
                              style={{ fontSize: 40, color: "#bfbfbf" }}
                            />
                          </Skeleton.Node>
                          <Skeleton.Input
                            className="mt-[1rem] bg-[#505050] h-[1.2rem]"
                            active={true}
                            size={"small"}
                          />
                        </div>
                      )}
                      {isImageLoaded && (
                        <div className="border-solid border border-[#2E3438] w-fit rounded-[0.625rem]">
                          <img
                            src={
                              id == "1"
                                ? loader
                                : id == "2"
                                ? loader1
                                : id == "3"
                                ? loader2
                                : id == "4"
                                ? loader3
                                : `gamepad.png`
                            }
                            alt=""
                            className="rounded-[0.625rem]"
                          />
                        </div>
                      )}
                    </div>
                    <div className="border-solid border mt-8  border-[#2E3438] rounded-[0.625rem]">
                      <div className="flex justify-between my-[.9rem] mx-4 items-center">
                        <p className=" text-[0.7rem] font-semibold sm:text-base  text-white ">
                          Host Tournament
                        </p>
                        <div className="flex flex-wrap justify-end items-center gap-4">
                          <div className="rounded-[9999px] pt-[0.1rem] px-[.75rem] pb-[0.1rem] sm:px-[1.2rem] sm:pb-[0.4rem] sm:pt-[.3rem]  bg-[#FEE4E2] border-none">
                            <p className=" text-[#D92D20] text-[0.5rem] sm:text-[0.8rem] cursor-pointer font-medium">
                              Action
                            </p>
                          </div>
                          <div className="rounded-[9999px] pt-[0.1rem] px-[.75rem] pb-[0.1rem] sm:px-[1.2rem] sm:pb-[0.4rem] sm:pt-[.3rem]  bg-[#FFD98F] border-none">
                            <p className=" text-[#B88217] text-[0.5rem] sm:text-[0.8rem] cursor-pointer font-medium">
                              Adventure
                            </p>
                          </div>
                          <div className="rounded-[9999px] pt-[0.1rem] px-[.75rem] pb-[0.1rem] sm:px-[1.2rem] sm:pb-[0.4rem] sm:pt-[.3rem]  bg-[#D1FADF] border-none">
                            <p className=" text-[#039855] text-[0.5rem] sm:text-[0.8rem] cursor-pointer font-medium">
                              Shooting
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="my-4 border border-solid border-[#2E3438] w-full" />

                      <div className="p-4 flex flex-col">
                        <p className=" text-[0.8rem] font-semibold sm:text-base  text-white ">
                          {" "}
                          Information
                        </p>

                        <p className="mt-4 text-[0.7rem] xl:text-[1rem] text-white">
                          As a registered user, you can create your own
                          tournaments. Specify the game, tournament format,
                          entry fees (for crowdfunded tournaments), and prize
                          pool (for prepaid tournaments). Set the rules and
                          guidelines, and watch as gamers from all over sign up
                          for your event. Browse through the list of upcoming
                          tournaments. Join your preferred tournament by paying
                          the entry fee or confirming your participation. Get
                          ready to compete and showcase your gaming skills. If
                          you're a winner, your prizes will be awarded based on
                          the tournament's rules. Receive your rewards and bask
                          in the glory of your victory.
                        </p>
                      </div>
                    </div>
                  </div>

                  {active === "first" && (
                    <div className="border relative rounded-[0.625rem] w-full h-full lg:w-[50%] mt-8 border-solid border-[#2E3438]">
                      <p className="text-[0.8rem] ml-4 mt-4 mb-[1.5rem] font-semibold sm:text-base  text-white">
                        Game Details
                      </p>
                      <div className="my-4 border border-solid border-[#2E3438] w-full" />
                      <div className="flex mt-4 mx-4 flex-col">
                        <p className=" mb-4 text-sm sm:text-base font-normal text-white">
                          Game Type
                        </p>
                        <ConfigProvider
                          theme={{
                            algorithm: theme.darkAlgorithm,
                            token: {
                              colorPrimaryActive: "#F6B8FC",
                              colorPrimary: "#F6B8FC",
                              colorPrimaryHover: "#F6B8FC",
                              colorText: "#fff",
                            },
                          }}
                        >
                          <Select
                            placeholder="Select game play mode"
                            optionFilterProp="children"
                            onChange={handleGameTYpe}
                            filterOption={filterOption}
                            options={[
                              {
                                value: "MP/BR Single",
                                label: "MP/BR Single",
                              },
                              {
                                value: "BR Duo",
                                label: "BR Duo",
                              },
                              {
                                value: "BR Squad",
                                label: "BR Squad",
                              },
                            ]}
                          />
                        </ConfigProvider>
                      </div>
                      <div className="flex-col  flex m-4 ">
                        <p className="text-sm sm:text-base mt-[.8rem] font-normal text-white">
                          Number of Participant
                        </p>
                        <div className=" my-4 items-center pr-8 pl-2 h-[2.15rem] border-[#595959] bg-[#141414] border-solid border hover:border-primary-second rounded-lg flex">
                          <input
                            className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                            placeholder="Participants"
                            type="text"
                            onChange={onUserChange}
                            value={noOfUsers}
                          />
                        </div>
                      </div>
                      <div className="flex w-full justify-center mb-4 relative items-end  ">
                        <button
                          onClick={() => setActive("second")}
                          className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[15rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-center mt-[0.7rem] sm:mt-[1.5rem] mx-4 flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                  {active === "second" && (
                    <div className="border rounded-[0.625rem] w-full lg:w-[50%] mt-8 border-solid border-[#2E3438]">
                      <div
                        onClick={() => setActive("first")}
                        className="flex cursor-pointer items-center ml-4 mt-4 mb-[1.5rem]"
                      >
                        <IoIosArrowRoundBack className="text-white" />
                        <p className="text-[0.8rem] ml-3   font-semibold sm:text-base  text-white">
                          Tournament Details
                        </p>
                      </div>
                      <div className="my-4 border border-solid border-[#2E3438] w-full" />

                      <div className="flex-col flex m-4 ">
                        <p className="text-sm sm:text-base mt-[.8rem] font-normal text-white">
                          Tournament Title
                        </p>
                        <div className=" my-4 items-center pr-8 pl-2 h-[2.7rem]  border-[#595959] bg-[#141414] hover:border-primary-second border-solid border rounded-lg flex">
                          <input
                            className="border-none w-full text-white p-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
                            placeholder="Tournament Title"
                            type="text"
                            onChange={onTitleChange}
                            value={title}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center m-4 ">
                        <div className="flex mt-4 flex-col">
                          <p className=" mb-4 text-sm sm:text-base font-normal text-white">
                            Select Tournament Type
                          </p>
                          <ConfigProvider
                            theme={{
                              algorithm: theme.darkAlgorithm,
                              token: {
                                colorPrimaryActive: "#F6B8FC",
                                colorPrimary: "#F6B8FC",
                                colorPrimaryHover: "#F6B8FC",
                                colorText: "#fff",
                              },
                            }}
                          >
                            <Select
                              placeholder="Tournament Type"
                              optionFilterProp="children"
                              onChange={handleTournamentTypeChange}
                              filterOption={filterOption1}
                              options={[
                                {
                                  value: "Crowdfunded",
                                  label: "Crowdfunded",
                                },
                                {
                                  value: "Prepaid",
                                  label: "Prepaid",
                                },
                                {
                                  value: "Blitzkrieg",
                                  label: "Blitzkrieg",
                                },
                              ]}
                            />
                          </ConfigProvider>
                        </div>
                        <div className="flex flex-col">
                          <p className=" mb-4 text-sm mt-4 lg:mt-0 sm:text-base font-normal text-white">
                            Select Number of Winners
                          </p>
                          <ConfigProvider
                            theme={{
                              algorithm: theme.darkAlgorithm,
                              token: {
                                colorPrimaryActive: "#F6B8FC",
                                colorPrimary: "#F6B8FC",
                                colorPrimaryHover: "#F6B8FC",
                                colorText: "#fff",
                              },
                            }}
                          >
                            <Select
                              placeholder="Select number of Winners"
                              optionFilterProp="children"
                              onChange={handleWinnersChange}
                              filterOption={filterOption}
                              options={[
                                {
                                  value: "1",
                                  label: "1",
                                },
                                {
                                  value: "2",
                                  label: "2",
                                },
                                {
                                  value: "3",
                                  label: "3",
                                },
                              ]}
                            />
                          </ConfigProvider>
                        </div>
                      </div>

                      <div className="flex  flex-col sm:flex-row sm:justify-between mt-4 sm:items-center m-4 ">
                        <div className="flex mt-4 flex-col">
                          <p className=" mb-4 text-sm sm:text-base font-normal text-white">
                            Start Time
                          </p>
                          <ConfigProvider
                            theme={{
                              algorithm: theme.darkAlgorithm,
                              token: {
                                colorPrimaryActive: "#F6B8FC",
                                colorPrimary: "#F6B8FC",
                                colorPrimaryHover: "#F6B8FC",
                                colorText: "#fff",
                              },
                            }}
                          >
                            <TimePicker
                              use12Hours
                              format="h:mm a"
                              onChange={onTimeChange}
                            />
                          </ConfigProvider>
                        </div>
                        <div className="flex flex-col">
                          <p className=" mb-4 mt-4 lg:mt-0  text-sm sm:text-base font-normal text-white">
                            Start Date
                          </p>
                          <ConfigProvider
                            theme={{
                              algorithm: theme.darkAlgorithm,
                              token: {
                                colorPrimaryActive: "#F6B8FC",
                                colorPrimary: "#F6B8FC",
                                colorPrimaryHover: "#F6B8FC",
                                colorText: "#fff",
                              },
                            }}
                          >
                            <DatePicker
                              disabledDate={disabledDate}
                              onChange={onDateChange}
                            />
                          </ConfigProvider>
                        </div>
                      </div>
                      <div className="flex flex-col mx-4">
                        <p className=" mb-4 mt-4 lg:mt-0  text-sm sm:text-base font-normal text-white">
                          End Date
                        </p>
                        <ConfigProvider
                          theme={{
                            algorithm: theme.darkAlgorithm,
                            token: {
                              colorPrimaryActive: "#F6B8FC",
                              colorPrimary: "#F6B8FC",
                              colorPrimaryHover: "#F6B8FC",
                              colorText: "#fff",
                            },
                          }}
                        >
                          <DatePicker
                            disabledDate={CustomDisabledDate}
                            onChange={onEndDateChange}
                          />
                        </ConfigProvider>
                      </div>

                      <div className="flex-col flex m-4 ">
                        <div className="flex w-full justify-between items-center flex-row">
                          <p className="text-sm sm:text-base mt-[.8rem] font-normal text-white">
                            {tourType === "Prepaid"
                              ? " Pool Price in $"
                              : tourType === "Blitzkrieg"
                              ? " Pool Price in $"
                              : " Entry Price in $"}
                          </p>
                          <div className="flex mt-[.8rem] flex-row">
                            <p className="text-[1rem] text-white mr-4">≈</p>
                            <p className="text-bold text-[1rem]   sm:text-[1rem]  text-[#ffffff]">
                              {icpValue !== null
                                ? `${icpValue.toFixed(8)} ICP`
                                : "Calculating..."}
                            </p>
                          </div>
                        </div>
                        <div className=" my-4 items-center pr-8 h-[2.7rem] pl-2 border-[#595959] bg-[#141414] hover:border-primary-second border-solid border rounded-lg flex">
                          <input
                            className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
                            placeholder={
                              tourType === "Prepaid"
                                ? " Pool Price in $"
                                : tourType === "Blitzkrieg"
                                ? " Pool Price in $"
                                : " Entry Price in $"
                            }
                            type="text"
                            onChange={
                              tourType === "Prepaid"
                                ? onPriceChange
                                : tourType === "Blitzkrieg"
                                ? onPriceChange
                                : tourType === "Crowdfunded"
                                ? onEntryChange
                                : onEntryChange
                            }
                            value={
                              tourType === "Prepaid"
                                ? poolPrize
                                : tourType === "Blitzkrieg"
                                ? poolPrize
                                : entryPrice
                            }
                          />
                        </div>
                      </div>
                      {tourType === "Blitzkrieg" && (
                        <div className="flex-col flex m-4 ">
                          <p className="text-sm sm:text-base mt-[.8rem] font-normal text-white">
                            Entry Price
                          </p>
                          <div className=" my-4 items-center pr-8 h-[2.7rem] pl-[0.5rem] border-[#595959] bg-[#141414] border-solid border rounded-lg flex">
                            <input
                              className="border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
                              placeholder="Entry Price in $"
                              type="text"
                              onChange={onEntryChange}
                              value={entryPrice}
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex-col flex m-4 ">
                        <p className="text-sm sm:text-base mt-[.8rem] font-normal text-white">
                          Tournament Description and Rules
                        </p>
                        {/* <div className=" my-4  items-center  hover:border-primary-second border-[#595959] bg-[#141414] border-solid border rounded-lg flex"> */}
                        {/* <textarea
                            className="pl-0 border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
                            placeholder="Enter Description"
                            rows={4}
                            value={tournamentRules}
                            onChange={onRuleChange}
                          /> */}

                        <Editor
                          handleContent={handleContent}
                          content={tournamentRules}
                        />
                        {/* </div> */}
                      </div>
                      <div className="mt-4 mx-4 lg:mx-0 mb-4 flex justify-center items-center">
                        <button
                          onClick={() => {
                            proceed_to_payment()
                          }}
                          className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[15rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3"
                        >
                          Proceed
                          {/* {isLoading ? (
                            <ClipLoader
                              color={color}
                              loading={isLoading}
                              cssOverride={override}
                              size={20}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            <p className="font-semibold">Create Tournament</p>
                          )} */}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {openPaymentModal && (
          <PaymentModal2
            done={done}
            gameType={gameType}
            modal={handleModal}
            updating={updating}
            owner={principal}
            icp={icpValue}
            entryPrice={entryPrice}
            poolPrice={poolPrize}
            tourType={tourType}
            create_tour={_tour}
          />
        )}
      </div>
    )
  }
}

export default CreateTournament
