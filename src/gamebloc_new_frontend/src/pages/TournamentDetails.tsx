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
import { LocalStorage } from "@dfinity/auth-client"
const gameImage = require("../../assets/category1.svg").default

const TournamentDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)
  const [isImageLoaded, setImageLoaded] = useState(false)
  const tournamentData = useAppSelector((state) => state.tournamentData)
  const { updating, updateTournament } = useUpdateTournament()

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Info`,
      children: tournamentData
        .filter((list: any) => list.id_hash == id)
        .map((data: any) => <TournamentInfo key={data.id_hash} data={data} />),
    },
    {
      key: "2",
      label: `Rules `,
      children: tournamentData
        .filter((list: any) => list.id_hash == id)
        .map((data: any) => <Rules key={data.id_hash} data={data} />),
    },
    {
      key: "3",
      label: `Players`,
      children: tournamentData
        .filter((list: any) => list.id_hash == id)
        .map((data: any) => <Players key={data.id_hash} data={data} />),
    },
    {
      key: "4",
      label: `Chat`,
      children: tournamentData
        .filter((list: any) => list.id_hash == id)
        .map((data: any) => <Chat key={data.id_hash} data={data} />),
    },
  ]

  const onChange = (key: string) => {
    console.log(key)
  }

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageLoaded(true)
    }
    img.src = gameImage
  }, [gameImage])

  useEffect(() => {
    updateTournament()
  }, [])

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
                  <p className="text-primary-second ml-2 text-[0.8rem]">Back</p>
                </div>
                {tournamentData
                  .filter((list: any) => list.id_hash == id)
                  .map((data: any) => (
                    <div
                      key={data.id_hash}
                      className="flex flex-col lg:flex-row "
                    >
                      <div className=" w-full lg:w-[50%] mt-4 sm:mt-8 lg:mx-4 flex flex-col">
                        <div className="flex w-full justify-center items-center">
                          {isImageLoaded && (
                            <div className="relative border-solid border border-[#2E3438] w-fit rounded-[0.625rem]">
                              <img
                                src={
                                  //   id == "1"
                                  //     ? `category1.svg`
                                  //     : id == "2"
                                  //     ? `category2.svg`
                                  //     : id == "3"
                                  //     ? `category3.svg`
                                  //     : id == "4"
                                  //     ? `category4.svg`
                                  //                                           :
                                  // `category1.svg`
                                  gameImage
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
                                    data.tournament_type,
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
                          <div className="flex flex-col my-[.9rem] mx-4 ">
                            <p className=" text-[0.7rem] font-semibold sm:text-base  text-white ">
                              {data.title}
                            </p>
                            <div className="flex mt-[6px]  items-center flex-row">
                              <img
                                src={`check-yellow.png`}
                                alt=""
                                className=" w-[.5rem] flex h-[.5rem]  m-0"
                              />

                              <p className="ml-1 text-white text-[.6rem] ">
                                {data.creator}
                              </p>
                            </div>
                          </div>
                          <div className="my-4 border border-solid border-[#2E3438] w-full" />

                          <div className="px-4 pb-4 flex flex-col">
                            <p className=" text-[0.8rem] font-semibold sm:text-base  text-white ">
                              {" "}
                              {data.game}
                            </p>
                            <div className="flex gap-4 flex-wrap w-full mt-[8px]">
                              <div className="flex justify-between items-center rounded-[9999px] pt-[0.1rem] px-[.75rem] pb-[0.1rem] sm:px-[1.2rem] sm:pb-[0.4rem] sm:pt-[.3rem]  bg-gradient-to-r from-[#2A2D31] to-[#272A2F] border-none">
                                <img
                                  src={`img1.svg`}
                                  className="m-0 w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] "
                                  alt=""
                                />
                                <p className=" text-white ml-2 sm:ml-4 text-[0.5rem] sm:text-[0.8rem] cursor-pointer font-medium">
                                  Battle Royale: {data.game_type}
                                </p>
                              </div>
                              <div className="flex justify-between items-center rounded-[9999px] pt-[0.1rem] px-[.75rem] pb-[0.1rem] sm:px-[1.2rem] sm:pb-[0.4rem] sm:pt-[.3rem]  bg-gradient-to-r from-[#2A2D31] to-[#272A2F] border-none">
                                <img
                                  src={`img2.svg`}
                                  className="m-0 w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] "
                                  alt=""
                                />
                                <p className=" text-white ml-2 sm:ml-4 text-[0.5rem] sm:text-[0.8rem] cursor-pointer font-medium">
                                  {data.no_of_winners} Winners
                                </p>
                              </div>
                              <div className="flex justify-between items-center rounded-[9999px] pt-[0.1rem] px-[.75rem] pb-[0.1rem] sm:px-[1.2rem] sm:pb-[0.4rem] sm:pt-[.3rem]  bg-gradient-to-r from-[#2A2D31] to-[#272A2F] border-none">
                                <img
                                  src={`img3.svg`}
                                  className="m-0 w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] "
                                  alt=""
                                />
                                <p className=" text-white ml-2 sm:ml-4 text-[0.5rem] sm:text-[0.8rem] cursor-pointer font-medium">
                                  {data.no_of_participants} Team Slots
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
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default TournamentDetail
