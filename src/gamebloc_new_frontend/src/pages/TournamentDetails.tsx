import React, { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import Sidebar from "../components/dashboardComps/Sidebar"
import { useNavigate, useParams } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io"
import { Avatar, ConfigProvider, Skeleton, Tabs, TabsProps } from "antd"
import Rules from "../components/tournament/Rules"
import Players from "../components/tournament/Players"
import TournamentInfo from "../components/tournament/TournamentInfo"
import { useAppSelector } from "../redux/hooks"
import FallbackLoading from "../components/Modals/FallBackLoader"
import Chat from "../components/tournament/Chat"
import { DotChartOutlined } from "@ant-design/icons"
import { useUpdateTournament } from "../Functions/blochooks"
import { convertToMilliseconds, inProgress } from "../components/utils/utills"
import { useGameblocHooks } from "../Functions/gameblocHooks"
import { useAuth } from "../Auth/use-auth-client"
import { useCountdown } from "../components/utils/CountDown"
import Wager from "../components/tournament/Wager/Wager"
import WagerModal from "../components/Modals/WagerModal"
const gameImage = require("../../assets/category1.png").default

const TournamentDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [count, setCount] = useState(0)
  const [days, hours, minutes, seconds] = useCountdown(count)
  const [loading, setLoading] = useState<boolean>(true)
  const [isImageLoaded, setImageLoaded] = useState(false)
  const tournamentData = useAppSelector((state) => state.tournamentData)
  const role = useAppSelector((state) => state.userProfile.role)
  const { updating, updateTournament } = useUpdateTournament()
  const { start_tournament } = useGameblocHooks()

  // Safeguard for tournament data filtering
  const tourData =
    tournamentData?.filter((tour: any) => tour?.id_hash === id) || []
  const currentTournament = tourData.length > 0 ? tourData[0] : null

  // Ensure tournament exists and has required properties
  const _point = currentTournament?.points?.length === 0
  const _squad_point = currentTournament?.squad_points?.length === 0

  const status = currentTournament?.status
    ? Object.keys(currentTournament.status)[0].toUpperCase() === "ARCHIVED"
    : false

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Info`,
      children: currentTournament ? (
        <TournamentInfo
          key={currentTournament.id_hash}
          data={currentTournament}
        />
      ) : null,
    },
    {
      key: "2",
      label: `Rules `,
      children: currentTournament ? (
        <Rules key={currentTournament.id_hash} data={currentTournament} />
      ) : null,
    },
    {
      key: "3",
      label: `Players`,
      children: currentTournament ? (
        <Players key={currentTournament.id_hash} data={currentTournament} />
      ) : null,
    },
    {
      key: "4",
      label: `Wager Info`,
      children: currentTournament ? (
        <Wager key={currentTournament.id_hash} data={currentTournament} />
      ) : null,
    },
    {
      key: "5",
      label: `Chat`,
      children: currentTournament ? (
        <Chat key={currentTournament.id_hash} data={currentTournament} />
      ) : null,
    },
  ]

  const onChange = (key: string) => {
    console.log(key)
  }

  useEffect(() => {
    if (currentTournament) {
      const inputDateString = currentTournament.starting_date
      const result = convertToMilliseconds(inputDateString)
      setCount(result)
    }
  }, [currentTournament])

  useEffect(() => {
    const img = new Image()
    img.src = `category1.png` // Using string literal
    img.onload = () => setImageLoaded(true)
  }, [gameImage])

  useEffect(() => {
    updateTournament()
  }, [isAuthenticated])

  if (status) {
    return (
      <div className="">
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full ">
                <div className="relative bg-primary-first w-[90%] md:max-w-[55%]  lg:max-w-[40%] 2xl:max-w-[30%] rounded-[25px] overflow-hidden">
                  <div className="bg-primary-first p-[2rem] flex flex-col justify-center items-center">
                    <div className="">
                      <img
                        src={`gamelogo.png`}
                        className="mt-3rem mb-[.3rem] w-[3rem] h-[3rem]"
                        alt=""
                      />
                    </div>
                    <h1 className="font-valorant mt-4 text-primary-second text-[1.1rem] text-semibold">
                      Archived
                    </h1>
                    <p className="text-[.7rem] lg:text-[.82rem] text-center text-primary-second/80 my-[.2rem]">
                      This tournament has been archived
                    </p>
                    <button
                      onClick={() => navigate(-1)}
                      className="  justify-center  w-full px-6 text-[.6rem] sm:text-base text-black  mt-[0.8rem] sm:mt-[1.5rem] flex bg-primary-second hover:bg-primary-second/70 rounded-[9999px] items-center cursor-pointer py-3"
                    >
                      <p className="text-[0.65rem] font-bold sm:text-[.85rem]">
                        Back
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="">
        {updating ? (
          <div className="w-full h-screen flex justify-center items-center">
            <FallbackLoading />
          </div>
        ) : (
          <section className="flex gap-6">
            <Header />
            <Sidebar />
            <div className="flex flex-col w-full">
              <div className="m-4 mt-24  ">
                <div className="flex flex-col ">
                  <div
                    onClick={() => navigate(-1)}
                    className="flex  items-center cursor-pointer"
                  >
                    <IoIosArrowRoundBack className="text-primary-second" />
                    <p className="text-primary-second ml-2 text-[0.8rem]">
                      Back
                    </p>
                  </div>
                  {currentTournament && (
                    <div
                      key={currentTournament.id_hash}
                      className="flex flex-col lg:flex-row "
                    >
                      <div className=" w-full lg:w-[50%] mt-4 sm:mt-8 lg:mx-4 flex flex-col">
                        <div className="flex w-full justify-center items-center">
                          {isImageLoaded && (
                            <div className="relative border-solid border border-[#2E3438] w-fit rounded-[0.625rem]">
                              <img
                                src={
                                  currentTournament.game.toUpperCase() ===
                                  "CALL OF DUTY MOBILE"
                                    ? `cat1.png`
                                    : currentTournament.game.toUpperCase() ===
                                      "APEX LEGENDS MOBILE"
                                    ? `cat2.png`
                                    : currentTournament.game.toUpperCase() ===
                                      "FORTNITE"
                                    ? `cat3.png`
                                    : currentTournament.game.toUpperCase() ===
                                      "CHESS"
                                    ? `cat4.png`
                                    : `cat1.png`
                                }
                                alt=""
                                className="rounded-[0.625rem]"
                              />

                              <div className="absolute flex top-4 left-4 bg-gradient-to-r justify-between items-center from-[#77536F] to-[#574151] rounded-md sm:rounded-xl py-1 px-2 sm:px-[.5rem] sm:py-[.3rem] ">
                                <img
                                  src={`mdi_crowd.png`}
                                  className="m-0"
                                  alt=""
                                />
                                <p className=" ml-[.5rem]  text-[0.6rem]  sm:text-[.6rem] text-white">
                                  {Object.keys(
                                    currentTournament.tournament_type,
                                  )[0].toUpperCase()}
                                </p>
                              </div>
                              <div className="flex absolute left-4 bottom-4 items-center">
                                <img
                                  src={`windows.png`}
                                  className="w-4 h-4 sm:w-6 sm:h-6"
                                  alt=""
                                />
                                <img
                                  src={`playstation.png`}
                                  className="ml-2 w-4 h-4 sm:w-6 sm:h-6"
                                  alt=""
                                />
                                <img
                                  src={`xbox.png`}
                                  className="ml-2 w-4 h-4 sm:w-6 sm:h-6"
                                  alt=""
                                />
                              </div>
                              <div className="flex absolute right-4 bottom-4 flex-wrap justify-end items-center gap-2 sm:gap-4">
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
                          )}
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
                        </div>
                        <div className="border-solid border mt-8  border-[#2E3438] rounded-[0.625rem]">
                          <div className="flex flex-row justify-between items-center my-[.9rem] mx-4 ">
                            <div className="flex flex-col ">
                              <p className=" text-[0.7rem] font-semibold sm:text-base  text-white ">
                                {currentTournament.title}
                              </p>
                              <div className="flex mt-[6px]  items-center flex-row">
                                <img
                                  src={`check-yellow.png`}
                                  alt=""
                                  className=" w-[.5rem] flex h-[.5rem]  m-0"
                                />

                                <p className="ml-1 text-white text-[.6rem] ">
                                  {currentTournament.creator}
                                </p>
                              </div>
                            </div>
                            {_point && _squad_point ? (
                              <></>
                            ) : !_point && _squad_point ? (
                              <p
                                onClick={() =>
                                  navigate(
                                    `/active-tournament/${currentTournament.id_hash}/view_result`,
                                  )
                                }
                                className="text-primary-second rounded-md pt-1 pb-[.15rem]  px-[.6rem]  sm:px-4   border border-solid sm:py-2  border-primary-second hover:text-black hover:bg-primary-second  text-[0.85rem] sm:text-sm cursor-pointer"
                              >
                                View Result
                              </p>
                            ) : !_squad_point && _point ? (
                              <p
                                onClick={() =>
                                  navigate(
                                    `/active-tournament/${currentTournament.id_hash}/view_result`,
                                  )
                                }
                                className="text-primary-second rounded-md pt-1 pb-[.15rem]  px-[.6rem]  sm:px-4   border border-solid sm:py-2  border-primary-second hover:text-black hover:bg-primary-second  text-[0.85rem] sm:text-sm cursor-pointer"
                              >
                                View Result
                              </p>
                            ) : !_point && !_squad_point ? (
                              <p
                                onClick={() =>
                                  navigate(
                                    `/active-tournament/${currentTournament.id_hash}/view_result`,
                                  )
                                }
                                className="text-primary-second rounded-md pt-1 pb-[.15rem]  px-[.6rem]  sm:px-4   border border-solid sm:py-2  border-primary-second hover:text-black hover:bg-primary-second  text-[0.85rem] sm:text-sm cursor-pointer"
                              >
                                View Result
                              </p>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="my-4 border border-solid border-[#2E3438] w-full" />

                          <div className="px-4 pb-4 flex flex-col">
                            <p className=" text-[0.8rem] font-semibold sm:text-base  text-white ">
                              {" "}
                              {currentTournament.game}
                            </p>
                            <div className="flex gap-4 flex-wrap w-full mt-[8px]">
                              <div className="flex justify-between items-center rounded-[9999px] pt-[0.1rem] px-[.75rem] pb-[0.1rem] sm:px-[1.2rem] sm:pb-[0.4rem] sm:pt-[.3rem]  bg-gradient-to-r from-[#2A2D31] to-[#272A2F] border-none">
                                <img
                                  src={`img1.svg`}
                                  className="m-0 w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] "
                                  alt=""
                                />

                                <p className=" text-white ml-2 sm:ml-4 text-[0.5rem] sm:text-[0.8rem] cursor-pointer font-medium">
                                  Battle Royale: {currentTournament.game_type}
                                </p>
                              </div>
                              {Object.keys(
                                currentTournament.tournament_type,
                              )[0].toUpperCase() !== "BLITZKRIEG" && (
                                <div className="flex justify-between items-center rounded-[9999px] pt-[0.1rem] px-[.75rem] pb-[0.1rem] sm:px-[1.2rem] sm:pb-[0.4rem] sm:pt-[.3rem]  bg-gradient-to-r from-[#2A2D31] to-[#272A2F] border-none">
                                  <img
                                    src={`img2.svg`}
                                    className="m-0 w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] "
                                    alt=""
                                  />
                                  <p className=" text-white ml-2 sm:ml-4 text-[0.5rem] sm:text-[0.8rem] cursor-pointer font-medium">
                                    {currentTournament.no_of_winners}{" "}
                                    {currentTournament.no_of_winners > 1
                                      ? "Winners"
                                      : "Winner"}
                                  </p>
                                </div>
                              )}
                              <div className="flex justify-between items-center rounded-[9999px] pt-[0.1rem] px-[.75rem] pb-[0.1rem] sm:px-[1.2rem] sm:pb-[0.4rem] sm:pt-[.3rem]  bg-gradient-to-r from-[#2A2D31] to-[#272A2F] border-none">
                                <img
                                  src={`img3.svg`}
                                  className="m-0 w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] "
                                  alt=""
                                />
                                <p className=" text-white ml-2 sm:ml-4 text-[0.5rem] sm:text-[0.8rem] cursor-pointer font-medium">
                                  {Object.keys(
                                    currentTournament.tournament_variation,
                                  )[0].toUpperCase() == "INFINITE"
                                    ? "Infinite"
                                    : currentTournament.no_of_participants}{" "}
                                  Team Slots
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-[0.625rem] w-full lg:w-[50%] mt-8 border-solid border-[#2E3438]">
                        <div className="mt-[1.5rem] mx-4 mb-4">
                          <ConfigProvider
                            theme={{
                              token: {
                                colorPrimaryActive: "#F6B8FC",
                                colorPrimary: "#F6B8FC",
                                colorPrimaryHover: "#F6B8FC",
                                colorText: "#fff",
                              },
                            }}
                          >
                            <Tabs
                              defaultActiveKey="1"
                              items={items}
                              onChange={onChange}
                            />
                          </ConfigProvider>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    )
  }
}

export default TournamentDetail
