import React from "react"
import AdminHeader from "../AdminComps/AdminHeader"
import AdminSidebar from "../AdminComps/AdminSidebar"
import AdminTabBar from "../AdminComps/AdminTabBar"

const AdminTournamentView = () => {
  return (
    <div className="bg-[#02070E]">
      <section className="flex bg-[#02070E]">
        <AdminHeader />
        <AdminSidebar />
        <div className="flex flex-col w-full">
          <div className="m-4 mt-24">
            <div className="ml-4">
              <div className="mt-[5rem]">
                <h2 className="text-white mb-[2rem] text-semibold text-[1.7rem]">
                  Tournaments
                </h2>
                <div className="">
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
