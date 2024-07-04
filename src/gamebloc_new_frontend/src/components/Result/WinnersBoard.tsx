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

  const playerResult = tourData.flatMap((state) =>
    state.points.flatMap((innerArray) =>
      innerArray.map(([name, id, pointsObject]) => ({
        id,
        name: name,
        principal: id.substring(0, 3) + "......" + id.substring(60, 64),
        killPoints: pointsObject.kill_points,
        totalPoints: pointsObject.total_points,
        positionPoints: pointsObject.position_points,
      })),
    ),
  )

  const squadResult = tourData.flatMap((state) =>
    state.squad_points.flatMap((innerArray) =>
      innerArray.map(([squad_name, id, pointsObject]) => ({
        id,
        name: squad_name,
        squad_id: id.substring(0, 3) + "......" + id.substring(23, 26),
        killPoints: pointsObject.kill_points,
        totalPoints: pointsObject.total_points,
        positionPoints: pointsObject.position_points,
      })),
    ),
  )

  const sortedResult2 = squadResult.sort(
    (a, b) => b.totalPoints - a.totalPoints,
  )
  const sortedResult = playerResult.sort(
    (a, b) => b.totalPoints - a.totalPoints,
  )

  const sortedPlayersResult = sortedResult.map((item, index) => ({
    ...item,
    position: index + 1,
  }))

  const sortedSquadResult = sortedResult2.map((item, index) => ({
    ...item,
    position: index + 1,
  }))

  console.log("tour-", tourData)

  return (
    <>
      {tourData[0].no_of_winners === 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 xl:gap-8 justify-center items-center  rounded-[0.625rem] w-full  p-4">
          <GoldCard
            tourData={tourData[0]}
            no_winner={tourData[0].no_of_winners}
            sortedPlayersResult={sortedPlayersResult}
            sortedSquadResult={sortedSquadResult}
          />
        </div>
      ) : tourData[0].no_of_winners === 2 ? (
        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 xl:gap-8 justify-center items-center  rounded-[0.625rem] w-full  p-4">
          <GoldCard
            tourData={tourData[0]}
            no_winner={tourData[0].no_of_winners}
            sortedPlayersResult={sortedPlayersResult}
            sortedSquadResult={sortedSquadResult}
          />
          <SliverCard
            tourData={tourData[0]}
            no_winner={tourData[0].no_of_winners}
            sortedPlayersResult={sortedPlayersResult}
            sortedSquadResult={sortedSquadResult}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 xl:gap-8 justify-center items-center  rounded-[0.625rem] w-full  p-4">
          <GoldCard
            tourData={tourData[0]}
            no_winner={tourData[0].no_of_winners}
            sortedPlayersResult={sortedPlayersResult}
            sortedSquadResult={sortedSquadResult}
          />
          <SliverCard
            tourData={tourData[0]}
            no_winner={tourData[0].no_of_winners}
            sortedPlayersResult={sortedPlayersResult}
            sortedSquadResult={sortedSquadResult}
          />
          <BronzeCard
            tourData={tourData[0]}
            no_winner={tourData[0].no_of_winners}
            sortedPlayersResult={sortedPlayersResult}
            sortedSquadResult={sortedSquadResult}
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
