import React from "react"
import { DonutChart, FunnelChart } from "@tremor/react"
import { useAppSelector } from "../../../redux/hooks"

const Stats = () => {
  const attendance = useAppSelector((state) => state.userProfile.attendance)
  const losses = useAppSelector((state) => state.userProfile.losses)
  const _wins = useAppSelector((state) => state.userProfile.wins)
  const tour_created = useAppSelector(
    (state) => state.userProfile.tournaments_created,
  )

  console.log("attendance", attendance)
  console.log("losses", losses)
  console.log("wins", _wins)
  console.log("tour_created", tour_created)

  const chartdata = [
    {
      name: "Tournament created",
      value:
        tour_created === 0
          ? 0.001
          : tour_created === undefined
          ? 0.001
          : tour_created,
    },
    {
      name: "Tournament joined",
      value:
        attendance === undefined ? 0.3 : attendance === 0 ? 0.3 : attendance,
    },
    {
      name: "Tournament won",
      value: _wins === undefined ? 0.001 : _wins === 0 ? 0.001 : _wins,
    },
    {
      name: "Tournament lost",
      value: losses === undefined ? 0.01 : losses === 0 ? 0.01 : losses,
    },
  ]
  const winRatio = [
    {
      action: "Wins",
      stat: _wins === undefined ? 0.001 : _wins === 0 ? 0.001 : _wins,
    },
    {
      action: "Losses",
      stat: losses === undefined ? 0.5 : losses === 0 ? 0.5 : losses,
    },
  ]

  const total = winRatio.reduce((acc, item) => acc + item.stat, 0)
  const wins = winRatio.find((item) => item.action === "Wins").stat
  const winRate = ((wins / total) * 100).toFixed(2) // Calculate the win rate and format to 2 decimal places
  console.log("Winrate", winRate)

  const valueFormatter = (value) => `${value}%`
  const CustomDonutChart = ({ data, category, index, colors, className }) => {
    return (
      <div className={`relative ${className}`}>
        <DonutChart
          data={data}
          category={category}
          index={index}
          colors={colors}
          showAnimation
          className="relative"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-primary-first text-white p-2 rounded">
            <div className="text-xl font-bold">{valueFormatter(winRate)}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8 h-full w-full">
      <div className="flex md:gap-[15rem] md:px-[1rem] w-full items-center flex-col-reverse md:flex-row ">
        <div className="flex flex-col w-full">
          <p className="text-bold mt-6 md:mt-0 text-center md:text-start text-[1rem] mb-8 sm:text-[1.2rem]">
            Engagement Metrics
          </p>
          <FunnelChart
            className="h-80"
            data={chartdata}
            // onValueChange={(v) => console.log(v)}
            color="stone"
          />
        </div>
        <div className="flex mt-3 md:mt-0 flex-col">
          <p className="text-bold text-center text-[1rem] mb-8 sm:text-[1.2rem]">
            Win Ratio
          </p>
          <CustomDonutChart
            data={winRatio}
            category="stat"
            index="action"
            colors={["stone", "zinc"]}
            className="w-40"
          />
        </div>
      </div>
    </div>
  )
}

export default Stats
