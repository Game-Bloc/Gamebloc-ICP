import React from "react"
import { Hexagon, TiledHexagons } from "tiled-hexagons"

const MyPointCard = () => {
  return (
    <div className="flex flex-col w-full sm:w-fit justify-center items-center    mt-8 bg-[#030C15]  p-4 rounded-[1.6rem]">
      <div className="flex flex-col">
        <h2 className="text-white text-center text-bold text-base my-4 sm:text-[1.5rem]  w-full">
          Game Points
        </h2>
        <div className="flex justify-center items-center">
          <Hexagon
            text="250 "
            textStyle={{ fill: "#000000", fontSize: "50px", fontWeight: "700" }}
            sideLength={80}
            borderRadius={12}
            fill="#F6B8FC"
            shadow="#f6b8fcc1"
          />
          <div className="flex flex-col ml-4">
            <p className="text-bold text-[1rem] p-[.65rem] sm:p-[.8rem] sm:text-[1rem]  text-[#ffffff]">
              3-Day check-in 🔥
            </p>
            <p className="text-bold text-[.7rem] p-[.65rem]  sm:text-[.8rem] sm:p-[.8rem] text-[#9B9B9B]">
              Next claim in 13h 36m
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPointCard
