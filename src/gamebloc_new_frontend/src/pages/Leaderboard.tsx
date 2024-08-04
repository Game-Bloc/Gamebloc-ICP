import React, { useEffect } from "react"
import Sidebar from "../components/dashboardComps/Sidebar"
import Header from "../components/Header/Header"
import { useGameblocHooks } from "../Functions/gameblocHooks"

const Leaderboard = () => {
  const { get_leaderboard, isLoading } = useGameblocHooks()

  useEffect(() => {
    get_leaderboard()
  }, [])
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
                <h1 className="text-primary-second font-bold mt-4 text-base md:text-[1.5rem] 2xl:text-[2rem]">
                  Leaderboard
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Leaderboard
