import React, { useEffect, useState } from "react"
import Sidebar from "../components/dashboardComps/Sidebar"
import Header from "../components/Header/Header"
import { useGameblocHooks } from "../Functions/gameblocHooks"
import FallbackLoading from "../components/Modals/FallBackLoader"
import { ConfigProvider, Table, theme } from "antd"
import { useAppSelector } from "../redux/hooks"
import { useAuth } from "../Auth/use-auth-client"

const Leaderboard = () => {
  const { isAuthenticated } = useAuth()
  const { get_leaderboard, updating } = useGameblocHooks()
  const leaderboard = useAppSelector((state) => state.leaderboard)
  const point = useAppSelector((state) => state.dailyStreak.point)
  const owner = useAppSelector((state) => state.userProfile.username)
  const [playerPoint, setPoint] = useState("")
  const [playerRank, setRank] = useState("")

  useEffect(() => {
    get_leaderboard()
    console.log("board", leaderboard)
  }, [isAuthenticated])

  const sortedBoard = [...leaderboard]?.sort((a, b) => b?.points - a?.points)
  const board = sortedBoard.map((players, index) => {
    return { ...players, position: index + 1 }
  })

  const top100Board = board.slice(0, 100)

  useEffect(() => {
    const getPlayerStats = (name) => {
      const player = board.find((player) => player.name === name)
      if (player) {
        return {
          rank: player?.position,
          points: player?.points,
        }
      }
      return null
    }
    const playerStats = getPlayerStats(owner)
    setPoint(playerStats?.points)
    setRank(playerStats?.rank)
  }, [])

  // console.log("playerStats", playerStats.rank)

  const columns = [
    {
      title: "Rank",
      dataIndex: "position",
      key: "position",
    },
    { title: "Username", dataIndex: "name", key: "name" },
    { title: "Points", dataIndex: "points", key: "points" },
  ]

  if (updating) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <FallbackLoading />
      </div>
    )
  } else {
    return (
      <div className="">
        <section className="flex">
          <Header />
          <Sidebar />
          <div
            style={{
              backgroundImage: `url(line.png)`,
            }}
            className="flex flex-col
           w-full "
          >
            <div className="m-4 mt-24">
              <div className="">
                <div className=" sm:ml-4 mt-4  flex flex-col ">
                  <div className="flex items-center">
                    <img
                      src={`league.png`}
                      alt=""
                      className="mr-3 w-8 h-8 lg:w-16 lg:h-16"
                    />
                    <h1 className="text-primary-second font-valorant  text-base md:text-[1.5rem] 2xl:text-[2rem]">
                      GAMEBLOC LEAGUE
                    </h1>
                  </div>
                  <div className="flex gap-4 xl:gap-8 mt-8 lg:my-16">
                    <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                      <div className="flex flex-col w-full h-full rounded-md gap-2  bg-primary-first pt-[.5rem] pl-[.5rem]">
                        <h1 className=" text-[1rem] sm:text-[1.3rem] mb-4 font-valorant bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
                          {owner}
                        </h1>
                        <p className=" text-[.8rem]  bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
                          Total points: {point}
                        </p>
                      </div>
                    </div>
                    <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                      <div className="flex flex-col w-full rounded-md  bg-primary-first py-[.5rem] px-[.5rem]">
                        <h1 className=" text-[1rem] sm:text-[1.3rem] mb-4 font-valorant bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
                          CURRENT WEEK
                        </h1>
                        <div className="flex justify-between">
                          <div className="flex flex-col ">
                            <p className="text-[.8rem] font-valorant bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
                              RANK
                            </p>
                            <p className="text-[.8rem] ml-[0.9rem] font-normal bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
                              {playerRank}
                            </p>
                          </div>
                          <div className="flex flex-col ">
                            <p className="text-[.8rem] font-valorant bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
                              POINTS
                            </p>
                            <p className="text-[.8rem] ml-[0.9rem] font-normal bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
                              {playerPoint}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mb-4 lg:mb-0 mt-[3rem] flex justify-center items-center">
                    <div className="w-fit rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                      <div className="flex justify-center items-center  w-full rounded-md  bg-primary-first p-[1rem]">
                        <p className=" text-[1rem]  font-valorant bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text ">
                          THIS WEEK ON GAMEBLOC
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <ConfigProvider
                      theme={{
                        algorithm: theme.defaultAlgorithm,
                        token: {
                          colorBgContainer: "#030C15",
                          colorBorder: "#595959",
                          colorSplit: "#595959",
                          controlItemBgActive: "#f6b8fc86",
                          colorText: "#fff",
                        },
                      }}
                    >
                      <Table
                        // rowSelection={rowSelection}
                        columns={columns}
                        rowClassName={() => "rowClassName1"}
                        dataSource={top100Board}
                        pagination={false}
                        rowKey={"position"}
                      />
                    </ConfigProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Leaderboard
