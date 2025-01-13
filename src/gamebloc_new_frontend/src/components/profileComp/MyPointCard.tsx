import React, { useState } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import { useAppSelector } from "../../redux/hooks"
import { Hexagon, TiledHexagons } from "tiled-hexagons"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const MyPointCard = () => {
  const [color, setColor] = useState("#ffffff")
  const point = useAppSelector((state) => state.dailyStreak.point)
  const streak = useAppSelector((state) => state.dailyStreak.streak)
  console.log("sssssss", point)
  return (
    <div className="flex flex-col w-full sm:w-fit justify-center items-center    mt-8 bg-[#030C15]  p-4 rounded-[1.6rem]">
      <div className="flex flex-col">
        <h2 className="text-white text-center text-bold text-base my-4 sm:text-[1.5rem]  w-full">
          Game Points
        </h2>
        <div className="flex justify-center items-center">
          <Hexagon
            text={point}
            textStyle={{ fill: "#000000", fontSize: "50px", fontWeight: "700" }}
            sideLength={80}
            borderRadius={12}
            fill="#F6B8FC"
            shadow="#f6b8fcc1"
          />
          <div className="flex flex-col ml-4">
            <p className="text-bold text-[1rem] p-[.65rem] sm:p-[.8rem] sm:text-[1rem]  text-[#ffffff]">
              {streak}-Day check-in 🔥
            </p>
            <p className="text-bold text-[.7rem] p-[.65rem]  sm:text-[.8rem] sm:p-[.8rem] text-[#9B9B9B]">
              Next claim in 13h 36m
            </p>
          </div>
        </div>
        <div className=" flex justify-center items-center w-full">
          <button className="justify-center h-[2rem] w-fit px-6 text-[.6rem] sm:text-base text-black mt-[0.8rem]  sm:mt-[1.5rem] flex bg-primary-second hover:#f6b8fcc1 rounded-[12px] items-center cursor-pointer py-3">
            <p className="text-[0.65rem] font-bold sm:text-[.85rem]">
              {/* {isLoading ? (
              <div className="flex items-center  gap-2">
                <p className="text-[0.65rem] mr-2  font-bold sm:text-[.85rem]">
                  Wait
                </p>
                <ClipLoader
                  color={color}
                  loading={isLoading}
                  cssOverride={override}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : ( */}
              Claim
              {/* )} */}
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyPointCard
