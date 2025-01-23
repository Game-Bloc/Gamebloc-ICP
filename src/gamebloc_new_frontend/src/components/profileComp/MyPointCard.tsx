import React, { useEffect, useState } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import { useAppSelector } from "../../redux/hooks"
import { Hexagon, TiledHexagons } from "tiled-hexagons"
import hooks from "../../Functions/hooks"
import { Principal } from "@dfinity/principal"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const MyPointCard = () => {
  const {
    claimToday,
    claimloading,
    getMyPoints,
    getMyStreakCount,
    getStreakTime,
  } = hooks()
  const [color, setColor] = useState("#ffffff")
  const point = useAppSelector((state) => state.dailyStreak.point)
  const streak = useAppSelector((state) => state.dailyStreak.streak)
  const time = useAppSelector((state) => state.dailyStreak.time)
  const principal = useAppSelector((state) => state.userProfile.principal_id)
  const _principal = Principal.fromText(principal)
  const [countdown, setCountdown] = useState("00:00:00")

  useEffect(() => {
    getMyPoints(_principal)
    getMyStreakCount()
    getStreakTime()
  }, [streak, point])

  const calculateCountdown = (timestampNs: number): string => {
    const currentTime = Date.now()
    const timestampMs = timestampNs / 1e6
    const targetTime = timestampMs + 24 * 60 * 60 * 1000

    const remainingTimeMs = targetTime - currentTime

    if (remainingTimeMs <= 0) {
      return "00:00:00"
    }

    const hours = Math.floor(remainingTimeMs / (1000 * 60 * 60))
    const minutes = Math.floor(
      (remainingTimeMs % (1000 * 60 * 60)) / (1000 * 60),
    )
    const seconds = Math.floor((remainingTimeMs % (1000 * 60)) / 1000)

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )}:${String(seconds).padStart(2, "0")}`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(time))
    }, 1000)

    return () => clearInterval(interval)
  }, [time])

  return (
    <div className="flex flex-col w-full sm:w-fit justify-center items-center    mt-8 bg-[#030C15]  p-4 rounded-[1.6rem]">
      <div className="flex flex-col">
        <h2 className="text-white text-center text-bold text-base my-4 sm:text-[1.5rem]  w-full">
          Game Points
        </h2>
        <div className="flex justify-center items-center">
          <Hexagon
            text={`${point}`}
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
              Next claim in {countdown}
            </p>
          </div>
        </div>
        <div className=" flex justify-center items-center w-full">
          <button
            onClick={() =>
              claimToday("Claimed", "Error claiming daily point", "")
            }
            className={`justify-center h-[2rem] w-fit px-6 text-[.6rem] sm:text-base ${
              countdown !== "00:00:00"
                ? "bg-[#6E6E6E] cursor-not-allowed text-[#fff]/40"
                : "bg-primary-second hover:bg-primary-light"
            } text-black mt-[0.8rem] sm:mt-[1.5rem] flex rounded-[12px] items-center py-3`}
            disabled={countdown !== "00:00:00"}
          >
            <div className="text-[0.65rem] font-bold sm:text-[.85rem]">
              {claimloading ? (
                <div className="flex items-center gap-2">
                  <p className="text-[0.65rem] mr-2 font-bold sm:text-[.85rem]">
                    Wait
                  </p>
                  <ClipLoader
                    color={color}
                    loading={claimloading}
                    cssOverride={override}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                "Claim"
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyPointCard
