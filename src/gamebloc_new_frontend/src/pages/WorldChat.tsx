import React from "react"
import Header from "../components/Header/Header"
import Sidebar from "../components/dashboardComps/Sidebar"

const WorldChat = () => {
  return (
    <div className="">
      <section className="flex gap-6">
        <Header />
        <Sidebar />
        <div className="flex flex-col w-full ">
          <div className="m-4 mt-24 ">
            <h2 className="text-base text-white sm:text-lg my-4">World Chat</h2>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WorldChat
