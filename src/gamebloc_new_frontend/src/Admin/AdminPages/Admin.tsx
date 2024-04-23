import Swal from "sweetalert2"
import React, { useEffect, useState } from "react"
import withReactContent from "sweetalert2-react-content"
import AdminSidebar from "../AdminComps/AdminSidebar"
import AdminTabBar from "../AdminComps/AdminTabBar"
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
  const { updateTournament } = useUpdateTournament()
  const tournament = useAppSelector((state) => state.tournamentData)
  const { fetchAllTournaments } = useFetchAllTournaments()
  const [totalUsers, setTotalUsers] = useState<String>("")
  const { isAdmin, isLoading, getPlayers } = useGameblocHooks()
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
    const adminName = localStorage.getItem("Username")
    console.log("username", adminName)
    const authState = isAdmin(
      adminName,
      "you are logged in",
      "/admin-dashboard",
    )
    console.log("is admin:", authState)
    if (!authState) {
      navigate("/admin-login")
    }
    if (authState) {
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
              <div className="ml-[17rem]">
                <h1 className="text-primary-second font-[600] mt-4  text-[2rem]">
                  Dashboard
                </h1>

                <div className="flex flex-col w-full mt-[2.5rem]">
                  <h2 className="text-white mb-[1.5rem] text-semibold text-[1.5rem]">
                    Overview
                  </h2>
                  <div className="grid grid-cols-3 gap-4 2xl:grid-cols-4 2xl:gap-8">
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
                    <h2 className="text-white mb-[2rem] text-semibold text-[1.7rem]">
                      Game Analysis
                    </h2>
                    <div className="flex gap-16">
                      <AdminChart />
                      <div className="bg-[#070C12] p-8 rounded-lg">
                        <p className="text-white/70 font-[Open Sans] mb-[2rem] text-[.8rem]">
                          Game Type
                        </p>
                        <AdminDonutChart />

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
                            10
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
                            5
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
