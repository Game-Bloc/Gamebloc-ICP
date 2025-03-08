import React, { useEffect } from "react"
import Sidebar from "../components/dashboardComps/Sidebar"
import Header from "../components/Header/Header"
import { useGameblocHooks } from "../Functions/gameblocHooks"
import FallbackLoading from "../components/Modals/FallBackLoader"
import { ConfigProvider, Table, theme } from "antd"
import { useAppSelector } from "../redux/hooks"

const Leaderboard = () => {
  const { get_leaderboard, updating } = useGameblocHooks()
  const leaderboard = useAppSelector((state) => state.leaderboard)

  useEffect(() => {
    get_leaderboard()
  }, [])

  const sortedBoard = [...leaderboard]?.sort((a, b) => b?.point - a?.point)
  const board = sortedBoard.map((players, index) => {
    return { ...players, position: index + 1 }
  })
  // console.log("Leaderboard", board)

  const columns = [
    {
      title: "Rank",
      dataIndex: "position",
      key: "position",
    },
    { title: "Username", dataIndex: "name", key: "name" },

    // {
    //   title: "Wins",
    //   dataIndex: "wins",
    //   key: "wins",
    // },
    // { title: "Losses", dataIndex: "losses", key: "losses" },
    { title: "Points", dataIndex: "point", key: "point" },
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
            className="flex flex-col
           w-full"
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

                  <div className="mt-[3rem]">
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
                        dataSource={board}
                        // scroll={{ x: true }}
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
