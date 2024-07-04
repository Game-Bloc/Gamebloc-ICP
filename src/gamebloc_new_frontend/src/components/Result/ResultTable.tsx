import React from "react"
import Table_1 from "./Table_1"
import { useAppSelector } from "../../redux/hooks"
import { useParams } from "react-router-dom"

const ResultTable = () => {
  const { id } = useParams()
  const data = useAppSelector((state) => state.tournamentData)
  const tourData = data
    .filter((tour: any) => tour.id_hash === id)
    .map((list: any) => list)
  const _point = tourData[0].points.length === 0
  const _squad_point = tourData[0].squad_points.length === 0

  return (
    <div className="mt-8">
      <h1 className="text-white font-[600] text-[1.4rem] mb-4">Results</h1>
      <Table_1 tourData={tourData} />
    </div>
  )
}

export default ResultTable
