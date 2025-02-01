import React, { useEffect } from "react"
import Sidebar from "../components/dashboardComps/Sidebar"
import Header from "../components/Header/Header"
import { IoIosArrowRoundBack } from "react-icons/io"
import { useNavigate, useParams } from "react-router-dom"
import InfoCard from "../components/wager/infoCard"
import GamerCard from "../components/wager/GamerCard"
import SquadViewCard from "../components/wager/SquadViewCard"
import { useAppSelector } from "../redux/hooks"
import hooks from "../Functions/hooks"

const Wager = () => {
  const { id } = useParams()
  const { getAllWager } = hooks()
  const navigate = useNavigate()
  const tournamentData = useAppSelector((state) => state.tournamentData)
  const tourData =
    tournamentData?.filter((tour: any) => tour?.id_hash === id) || []
  const currentTournament = tourData.length > 0 ? tourData[0] : null
  const game_type = currentTournament.game_type.toUpperCase()

  useEffect(() => {
    getAllWager(id)
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
                <InfoCard data={currentTournament} />
                <h4 className="text-white font-[600] text-[0.9rem] mt-4 py-4">
                  Bet on your favourite{" "}
                  {`${game_type === "SINGLE" ? "player" : "Squad"}`}
                </h4>
                {/* Players/Squad Section */}
                <div className="">
                  {currentTournament.game_type.toUpperCase() === "SINGLE" ? (
                    currentTournament.users.length === 0 ? (
                      <div className="w-full flex justify-center mt-[3rem]">
                        <div className="flex flex-col mb-4 ">
                          <img src={`empty.svg`} alt="" />
                          <p className="text-white text-[.8rem] mt-8 text-center">
                            No player has joined this tournament.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid mt-4 gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {currentTournament.user_details.map((list, index) => (
                          <div>
                            <GamerCard
                              key={index}
                              list={list}
                              data={currentTournament}
                            />
                          </div>
                        ))}
                      </div>
                    )
                  ) : currentTournament.squad.length == 0 ? (
                    <div className="w-full flex justify-center mt-[3rem]">
                      <div className="flex flex-col mb-4 ">
                        <img src={`empty.svg`} alt="" />
                        <p className="text-white text-[.8rem] mt-8 text-center">
                          No Squad has joined this tournament.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid mt-4 gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                      {currentTournament.squad.map((list) => (
                        <div>
                          <GamerCard
                            key={list.id_hash}
                            list={list}
                            data={currentTournament}
                          />
                        </div>
                      ))}
                    </div>
                  )}
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
