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
          <div className="m-4 ">
            <div className="ml-[17rem]">
              <div className="mt-[4rem]">
                <h1 className="text-primary-second font-[600]  text-[2rem]">
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
