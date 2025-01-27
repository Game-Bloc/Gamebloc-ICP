import React from "react"
import Sidebar from "../components/dashboardComps/Sidebar"
import Header from "../components/Header/Header"
import { IoIosArrowRoundBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import InfoCard from "../components/wager/infoCard"
import GamerCard from "../components/wager/GamerCard"
import SquadViewCard from "../components/wager/SquadViewCard"

const Wager = () => {
  const navigate = useNavigate()

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
                <div
                  onClick={() => navigate(-1)}
                  className="flex  items-center cursor-pointer"
                >
                  <IoIosArrowRoundBack className="text-primary-second" />
                  <p className="text-primary-second ml-2 text-[0.8rem]">Back</p>
                </div>
                <h1 className="text-white font-[600] text-[1.4rem] mt-4 py-4">
                  Bet Info
                </h1>
                <InfoCard />
                <h4 className="text-white font-[600] text-[0.9rem] mt-4 py-4">
                  Choose your favourite player
                </h4>
                {/* Players/Squad Section */}
                <div className="grid mt-6 gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {/* <GamerCard /> */}
                  <SquadViewCard />
                  <SquadViewCard />
                  <SquadViewCard />
                  <SquadViewCard />
                  <SquadViewCard />
                  <SquadViewCard />
                  <SquadViewCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Wager
