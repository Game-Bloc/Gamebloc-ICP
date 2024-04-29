import React from "react"
import { DonutChart, Legend } from "@tremor/react"

interface Prop {
  gameMode: any[]
}

const AdminDonutChart = ({ gameMode }: Prop) => {
  const gameType = [
    {
      name: "Battle Royale",
      sales: 10,
    },
    {
      name: "Multiplayer",
      sales: 5,
    },
  ]

  //   const valueFormatter = (number: number) =>
  //     `$ ${Intl.NumberFormat("us").format(number).toString()}`

  return (
    <>
      <div className="flex items-center justify-center space-x-6">
        <DonutChart
          data={gameMode}
          category="sales"
          index="name"
          //   valueFormatter={valueFormatter}
          colors={["red", "blue"]}
          className="w-40"
        />
        {/* <Legend
          categories={["Battle Royale", "Multiplayer"]}
          colors={["blue", "red"]}
          className="max-w-xs"
        /> */}
      </div>
    </>
  )
}

export default AdminDonutChart
