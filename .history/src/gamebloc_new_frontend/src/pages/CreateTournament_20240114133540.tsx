import React, { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import Sidebar from "../components/dashboardComps/Sidebar"
import { IoIosArrowRoundBack } from "react-icons/io"
import { Select, DatePicker, TimePicker, ConfigProvider, theme } from "antd"
import { useNavigate } from "react-router-dom"
import { useParams, useLocation } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import { useGameblocHooks } from "../Functions/gameblocHooks"
import { ulid } from "ulid"
import dayjs from "dayjs"
import type { Dayjs } from "dayjs"
import type { DatePickerProps } from "antd"
import type { RangePickerProps } from "antd/es/date-picker"
import ClipLoader from "react-spinners/ClipLoader"

const CreateTournament = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const game_name = new URLSearchParams(location.search).get("title") || ""
  const [color, setColor] = useState("#ffffff")
  const [poolPrize, setPoolPrize] = useState("")
  const [entryPrice, setEntryPrize] = useState("")
  const [noOfUsers, setNoOfUsers] = useState<number>(0)
  const [tournamentType, setTournamentType] = useState<string>("")
  const [variantType, setVariantType] = useState(null)
  const [gameName, setGameName] = useState<string>("")
  const [noOfWinners, setNoOfWinners] = useState<number>(0)
  const [tourType, setTourType] = useState<string>("")
  const [tournamentRules, setTournamentRules] = useState<string>("")
  const [initialTime, setInitialTime] = useState<string>("")
  const [initialDate, setInitialDate] = useState<string>("")
  const [startingDate, setStartingDate] = useState<string>("")
  const [tournamentID, setTournamentID] = useState<string>("")
  const [active, setActive] = useState<string>("first")
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { isLoading, createTournament } = useGameblocHooks()
  const name = useAppSelector((state) => state.userProfile.username)

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
    console.log("ulid:", id)
  }

  useEffect(() => {
    generateULID()

    const getTimeDate = () => {
      const value = initialTime.concat(" ", initialDate)
      setStartingDate(value)
    }
    if (tournamentType === "Crowdfunded") {
      setTourType("Crowdfunded")
      setVariantType({ Crowdfunded: null })
    } else if (tournamentType === "Prepaid") {
      setTourType("Prepaid")
      setVariantType({ Prepaid: null })
    } else {
      setTourType("Crowdfunded")
    }
    getTimeDate()
  }, [
    tournamentType,
    initialDate,
    initialTime,
    startingDate,
    // getTournamentCount,
  ])

  useEffect(() => {
    if (close) {
      setOpenModal(false)
    }
  }, [close])

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
  }

  const onTimeChange = (time: Dayjs | null, timeString: string) => {
    const value = timeString
    setInitialTime(value)
  }

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    const value = dateString
    setInitialDate(value)
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

  const onRuleChange = (e: any) => {
    e.preventDefault()
    const rules = e.target.value
    setTournamentRules(rules)
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

  const handleWinnersChange = (value: string) => {
    setNoOfWinners(+value)
  }

  const testFunction = () => {
    console.log("Participants", noOfUsers)
    console.log("Winners", noOfWinners)
    console.log("name", name)
    console.log("Tournament ID", tournamentID)
    console.log("tournament Rules", tournamentRules)
    console.log("tournament type", tournamentType)
    console.log("Starting Date", startingDate)
    console.log("Entry price", +entryPrice)
    console.log("Total price", +poolPrize)
    console.log("Game", game_name)
  }

  const addTournament = () => {
    createTournament(
      1,
      tournamentID,
      { AcceptingPlayers: null },
      name,
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
      "",
      "",
      "",
      "You have successfully created a Tournament",
      "Try again something went wrong",
      "/dashboard",
    )
  }

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
                    <div className="border-solid border border-[#2E3438] w-fit rounded-[0.625rem]">
                      <img
                        src={
                          id == "1"
                            ? `category1.svg`
                            : id == "2"
                            ? `category2.svg`
                            : id == "3"
                            ? `category3.svg`
                            : id == "4"
                            ? `category4.svg`
                            : `gamepad.png`
                        }
                        alt=""
                        className="rounded-[0.625rem]"
                      />
                    </div>
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
                        tournaments. Specify the game, tournament format, entry
                        fees (for crowdfunded tournaments), and prize pool (for
                        prepaid tournaments). Set the rules and guidelines, and
                        watch as gamers from all over sign up for your event.
                        Browse through the list of upcoming tournaments. Join
                        your preferred tournament by paying the entry fee or
                        confirming your participation. Get ready to compete and
                        showcase your gaming skills. If you're a winner, your
                        prizes will be awarded based on the tournament's rules.
                        Receive your rewards and bask in the glory of your
                        victory.
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
                        }}
                      >
                        <Select
                          placeholder="Tournament Type"
                          optionFilterProp="children"
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
                      <div className=" my-4 items-center pr-8 h-[2.15rem] pl-[0.5rem] border-[#595959] bg-[#141414] border-solid border rounded-lg flex">
                        <input
                          className="border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
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
                      <div className=" my-4 items-center pr-8 h-[2.7rem] pl-[0.5rem] border-[#595959] bg-[#141414] border-solid border rounded-lg flex">
                        <input
                          className="border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
                          placeholder="Tournament Title"
                          type="text"
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
                          Set Time
                        </p>
                        <ConfigProvider
                          theme={{
                            algorithm: theme.darkAlgorithm,
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
                          Set Date
                        </p>
                        <ConfigProvider
                          theme={{
                            algorithm: theme.darkAlgorithm,
                          }}
                        >
                          <DatePicker
                            disabledDate={disabledDate}
                            onChange={onDateChange}
                          />
                        </ConfigProvider>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className=" mb-4 mt-4 lg:mt-0  text-sm sm:text-base font-normal text-white">
                        End Date
                      </p>
                      <ConfigProvider
                        theme={{
                          algorithm: theme.darkAlgorithm,
                        }}
                      >
                        <DatePicker
                          disabledDate={disabledDate}
                          onChange={onDateChange}
                        />
                      </ConfigProvider>
                    </div>

                    <div className="flex-col flex m-4 ">
                      <p className="text-sm sm:text-base mt-[.8rem] font-normal text-white">
                        {tourType === "Prepaid"
                          ? " Pool Price in $"
                          : " Entry Price in $"}
                      </p>
                      <div className=" my-4 items-center pr-8 h-[2.7rem] pl-[0.5rem] border-[#595959] bg-[#141414] border-solid border rounded-lg flex">
                        <input
                          className="border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
                          placeholder={
                            tourType === "Prepaid"
                              ? " Pool Price ($)"
                              : "Entry price ($)"
                          }
                          type="text"
                          onChange={
                            tourType === "Prepaid"
                              ? onPriceChange
                              : tourType === "Crowdfunded"
                              ? onEntryChange
                              : onEntryChange
                          }
                          value={
                            tourType === "Prepaid" ? poolPrize : entryPrice
                          }
                        />
                      </div>
                    </div>
                    {/* <div className="flex-col flex m-4 ">
                      <p className="text-sm sm:text-base mt-[.8rem] font-normal text-white">
                        Number of Participant
                      </p>
                      <div className=" my-4 items-center pr-8 h-[2.7rem] pl-[0.5rem] border-[#595959] bg-[#141414] border-solid border rounded-lg flex">
                        <input
                          className="border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
                          placeholder="Participants"
                          type="text"
                          onChange={onUserChange}
                          value={noOfUsers}
                        />
                      </div>
                    </div> */}
                    <div className="flex-col flex m-4 ">
                      <p className="text-sm sm:text-base mt-[.8rem] font-normal text-white">
                        Tournament Description and Rules
                      </p>
                      <div className=" my-4 items-center pt-4 pl-4 border-[#595959] bg-[#141414] border-solid border rounded-lg flex">
                        <textarea
                          className="r border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
                          placeholder="Enter Description"
                          rows={4}
                          value={tournamentRules}
                          onChange={onRuleChange}
                        />
                      </div>
                    </div>
                    <div className="mt-4 mx-4 lg:mx-0 mb-4 flex justify-center items-center">
                      <button
                        onClick={() => {
                          testFunction()
                          addTournament()
                        }}
                        className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[15rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3"
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
                          <p className="font-semibold">Create Tournament</p>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CreateTournament
