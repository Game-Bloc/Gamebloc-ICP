import React, { useEffect, useState } from "react"
import AdminHeader from "../AdminComps/AdminHeader"
import AdminSidebar from "../AdminComps/AdminSidebar"
import { PiPowerBold } from "react-icons/pi"
import { GiMoneyStack } from "react-icons/gi"
import { ConfigProvider, Select, theme } from "antd"
import { FiSearch } from "react-icons/fi"
import { IoGrid } from "react-icons/io5"
import TournamentGridView from "../AdminComps/TournamentGridView"
import TournamentListView from "../AdminComps/TournamentListView"
import { useParams } from "react-router-dom"
import AssignPointsModal from "../AdminModals/AssignPointsModal"
import {
  formatDate,
  formatDate2,
  squadCount,
} from "../../components/utils/utills"
import { useGetAllSquad, useUpdateAllSquad } from "../../Functions/blochooks"
import { useAppSelector } from "../../redux/hooks"

interface DataType {
  position: React.Key
  ign: string
  name: string
  position_points: number
  kill_points: number
  total_points: number
}

const AdminViewTournamentDetails = () => {
  const { id } = useParams()
  const data = useAppSelector((state) => state.tournamentData)
  const [active, setActive] = useState<number>(1)
  const [search, setSearch] = useState<string>("")
  const [players, setPlayers] = useState<any[]>([])
  const { updateAllSquads } = useUpdateAllSquad()
  const squad_data = useAppSelector((state) => state.squad)
  const { noData, updating, getAllSquads } = useGetAllSquad()
  const [selectedRow, setSelectedRow] = useState<DataType | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  useEffect(() => {
    if (squad_data.length > 0) {
      updateAllSquads()
    } else {
      getAllSquads()
    }
    const tournament = data.find((tour: any) => tour.id_hash === id)
    if (!tournament) {
      console.log("Tournament not found")
      return
    }
    const game_type = data
      .filter((tour: any) => tour.id_hash === id)
      .map((tour) => Object.keys(tour.game_type)[0].toUpperCase() === "SINGLE")
    console.log("single", game_type[0])

    if (game_type[0] === true) {
      const structuredSquads = tournament.in_game_names.flatMap(
        (squad: any) => {
          return squad.map(([principalId, inGameName]: [string, string]) => {
            return { principalId, inGameName }
          })
        },
      )
      setPlayers(structuredSquads)
    } else {
      const structuredSquads = tournament.squad_in_game_names.flatMap(
        (squad: any) => {
          return squad
            .map((player: any) => {
              return player.map(
                ([principalId, inGameName]: [string, string]) => {
                  return { principalId, inGameName }
                },
              )
            })
            .flat()
        },
      )
      setPlayers(structuredSquads)
    }
  }, [])

  console.log("players", players)
  const dataSearch = data.filter((obj) => {
    return Object.keys(obj).some((key) =>
      obj[key]
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase()),
    )
  })
  const columns = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    { title: "IGN", dataIndex: "ign", key: "ign" },
    { title: "Username", dataIndex: "name", key: "name" },
    {
      title: "Position Points",
      dataIndex: "position_points",
      key: "position_points",
    },
    { title: "Kill Points", dataIndex: "kill_points", key: "kill_points" },
    { title: "Total Points", dataIndex: "total_points", key: "total_points" },
    {
      title: "",
      key: "operation",
      render: (text, record) => (
        <div key={record.position} className="flex items-center cursor-pointer">
          <img
            // onClick={() => {
            //   handleOpenModal(record)
            // }}
            src={`view.png`}
            alt=""
          />
          <img src={`delete-red.png`} className="ml-3 cursor-pointer" alt="" />
        </div>
      ),
    },
  ]
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const handleDelete = () => {
    const newData = data.filter(
      (item) => !selectedRowKeys.includes(item.position),
    )
    // setData(newData)
    setSelectedRowKeys([])
  }

  const onSearchChange = (event: any) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  const onDropDownChange = (value: string) => {
    setSearch(value)
  }

  return (
    <div className="bg-[#02070E]">
      <section className="flex bg-[#02070E]">
        <AdminHeader />
        <AdminSidebar />
        <div className="flex flex-col w-full">
          <div className="m-4 ">
            <div className="ml-[17rem]">
              <div className="mt-[4rem]">
                <h1 className="text-primary-second font-[600] text-[2rem]">
                  Tournaments
                </h1>
                {data
                  .filter((tour: any) => tour.id_hash === id)
                  .map((list: any) => (
                    <div key={list.id_hash} className="mt-8">
                      <div className="flex bg-[#070C12] p-4 flex-row justify-between items-start  w-full">
                        <div className="flex flex-col">
                          <div className="flex gap-4">
                            <img
                              src={`reloaded.svg`}
                              alt=""
                              className="w-[6.75rem] h-[6.375rem] m-0"
                            />
                            <div className="flex flex-col ">
                              <p className="text-[1.2rem]  font-semibold text-white">
                                {list.title}
                              </p>
                              <p className="text-[0.9rem] mb-[.7rem] text-[#E49A83]">
                                {list.creator}
                              </p>
                              <div className="flex gap-4">
                                <div className="flex px-[12px] justify-center items-center bg-[#297FFF]/15 w-fit">
                                  <p className="text-[.7rem] text-[#ABCCFF]">
                                    {Object.keys(list.tournament_type)[0]}
                                  </p>
                                </div>
                                <div className="flex px-[12px] justify-center items-center bg-[#297FFF]/15 w-fit">
                                  <p className="text-[.7rem] text-[#ABCCFF]">
                                    {Object.keys(list.game_type)[0]}
                                  </p>
                                </div>
                                <div className="flex px-[12px] justify-center items-center bg-[#297FFF]/15 w-fit">
                                  <p className="text-[.7rem] text-[#ABCCFF]">
                                    Battle Royale
                                  </p>
                                </div>
                                <div className="flex px-[12px] justify-center items-center bg-[#297FFF]/15 w-fit">
                                  <p className="text-[.7rem] text-[#ABCCFF]">
                                    {list.no_of_participants} Slots
                                  </p>
                                </div>
                                <div className="flex px-[12px] justify-center items-center bg-[#297FFF]/15 w-fit">
                                  <p className="text-[.7rem] text-[#ABCCFF]">
                                    {list.no_of_winners} Winners
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-4 mt-[.7rem]">
                                <p className="text-[.8rem] text-[#E4E4E4] leading-[21px] font-[100]">
                                  {" "}
                                  Start: {formatDate(list.starting_date)}
                                </p>
                                <p className="text-[.8rem] text-[#E4E4E4] leading-[21px] font-[100]">
                                  Ends: {formatDate2(list.end_date)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className=" mt-[1rem] flex gap-4">
                            <div className="flex bg-[#297FFF]/15 h-[4rem] w-fit">
                              <div className="bg-[#ABCCFF] h-[4rem] w-[.3rem]" />
                              <div className="flex justify-center items-center px-4 ">
                                <div className="flex flex-col">
                                  <p className="text-[.8rem] text-white font-semibold">
                                    Registration
                                  </p>
                                  <p className="text-[1rem] text-[#ABCCFF] mt-[.2rem] font-normal">
                                    {Object.keys(
                                      list.tournament_type,
                                    )[0].toUpperCase() == "CROWDFUNDED"
                                      ? `$${list.entry_prize}`
                                      : "Free"}
                                  </p>
                                </div>
                                <div className="flex ml-[2rem] flex-col">
                                  <p className="text-[.8rem] text-white font-semibold">
                                    {" "}
                                    Prize
                                  </p>
                                  <p className="text-[1rem] text-[#ABCCFF] mt-[.2rem] font-normal">
                                    {Object.keys(
                                      list.tournament_type,
                                    )[0].toUpperCase() === "CROWDFUNDED" &&
                                    Object.keys(
                                      list.game_type,
                                    )[0].toUpperCase() === "SINGLE"
                                      ? `$${
                                          list.entry_prize * list.users.length
                                        }`
                                      : Object.keys(
                                          list.tournament_type,
                                        )[0].toUpperCase() == "CROWDFUNDED" &&
                                        Object.keys(
                                          list.game_type,
                                        )[0].toUpperCase() === "DUO"
                                      ? `$${
                                          list.entry_prize * squadCount(list)
                                        }`
                                      : Object.keys(
                                          list.tournament_type,
                                        )[0].toUpperCase() == "CROWDFUNDED" &&
                                        Object.keys(
                                          list.game_type,
                                        )[0].toUpperCase() === "SQUAD"
                                      ? `$${
                                          list.entry_prize * squadCount(list)
                                        }`
                                      : `$${list.total_prize}`}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex  h-[4rem] bg-[#297FFF]/15 w-fit">
                              <div className="bg-[#ABCCFF] h-[4rem] w-[.3rem]" />
                              <div className="flex justify-center items-center px-4 ">
                                <div className="flex flex-col">
                                  <p className="text-[.8rem] text-white font-semibold">
                                    Players
                                  </p>
                                  <p className="text-[1rem] text-[#ABCCFF] mt-[.2rem] font-normal">
                                    {Object.keys(
                                      list.game_type,
                                    )[0].toUpperCase() === "SINGLE"
                                      ? `${list.users.length}`
                                      : `${squadCount(list)}`}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Row */}
                        <div className="flex h-[12rem] flex-col">
                          <div className="w-full flex justify-end">
                            <div className=" w-fit flex justify-end gap-4 items-center py-[.1rem] px-3 border border-[#BCBCBC] border-solid rounded-[6px]">
                              <img
                                src={`ongoing-status.png`}
                                className="m-0"
                                alt=""
                              />
                              <p className="text-[#BCBCBC] text-[.8rem]">
                                Ongoing
                              </p>
                            </div>
                          </div>

                          <div className="flex h-full items-end">
                            <div className="flex justify-between  gap-4 items-center ">
                              <button className="bg-[#303B9C] flex justify-center items-center rounded-[7px] py-[.5rem] px-[1rem] h-[2.5rem] cursor-pointer">
                                <GiMoneyStack className="text-white text-[1.5rem]" />
                                <p className="ml-[.4rem]  text-white text-[.8rem]">
                                  {" "}
                                  Pay
                                </p>
                              </button>
                              <button className="bg-[#BB1E10] flex justify-center items-center rounded-[7px] py-[.5rem] px-[1rem] h-[2.5rem] cursor-pointer">
                                <PiPowerBold className="text-white text-[1.5rem] rotate-180" />
                                <p className="ml-[.4rem] text-white text-[.8rem]">
                                  {" "}
                                  End
                                </p>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-8 bg-[#070C12] p-4 flex-col ">
                        <div className="flex mx-8 justify-between items-center">
                          <div className="flex items-center">
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
                                className="mr-[2rem]"
                                placeholder="Lobby"
                                optionFilterProp="children"
                                //   filterOption={filterOption}
                                //   onChange={onDropDownChange}
                                style={{ width: "fit-content" }}
                                options={[
                                  {
                                    value: "Lobby A",
                                    label: "Lobby A",
                                  },
                                  {
                                    value: "Lobby B",
                                    label: "Lobby B",
                                  },
                                ]}
                              />
                            </ConfigProvider>

                            <div className=" flex items-center bg-[#141414] rounded-[6px]  border-solid border-[1px] border-[#4f4f4f] hover:border-primary-second ">
                              <FiSearch className="text-[#4f4f4f] text-[1rem] ml-2" />
                              <input
                                onChange={onSearchChange}
                                className="bg-[#141414] ml-2 h-[2rem] text-white rounded-[6px] placeholder:text-[#4f4f4f] placeholder:text-[.85rem] text-[.85rem]  focus:outline-none border-none focus:border-[transparent]  focus:ring-[transparent]"
                                placeholder="search"
                              />
                            </div>
                            <div className="flex gap-4 ml-4">
                              {" "}
                              <img
                                onClick={() => setActive(1)}
                                src={
                                  active === 1
                                    ? `bi_list-clicked.png`
                                    : `bi_list.png`
                                }
                                className="cursor-pointer w-[2rem] h-[2rem]"
                                alt=""
                              />
                              <img
                                onClick={() => setActive(2)}
                                src={
                                  active === 2 ? `grid-clicked.png` : `grid.png`
                                }
                                className="cursor-pointer w-[2rem] h-[2rem]"
                                alt=""
                              />
                            </div>
                          </div>

                          <div className="flex justify-center items-center ">
                            <button className="bg-[#303B9C] py-2 px-3 flex justify-around items-center mr-[2rem] ">
                              <p className="text-[.85rem] text-white">
                                Save Changes
                              </p>
                            </button>
                            <button
                              onClick={handleDelete}
                              disabled={selectedRowKeys.length === 0}
                              className=" hover:border-primary-second border-primary-second/50 border border-solid rounded-[3px] h-[2.3rem] w-[2.5rem] p-2 flex justify-around items-center cursor-pointer"
                            >
                              <img src={`delete.png`} className="m-0" alt="" />
                            </button>
                          </div>
                        </div>
                        <div className="my-8 border border-solid border-[#2E3438] w-full" />
                        {active === 1 ? (
                          <TournamentGridView players={players} />
                        ) : (
                          <TournamentListView
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSearch={dataSearch}
                          />
                        )}
                      </div>
                      {/*  */}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminViewTournamentDetails
