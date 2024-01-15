import React, { useState } from "react"
import SquadList from "./SquadList"
import ClipLoader from "react-spinners/ClipLoader"
import { useCountdown } from "../utils/CountDown"
import { useAppSelector } from "../../redux/hooks"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { useParams } from "react-router-dom"

interface Props {
  data: any
}

const Players = ({ data }: Props) => {
  const { id } = useParams()
  const [color, setColor] = useState("#ffffff")
  const owner = useAppSelector((state) => state.userProfile.username)
  const gamerName = useAppSelector((state) => state.userProfile.username)
  const { isLoading, joinTournament } = useGameblocHooks()

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  }

  const join = () => {
    joinTournament(
      gamerName,
      id,
      "Tournament Joined",
      "Error, try again.",
      "/dashboard",
    )
  }

  return (
    <div className="">
      <div className="flex flex-col mx-4 max-h-[27rem]  overflow-x-hidden overflow-y-scroll">
        <SquadList />
        <SquadList />
        <SquadList />
        <SquadList />
        <SquadList />
        <SquadList />
        <SquadList />
        <SquadList />
        <SquadList />
        <SquadList />
        <SquadList />
        <SquadList />
        <SquadList />
        <SquadList />
        <SquadList />
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        {data.users.some((index: any) => index.includes(owner)) ? (
          <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-[#63aa88] rounded-md items-center sm:py-2">
            <p className="font-semibold">Joined</p>
          </button>
        ) : (
          <button
            onClick={() => join()}
            className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-2"
          >
            {isLoading ? (
              <ClipLoader
                color={color}
                loading={isLoading}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <p className="font-semibold">Join Tournament</p>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default Players
