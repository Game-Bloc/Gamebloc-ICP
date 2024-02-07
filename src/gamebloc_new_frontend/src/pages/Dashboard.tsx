import * as React from "react"
import { useEffect } from "react"
import Sidebar from "../components/dashboardComps/Sidebar"
import Header from "../components/Header/Header"
import Carousel from "../components/dashboardComps/Carousel/Carousell"
import Recommended from "../components/dashboardComps/Recommended/Recommended"
import FreeRegistration from "../components/dashboardComps/FreeRegistration/FreeRegistration"
import GameblocTournaments from "../components/dashboardComps/Tournament/GameblocTournaments"
import { useGameblocHooks } from "../Functions/gameblocHooks"

const Dashboard = () => {
  const { getProfile, getProfile2 } = useGameblocHooks()

  useEffect(() => {
    getProfile()
    getProfile2()
  }, [])

  return (
    <div className="">
      <section className="flex gap-6">
        <Header />
        <Sidebar />
        <div className="flex flex-col w-full ">
          <div className="m-4 mt-24 ">
            <h2 className="text-base text-white sm:text-lg my-4">
              Featured and Hot
            </h2>
            <Carousel />
            {/* <Recommended /> */}
            <FreeRegistration />
            <GameblocTournaments />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard

{
  /* <div className="">
  <section className="flex">
    <Header />
    <Sidebar />
    <div className="flex flex-col w-full">
      <div className="m-4 mt-24  "></div>
    </div>
  </section>
</div>; */
}
