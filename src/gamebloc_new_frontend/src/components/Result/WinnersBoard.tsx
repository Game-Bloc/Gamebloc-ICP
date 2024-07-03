import React from "react"
import GoldCard from "./GoldCard"
import SliverCard from "./SliverCard"
import BronzeCard from "./BronzeCard"

const WinnersBoard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 xl:gap-8 justify-center items-center  rounded-[0.625rem] h-[20rem] w-full mt-8  p-4">
      <GoldCard />
      <SliverCard />
      <BronzeCard />
    </div>
  )
}

export default WinnersBoard
