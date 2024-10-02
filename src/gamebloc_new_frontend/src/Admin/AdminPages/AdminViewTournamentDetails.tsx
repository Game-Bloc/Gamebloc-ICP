import React, { useEffect, useState } from "react"
import AdminHeader from "../AdminComps/AdminHeader"
import AdminSidebar from "../AdminComps/AdminSidebar"
import { PiPowerBold } from "react-icons/pi"
import { GiMoneyStack } from "react-icons/gi"
import { ConfigProvider, Select, TabsProps, theme } from "antd"
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
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { useUpdateTournament } from "../../Functions/blochooks"
import { useFetchAllTournaments } from "../../Functions/blochooks"
import { Principal } from "@dfinity/principal"
import ClipLoader from "react-spinners/ClipLoader"
import Results from "../AdminComps/Results"
import SquadListView from "../AdminComps/SquadListView"
import SquadResult from "../AdminComps/SquadResult"
import FallbackLoading from "../../components/Modals/FallBackLoader"
import Modal from "../../components/Modals/Modal"
import WinnersBoard from "../../components/Result/WinnersBoard"
import TableLogic from "../AdminComps/TableLogic"
import TribunalsTable from "../AdminComps/TribunalsTable"
import TribunalBar from "../AdminComps/TribunalBar"

interface DataType {
  position: React.Key
  ign: string
  name: string
  position_points: number
  kill_points: number
  total_points: number
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

interface Points {
  position_points: number
  kill_points: number
  total_points: number
}

const AdminViewTournamentDetails = () => {
  const { id } = useParams()
  const {
    assign_solo_point,
    assign_squad_point,
    isAssigningPoints,
    isLoading,
    updating,
    isEnding,
    end_tournament,
    end_blitzkrieg_tournament,
    archive_tournament,
  } = useGameblocHooks()
  const { updateTournament } = useUpdateTournament()
  const { fetchAllTournaments, loading } = useFetchAllTournaments()
  const tournament = useAppSelector((state) => state.tournamentData)
  const data = useAppSelector((state) => state.tournamentData)
  const principal_id_text = useAppSelector(
    (state) => state.userProfile.principal_id,
  )
  const _principal = Principal.fromText(principal_id_text)
  const [color, setColor] = useState("#ffffff")
  const [active, setActive] = useState<number>(1)
  const [search, setSearch] = useState<string>("")
  const [players, setPlayers] = useState<any[]>([])
  const { updateAllSquads } = useUpdateAllSquad()
  const isMod = useAppSelector((state) => state.userProfile.role)
  const squad_data = useAppSelector((state) => state.squad)
  const { noData, getAllSquads } = useGetAllSquad()
  const [selectedRow, setSelectedRow] = useState<DataType | null>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [endModal, setEndModal] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [playerPoints, setPlayerPoints] = useState<[string, string, Points][]>(
    [],
  )
  const [squadPoints, setSquadPoints] = useState<[string, string, Points][]>([])
  const [winners, setWinners] = useState<{ position; amount; user_account }[]>(
    [],
  )

  const tourData = data
    .filter((tour: any) => tour.id_hash === id)
    .map((list: any) => list)
  const condition = isMod[0].TribunalMod
  const tribunal =
    condition === undefined || null
      ? Object.keys(isMod[0])[0]
      : Object.keys(isMod[0].TribunalMod)[0]

  // console.log("tribunal type", tribunal === "Mod1")
  const solo_mode =
    tribunal === "Mod1"
      ? "points_vector_mod_1"
      : tribunal === "Mod2"
      ? "points_vector_mod_2"
      : tribunal === "Mod_3"
      ? "points_vector_mod_3"
      : "points"
  const squad_mode =
    tribunal === "Mod1"
      ? "squad_vector_mod_1"
      : tribunal === "Mod2"
      ? "squad_vector_mod_2"
      : tribunal === "Mod_3"
      ? "squad_vector_mod_3"
      : "squad_points"

  const _point = tourData[0]?.[solo_mode].length === 0
  const _squad_point = tourData[0]?.[squad_mode].length === 0
  const no_of_winners = tourData[0].no_of_winners

  const game_type = data
    .filter((tour: any) => tour.id_hash === id)
    .map((tour) => tour.game_type.toUpperCase() === "SINGLE")

  useEffect(() => {
    if (tournament.length > 0 || null || undefined) {
      updateTournament()
    } else {
      fetchAllTournaments()
    }
  }, [])

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
      .map((tour) => tour.game_type.toUpperCase() === "SINGLE")
    // console.log("single", game_type[0])

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
                ([username, principalId, inGameName]: [
                  string,
                  string,
                  string,
                ]) => {
                  return { username, principalId, inGameName }
                },
              )
            })
            .flat()
        },
      )
      setPlayers(structuredSquads)
    }
  }, [])

  // console.log("playersPoints", playerPoints)
  // console.log("squadPoints", squadPoints)

  const dataSearch = data.filter((obj) => {
    // Check if any key matches the search term
    const keyMatches = Object.keys(obj).some((key) =>
      key.toLowerCase().includes(search.toLowerCase()),
    )

    // Check if any value matches the search term
    const valueMatches = Object.values(obj).some((value) => {
      if (typeof value === "object" && value !== null) {
        // If the value is an object (nested object), check its keys
        return Object.keys(value).some((nestedKey) =>
          nestedKey.toLowerCase().includes(search.toLowerCase()),
        )
      } else {
        // Otherwise, convert the value to string and perform case-insensitive search
        return value.toString().toLowerCase().includes(search.toLowerCase())
      }
    })

    return keyMatches || valueMatches
  })
  const columns = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    { title: "Username", dataIndex: "name", key: "name" },
    { title: "IGN", dataIndex: "ign", key: "ign" },
    { title: "Principal", dataIndex: "principal", key: "principal" },
    {
      title: "Position Points",
      dataIndex: "position_points",
      key: "position_points",
    },
    { title: "Kill Points", dataIndex: "kill_points", key: "kill_points" },
    { title: "Total Points", dataIndex: "total_points", key: "total_points" },
  ]

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
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

  const handleArchiveModal = () => {
    setOpenModal(!openModal)
  }

  const handleEndModal = () => {
    setEndModal(!endModal)
  }

  const archive = () => {
    archive_tournament(
      id,
      "Archived Successfully.",
      "Error, try again.",
      "/admin-tournament-view",
    )
  }

  // console.log(
  //   "test",
  //   Object.keys(tourData[0].tournament_type)[0].toUpperCase() === "CROWDFUNDED",
  // )

  const squadCount2 = () => {
    let totalCount = 0
    tourData[0]?.squad?.forEach(
      (player: any) => (totalCount += player?.members?.length),
    )
    return totalCount
  }

  const _winners = () => {
    if (no_of_winners === 1) {
      const amount =
        Object.keys(tourData[0].tournament_type)[0].toUpperCase() ===
          "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "SINGLE"
          ? `${(tourData[0].entry_prize * tourData[0]?.users?.length).toFixed(
              2,
            )}`
          : Object.keys(tourData[0].tournament_type)[0].toUpperCase() ==
              "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "DUO"
          ? `${(tourData[0].entry_prize * squadCount2()).toFixed(2)}`
          : Object.keys(tourData[0].tournament_type)[0].toUpperCase() ==
              "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "SQUAD"
          ? `${(tourData[0].entry_prize * squadCount2()).toFixed(2)}`
          : `${tourData[0].total_prize.toFixed(2)}`
      // console.log("Amount", +amount)
      // console.log(
      //   "tour_type",
      //   Object.keys(tourData[0].tournament_type)[0].toUpperCase(),
      // )
      // console.log("game_type", tourData[0].game_type.toUpperCase())
      // console.log(
      //   "duo amount",
      //   (tourData[0].entry_prize * squadCount2()).toFixed(2),
      // )
      setWinners([
        {
          position: "1",
          amount: Math.round(+amount),
          user_account: "",
        },
      ])
    } else if (no_of_winners === 2) {
      const amount1 =
        Object.keys(tourData[0].tournament_type)[0].toUpperCase() ===
          "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "SINGLE"
          ? `${(
              tourData[0].entry_prize *
              tourData[0]?.users?.length *
              0.6
            ).toFixed(2)}`
          : Object.keys(tourData[0].tournament_type)[0].toUpperCase() ==
              "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "DUO"
          ? `${(tourData[0].entry_prize * squadCount2() * 0.6).toFixed(2)}`
          : Object.keys(tourData[0].tournament_type)[0].toUpperCase() ==
              "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "SQUAD"
          ? `${(tourData[0].entry_prize * squadCount2() * 0.6).toFixed(2)}`
          : `${(tourData[0].total_prize * 0.6).toFixed(2)}`
      const amount2 =
        Object.keys(tourData[0].tournament_type)[0].toUpperCase() ===
          "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "SINGLE"
          ? `${(
              tourData[0].entry_prize *
              tourData[0]?.users?.length *
              0.4
            ).toFixed(2)}`
          : Object.keys(tourData[0].tournament_type)[0].toUpperCase() ==
              "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "DUO"
          ? `${(tourData[0].entry_prize * squadCount2() * 0.4).toFixed(2)}`
          : Object.keys(tourData[0].tournament_type)[0].toUpperCase() ==
              "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "SQUAD"
          ? `${(tourData[0].entry_prize * squadCount2() * 0.4).toFixed(2)}`
          : `${(tourData[0].total_prize * 0.4).toFixed(2)}`
      // console.log(
      //   "amount",
      //   amount2,
      // )
      setWinners([
        {
          position: "1",
          amount: Math.round(+amount1),
          user_account: "",
        },
        {
          position: "2",
          amount: Math.round(+amount2),
          user_account: "",
        },
      ])
    } else {
      const amount1 =
        Object.keys(tourData[0].tournament_type)[0].toUpperCase() ===
          "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "SINGLE"
          ? `${(
              tourData[0].entry_prize *
              tourData[0]?.users?.length *
              0.5
            ).toFixed(2)}`
          : Object.keys(tourData[0].tournament_type)[0].toUpperCase() ==
              "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "DUO"
          ? `${(tourData[0].entry_prize * squadCount2() * 0.5).toFixed(2)}`
          : Object.keys(tourData[0].tournament_type)[0].toUpperCase() ==
              "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "SQUAD"
          ? `${(tourData[0].entry_prize * squadCount2() * 0.5).toFixed(2)}`
          : `${(tourData[0].total_prize * 0.5).toFixed(2)}`
      const amount2 =
        Object.keys(tourData[0].tournament_type)[0].toUpperCase() ===
          "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "SINGLE"
          ? `${(
              tourData[0].entry_prize *
              tourData[0]?.users?.length *
              0.3
            ).toFixed(2)}`
          : Object.keys(tourData[0].tournament_type)[0].toUpperCase() ==
              "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "DUO"
          ? `${(tourData[0].entry_prize * squadCount2() * 0.3).toFixed(2)}`
          : Object.keys(tourData[0].tournament_type)[0].toUpperCase() ==
              "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "SQUAD"
          ? `${(tourData[0].entry_prize * squadCount2() * 0.3).toFixed(2)}`
          : `${(tourData[0].total_prize * 0.3).toFixed(2)}`

      const amount3 =
        Object.keys(tourData[0].tournament_type)[0].toUpperCase() ===
          "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "SINGLE"
          ? `${(
              tourData[0].entry_prize *
              tourData[0]?.users?.length *
              0.2
            ).toFixed(2)}`
          : Object.keys(tourData[0].tournament_type)[0].toUpperCase() ==
              "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "DUO"
          ? `${(tourData[0].entry_prize * squadCount2() * 0.2).toFixed(2)}`
          : Object.keys(tourData[0].tournament_type)[0].toUpperCase() ==
              "CROWDFUNDED" && tourData[0].game_type.toUpperCase() === "SQUAD"
          ? `${(tourData[0].entry_prize * squadCount2() * 0.2).toFixed(2)}`
          : `${(tourData[0].total_prize * 0.2).toFixed(2)}`

      setWinners([
        {
          position: "1",
          amount: Math.round(+amount1),
          user_account: "",
        },
        {
          position: "2",
          amount: Math.round(+amount2),
          user_account: "",
        },
        {
          position: "3",
          amount: Math.round(+amount3),
          user_account: "",
        },
      ])
    }
  }

  useEffect(() => {
    _winners()
  }, [_point])

  const end = () => {
    _winners()
    console.log("winnner struct", winners)
    if (
      Object.keys(tourData[0].tournament_type)[0].toUpperCase() == "BLITZKRIEG"
    ) {
      end_blitzkrieg_tournament(
        id,
        _principal,
        "Blitzkrieg Tournament Ended",
        "Error, try again",
        "",
      )
    } else {
      end_tournament(
        id,
        _principal,
        no_of_winners,
        winners,
        "Tournament Ended successfully",
        "Error, try again",
        "",
      )
    }
  }

  const saveChanges = () => {
    console.log("squad Points", squadPoints)
    console.log("palyers Points", playerPoints)
    {
      game_type[0] === true
        ? assign_solo_point(
            id,
            _principal,
            playerPoints,
            "Players points saved",
            "Error setting players points",
            "",
          )
        : assign_squad_point(
            id,
            _principal,
            playerPoints,
            squadPoints,
            "Players and squads points saved",
            "Error setting points",
            "",
          )
    }
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <FallbackLoading />
      </div>
    )
  } else {
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
                                src={`xbox-pad.jpg`}
                                alt=""
                                className="w-[6.75rem] h-[6.375rem] m-0 object-fill"
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
                                      {list.game_type}
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
                                      {list.no_of_winners}{" "}
                                      {list.no_of_winners > 1
                                        ? "Winners"
                                        : "Winner"}
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
                                      list.game_type.toUpperCase() === "SINGLE"
                                        ? `$${
                                            list.entry_prize * list.users.length
                                          }`
                                        : Object.keys(
                                            list.tournament_type,
                                          )[0].toUpperCase() == "CROWDFUNDED" &&
                                          list.game_type.toUpperCase() === "DUO"
                                        ? `$${
                                            list.entry_prize * squadCount(list)
                                          }`
                                        : Object.keys(
                                            list.tournament_type,
                                          )[0].toUpperCase() == "CROWDFUNDED" &&
                                          list.game_type.toUpperCase() ===
                                            "SQUAD"
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
                                      {list.game_type.toUpperCase() === "SINGLE"
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
                                  src={
                                    Object.keys(
                                      list.status,
                                    )[0].toUpperCase() === "ACCEPTINGPLAYERS"
                                      ? `ongoing-status.png`
                                      : Object.keys(
                                          list.status,
                                        )[0].toUpperCase() === "GAMEINPROGRESS"
                                      ? `ongoing-status.png`
                                      : `ended.png`
                                  }
                                  className="m-0"
                                  alt=""
                                />
                                <p className="text-[#BCBCBC] text-[.8rem]">
                                  {Object.keys(list.status)[0].toUpperCase() ===
                                  "ACCEPTINGPLAYERS"
                                    ? `Ongoing`
                                    : Object.keys(
                                        list.status,
                                      )[0].toUpperCase() === "GAMEINPROGRESS"
                                    ? `Ongoing`
                                    : `Completed`}
                                </p>
                              </div>
                            </div>
                            {Object.keys(isMod[0])[0] === "Mod" && (
                              <div className="flex h-full items-end">
                                <div className="flex justify-between  gap-4 items-center ">
                                  <button
                                    onClick={() => setEndModal(true)}
                                    className="bg-[#BB1E10] flex justify-center items-center rounded-[7px] py-[.5rem] px-[1rem] h-[2.5rem] cursor-pointer"
                                  >
                                    {isEnding ? (
                                      <div className="flex items-center  gap-2">
                                        <p className="text-[0.65rem] mr-2 text-white font-bold sm:text-[.85rem]">
                                          Wait
                                        </p>
                                        <ClipLoader
                                          color={color}
                                          loading={isEnding}
                                          cssOverride={override}
                                          size={10}
                                          aria-label="Loading Spinner"
                                          data-testid="loader"
                                        />
                                      </div>
                                    ) : (
                                      <>
                                        <PiPowerBold className="text-white text-[1.5rem] rotate-180" />
                                        <p className="ml-[.4rem] text-white text-[.8rem]">
                                          {" "}
                                          End Tournament
                                        </p>
                                      </>
                                    )}
                                  </button>
                                  <button
                                    onClick={() => setOpenModal(true)}
                                    className="bg-[#BB1E10] flex justify-center items-center rounded-[7px] py-[.5rem] px-[1rem] h-[2.5rem] cursor-pointer"
                                  >
                                    {updating ? (
                                      <div className="flex items-center  gap-2">
                                        <p className="text-[0.65rem] mr-2 text-white font-bold sm:text-[.85rem]">
                                          Wait
                                        </p>
                                        <ClipLoader
                                          color={color}
                                          loading={updating}
                                          cssOverride={override}
                                          size={10}
                                          aria-label="Loading Spinner"
                                          data-testid="loader"
                                        />
                                      </div>
                                    ) : (
                                      <>
                                        {/* <PiPowerBold className="text-white text-[1.5rem] rotate-180" /> */}
                                        <p className="ml-[.4rem] text-white text-[.8rem]">
                                          {" "}
                                          Archive Tournament
                                        </p>
                                      </>
                                    )}
                                  </button>
                                </div>
                                {/* <div className="flex justify-between  gap-4 items-center ">
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
                            </div> */}
                              </div>
                            )}
                          </div>
                        </div>

                        {Object.keys(list.tournament_type)[0].toUpperCase() !==
                          "BLITZKRIEG" && <WinnersBoard />}

                        {Object.keys(isMod[0])[0] === "Mod" ? (
                          <TribunalBar
                            _point={_point}
                            players={players}
                            setSquadPoints={setSquadPoints}
                            _squad_point={_squad_point}
                            game_type={game_type}
                            saveChanges={saveChanges}
                            isLoading={isLoading}
                            isAssigningPoints={isAssigningPoints}
                            setPlayerPoints={setPlayerPoints}
                            dataSearch={dataSearch}
                            playerPoints={playerPoints}
                            solo_mode={solo_mode}
                            squad_mode={squad_mode}
                            tourData={tourData}
                            rowSelection={rowSelection}
                            columns={columns}
                          />
                        ) : (
                          <TableLogic
                            _point={_point}
                            players={players}
                            setSquadPoints={setSquadPoints}
                            _squad_point={_squad_point}
                            game_type={game_type}
                            saveChanges={saveChanges}
                            isLoading={isLoading}
                            isAssigningPoints={isAssigningPoints}
                            setPlayerPoints={setPlayerPoints}
                            dataSearch={dataSearch}
                            playerPoints={playerPoints}
                            solo_mode={solo_mode}
                            squad_mode={squad_mode}
                            tourData={tourData}
                            rowSelection={rowSelection}
                            columns={columns}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {openModal && (
          <Modal
            modal={handleArchiveModal}
            _function={archive}
            message="Are you Sure you want to archive this tournament?"
          />
        )}
        {endModal && (
          <Modal
            modal={handleEndModal}
            _function={end}
            message="Are you sure you want to end this tournament?"
          />
        )}
      </div>
    )
  }
}

export default AdminViewTournamentDetails
