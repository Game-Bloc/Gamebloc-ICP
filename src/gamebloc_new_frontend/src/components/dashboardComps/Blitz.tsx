import React, { useEffect, useState } from "react"
import FallbackLoading from "../Modals/FallBackLoader"
import TournamentCard from "./Recommended/TournamentCard"
import { useFetchAllTournaments } from "../../Functions/blochooks"
import { useAppSelector } from "../../redux/hooks"

const Blitz = () => {
  const [nodata, setNodata] = useState<boolean>(false)
  const tournament = useAppSelector((state) => state.tournamentData)
  const blitzkriegTournament = tournament?.filter((list: any) => {
    return list.tournament_type && list.tournament_type.Blitzkrieg === null
  })
  const { loading } = useFetchAllTournaments()

  const displayTournaments = blitzkriegTournament.map(
    (data: any, index: any) => (
      <TournamentCard data={data} index={index} key={index} />
    ),
  )

  useEffect(() => {
    if (blitzkriegTournament.length === 0) {
      setNodata(true)
    } else {
      setNodata(false)
    }
  }, [blitzkriegTournament])

  if (loading) {
    return (
      <div className="w-full mt-8 h-[10vh] flex justify-center items-center">
        <FallbackLoading />
      </div>
    )
  } else {
    return (
      <div className=" mt-8">
        {nodata ? (
          <></>
        ) : (
          <div className="bg-[#040D17] p-8 rounded-[1.5rem] h-fit w-full flex flex-col">
            <h2 className="font-valorant text-center mb-4 text-sm sm:text-lg md:text-xl text-white">
              BLITZKRIEG TOURNAMENTS
            </h2>

            <div className=" grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {displayTournaments}
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default Blitz
