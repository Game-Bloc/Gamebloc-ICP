import React, { useState } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import { useGameblocHooks } from "../../../src/Functions/gameblocHooks"
import { useCountdown } from "../utils/CountDown"

interface Props {
  data: any
  owner: any
  principal: any
  players: any
  handleLoginModal: () => void
  setOpenPaymentModal: (argo: boolean) => void
  count: number
}

const TourneyButton = ({
  data,
  owner,
  principal,
  players,
  handleLoginModal,
  setOpenPaymentModal,
  count,
}: Props) => {
  const [color, setColor] = useState("#ffffff")
  const { isLoading } = useGameblocHooks()
  const [days, hours, minutes, seconds] = useCountdown(count)

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  }

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {Object.keys(data.status)[0].toUpperCase() === "GAMECOMPLETED" ? (
        <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-[#f55d2f] rounded-md items-center sm:py-2">
          <p className="font-semibold">Ended</p>
        </button>
      ) : days == 0 && hours == 0 && minutes == 0 && seconds == 0 ? (
        <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-[#FFA500] rounded-md items-center sm:py-2">
          <p className="font-semibold">In progress</p>
        </button>
      ) : (
        <>
          {(Object.keys(data.tournament_type)[0].toUpperCase() == "PREPAID" &&
            data.creator == owner) ||
          (Object.keys(data.tournament_type)[0].toUpperCase() == "BLITZKRIEG" &&
            data.creator == owner) ? (
            <div></div>
          ) : data.users.some((index: any) => index.includes(owner)) ||
            data.squad.some((players: any) =>
              players.members.some((gamer: any) => gamer.name.includes(owner)),
            ) ? (
            days == 0 && hours == 0 && minutes == 0 && seconds == 0 ? (
              <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-[#FFA500] rounded-md items-center sm:py-2">
                <p className="font-semibold">In progress</p>
              </button>
            ) : principal !== "" &&
              players.map((squad: any) => squad.captain)[0] === owner &&
              data.game_type.toUpperCase() !== "SINGLE" ? (
              <button
                onClick={() => {
                  setOpenPaymentModal(true)
                }}
                className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[18rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-2"
              >
                <p className="font-semibold">Add more squad players</p>
              </button>
            ) : players !== "" ? (
              <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-[#63aa88] rounded-md items-center sm:py-2">
                <p className="font-semibold">Joined</p>
              </button>
            ) : (
              <button
                onClick={() => handleLoginModal()}
                className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center sm:py-2"
              >
                <p className="font-semibold">Login to Join</p>
              </button>
            )
          ) : (
            <button
              onClick={
                principal !== ""
                  ? () => {
                      setOpenPaymentModal(true)
                    }
                  : () => handleLoginModal()
              }
              className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[18rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-2"
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
                <p className="font-semibold">
                  {data.game_type.toUpperCase() === "SINGLE" ||
                  data.game_type.toUpperCase() === "TEAMVTEAM"
                    ? "Join Solo Tournament"
                    : "Join Tournament with Squad"}
                </p>
              )}
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default TourneyButton
