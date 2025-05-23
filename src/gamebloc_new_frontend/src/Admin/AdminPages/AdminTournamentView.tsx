import React, { useEffect } from "react"
import AdminHeader from "../AdminComps/AdminHeader"
import AdminSidebar from "../AdminComps/AdminSidebar"
import AdminTabBar from "../AdminComps/AdminTabBar"
import {
  useFetchAllTournaments,
  useUpdateTournament,
} from "../../Functions/blochooks"
import { useAppSelector } from "../../redux/hooks"

const AdminTournamentView = () => {
  const { updateTournament } = useUpdateTournament()
  const { fetchAllTournaments, loading } = useFetchAllTournaments()
  const tournament = useAppSelector((state) => state.tournamentData)

  useEffect(() => {
    if (tournament.length > 0 || null || undefined) {
      updateTournament()
    } else {
      fetchAllTournaments()
    }
  }, [])

  return (
    <div className="bg-[#02070E]">
      <section className="flex bg-[#02070E]">
        <AdminHeader />
        <AdminSidebar />
        <div className="flex flex-col w-full">
          <div className="m-4 ">
            <div className="lg:ml-[17rem]">
              <div className="mt-[4rem]">
                <h1 className="text-primary-second font-[600] text-base lg:text-[2rem]">
                  Tournaments
                </h1>
                <div className="mt-8">
                  <AdminTabBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminTournamentView
