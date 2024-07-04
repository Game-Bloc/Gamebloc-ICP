import React from "react"
import GoldCard from "./GoldCard"
import SliverCard from "./SliverCard"
import BronzeCard from "./BronzeCard"
import { useAppSelector } from "../../redux/hooks"
import { useUpdateTournament } from "../../Functions/blochooks"
import { useParams } from "react-router-dom"

const WinnersBoard: React.FC = () => {
  const { id } = useParams()
  const tournamentData = useAppSelector((state) => state.tournamentData)
  const { updating, updateTournament } = useUpdateTournament()
  const tourData = tournamentData
    .filter((list: any) => list.id_hash == id)
    .map((data: any) => data)
  console.log("tour-", tourData)

  return (
    <>
      {tourData[0].no_of_winners === 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 xl:gap-8 justify-center items-center  rounded-[0.625rem] w-full mt-8  p-4">
          <GoldCard
            tourData={tourData[0]}
            no_winner={tourData[0].no_of_winners}
          />
        </div>
      ) : tourData[0].no_of_winners === 2 ? (
        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 xl:gap-8 justify-center items-center  rounded-[0.625rem] w-full mt-8  p-4">
          <GoldCard
            tourData={tourData[0]}
            no_winner={tourData[0].no_of_winners}
          />
          <SliverCard
            tourData={tourData[0]}
            no_winner={tourData[0].no_of_winners}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 xl:gap-8 justify-center items-center  rounded-[0.625rem] w-full mt-8  p-4">
          <GoldCard
            tourData={tourData[0]}
            no_winner={tourData[0].no_of_winners}
          />
          <SliverCard
            tourData={tourData[0]}
            no_winner={tourData[0].no_of_winners}
          />
          <BronzeCard
            tourData={tourData[0]}
            no_winner={tourData[0].no_of_winners}
          />
        </div>
      )}

      {/* <GoldCard />
      <SliverCard />
      <BronzeCard /> */}
    </>
  )
}

export default WinnersBoard
