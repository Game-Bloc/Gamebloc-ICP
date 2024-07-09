import React from "react"
import Table_1 from "./Table_1"
import { useAppSelector } from "../../redux/hooks"
import { useParams } from "react-router-dom"
import Table_2 from "./Table_2"

const ResultTable = () => {
  const { id } = useParams()
  const data = useAppSelector((state) => state.tournamentData)
  const tourData = data
    .filter((tour: any) => tour.id_hash === id)
    .map((list: any) => list)
  const game_type = tourData[0].game_type.toUpperCase() === "SINGLE"
  console.log("Single", game_type)

  return (
    <div className="mt-8">
      <h1 className="text-white font-[600] text-[1.4rem] mb-4">Results</h1>
      {game_type ? (
        <Table_1 tourData={tourData} />
      ) : (
        <div className="">
          <Table_2 tourData={tourData} />

          <div className="mt-8">
            <Table_1 tourData={tourData} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultTable
