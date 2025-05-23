import Swal from "sweetalert2"
import React, { useEffect, useState } from "react"
import withReactContent from "sweetalert2-react-content"
import AdminSidebar from "../AdminComps/AdminSidebar"
import hooks from "../../Functions/hooks"
import { useNavigate } from "react-router-dom"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import FallbackLoading from "../../components/Modals/FallBackLoader"
import AdminHeader from "../AdminComps/AdminHeader"
import AdminChart from "../AdminComps/AdminChart"
import AdminDonutChart from "../AdminComps/AdminDonutChart"
import {
  useFetchAllTournaments,
  useUpdateTournament,
} from "../../Functions/blochooks"
import { useAppSelector } from "../../redux/hooks"

const Admin = () => {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)
  const isMod = useAppSelector((state) => state.userProfile.role)
  const { updateTournament } = useUpdateTournament()
  const tournament = useAppSelector((state) => state.tournamentData)
  const { fetchAllTournaments } = useFetchAllTournaments()
  const [totalUsers, setTotalUsers] = useState<String>("")
  const { isAdmin, isLoading, getPlayers, getProfile } = useGameblocHooks()
  const { getAdminTransaction, getAdminAccID } = hooks()

  const ongoingTournnamentCount = tournament.filter(
    (tour: any) =>
      Object.keys(tour.status)[0].toUpperCase() === "GAMEINPROGRESS",
  ).length
  const newTournnamentCount = tournament.filter(
    (tour: any) =>
      Object.keys(tour.status)[0].toUpperCase() === "ACCEPTINGPLAYERS",
  ).length
  const completedTournnamentsCount = tournament.filter(
    (tour: any) =>
      Object.keys(tour.status)[0].toUpperCase() === "GAMECOMPLETED",
  ).length

  useEffect(() => {
    getProfile()
    getAdminAccID()
    getAdminTransaction()
    console.log("is admin:", Object.keys(isMod[0])[0])
    if (Object.keys(isMod[0])[0].toUpperCase() === "PLAYER") {
      navigate("/admin-login")
    }
    if (
      Object.keys(isMod[0])[0].toUpperCase() === "MOD" ||
      Object.keys(isMod[0])[0].toUpperCase() === "TRIBUNALMOD"
    ) {
      if (tournament.length > 0 || null || undefined) {
        updateTournament()
      } else {
        fetchAllTournaments()
      }
      getPlayers()
      const players = sessionStorage.getItem("players")
      setTotalUsers(players)
    }
  }, [])

  const countGamemode = (tournament: any) => {
    const gameMode = {
      BattleRoyale: 0,
      multiplayer: 0,
    }

    tournament.forEach((tour: any) => {
      if (
        tour.game_type.toUpperCase() === "SQUAD" ||
        tour.game_type.toUpperCase() === "DUO"
      ) {
        gameMode.BattleRoyale++
      } else if (tour.game_type.toUpperCase() === "SINGLE") {
        gameMode.multiplayer++
      }
    })

    const result = [
      {
        name: "Battle Royale",
        sales: gameMode.BattleRoyale,
      },
      {
        name: "Multiplayer",
        sales: gameMode.multiplayer,
      },
    ]
    return result
  }

  const gameMode = countGamemode(tournament)

  if (isLoading) {
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
            <div className="m-4 mt-[4rem]">
              <div className="lg:ml-[17rem]">
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-primary-second font-[600] mt-4 text-base lg:text-[2rem]">
                    Dashboard
                  </h1>
                  {/* <button
                    onClick={() => navigate("/dashboard")}
                    className={`justify-center h-[2rem] w-fit px-6 text-[.6rem] sm:text-base ${"bg-primary-second hover:bg-primary-light"} text-black mt-[0.8rem] sm:mt-[1.5rem] flex rounded-[12px] items-center py-3 mr-8`}
                  >
                    <div className="text-[0.65rem] font-bold sm:text-[.85rem]">
                      Homepage
                    </div>
                  </button> */}
                </div>

                <div className="flex flex-col w-full mt-[2.5rem]">
                  <h2 className="text-white mb-[1.5rem] text-semibold text-[0.9rem] lg:text-[1.5rem]">
                    Overview
                  </h2>
                  <div className="grid grid-flow-col-1 lg:grid-cols-3 gap-4 2xl:grid-cols-4 2xl:gap-8">
                    <div className="border flex justify-between   bg-[#070C12] rounded-2xl p-[1rem] w-[18rem] h-[7rem] ">
                      <div className="flex flex-col  items-start">
                        <p className="text-white font-[Open Sans] text-[1rem]">
                          Ongoing Tournaments
                        </p>
                        <div className="flex mt-[1rem]   items-center">
                          <img src={`ad1.png`} className="m-0 h-8 w-8" alt="" />
                          <p className="text-white ml-4 text-[1.5rem]">
                            {ongoingTournnamentCount}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border flex justify-between   bg-[#070C12] rounded-2xl p-[1rem] w-[18rem] h-[7rem] ">
                      <div className="flex flex-col  items-start">
                        <p className="text-white font-[Open Sans] text-[1rem]">
                          Completed Tournaments
                        </p>
                        <div className="flex mt-[1rem]   items-center">
                          <img src={`ad2.png`} className="m-0 h-8 w-8" alt="" />
                          <p className="text-white ml-4 text-[1.5rem]">
                            {completedTournnamentsCount}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border flex justify-between   bg-[#070C12] rounded-2xl p-[1rem] w-[18rem] h-[7rem] ">
                      <div className="flex flex-col  items-start">
                        <p className="text-white font-[Open Sans] text-[1rem]">
                          New Tournaments
                        </p>
                        <div className="flex mt-[1rem]   items-center">
                          <img src={`ad3.png`} className="m-0 h-8 w-8" alt="" />
                          <p className="text-white ml-4 text-[1.5rem]">
                            {newTournnamentCount}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border flex justify-between   bg-[#070C12] rounded-2xl p-[1rem] w-[18rem] h-[7rem] ">
                      <div className="flex flex-col  items-start">
                        <p className="text-white font-[Open Sans] text-[1rem]">
                          Total Players
                        </p>
                        <div className="flex mt-[1rem]   items-center">
                          <img src={`ad4.png`} className="m-0 h-8 w-8" alt="" />
                          <p className="text-white ml-4 text-[1.5rem]">
                            {totalUsers}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-[5rem]">
                    <h2 className="text-white mb-[2rem] text-semibold text-base lg:text-[1.7rem]">
                      Game Analysis
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-16">
                      <AdminChart tournament={tournament} />
                      <div className="bg-[#070C12] p-8 rounded-lg">
                        <p className="text-white/70 font-[Open Sans] mb-[2rem] text-[.8rem]">
                          Game Type
                        </p>
                        <AdminDonutChart gameMode={gameMode} />

                        <div className=" mt-4 flex justify-between items-center">
                          <p className="text-white/50 font-[Open Sans] text-[.75rem]">
                            Game Mode
                          </p>
                          <p className="text-white/50 font-[Open Sans] text-[.75rem]">
                            Users
                          </p>
                        </div>
                        <div className=" mb-[.8rem] border border-white/20 border-t-[1px] border-solid " />
                        <div className=" flex justify-between items-center ">
                          <div className="flex items-center ">
                            <div className="w-[.5rem] h-[.5rem] bg-[#EF4344] rounded-full " />
                            <p className="text-white/70 font-[Open Sans] ml-2 text-[.75rem]">
                              Battle Royale
                            </p>
                          </div>
                          <p className="text-white/70 font-[Open Sans] ml-2 text-[.75rem]">
                            {gameMode[0].sales}
                          </p>
                        </div>
                        <div className=" mt-2 flex justify-between items-center ">
                          <div className="flex items-center ">
                            <div className="w-[.5rem] h-[.5rem] bg-[#3B82F6] rounded-full " />
                            <p className="text-white/70 font-[Open Sans] ml-2 text-[.75rem]">
                              Multiplayer
                            </p>
                          </div>
                          <p className="text-white/70 font-[Open Sans] ml-2 text-[.75rem]">
                            {gameMode[1].sales}
                          </p>
                        </div>
                      </div>
                    </div>
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

export default Admin
