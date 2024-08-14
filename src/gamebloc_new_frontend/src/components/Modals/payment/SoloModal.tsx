import React, { useState } from "react"
import { useGameblocHooks } from "../../../Functions/gameblocHooks"
import ClipLoader from "react-spinners/ClipLoader"
import { errorPopUp } from "../../../components/utils/ErrorModal"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

interface Props {
  owner: string
  id: string
  userId: string
  done: boolean
  setActive: any
  isLoading: boolean
  joinSolo: (
    owner: any,
    id: any,
    userId: any,
    playerIgn: any,
    success: string,
    error: string,
    route: string,
  ) => void
}

const SoloModal = ({
  owner,
  id,
  userId,
  isLoading,
  done,
  setActive,
  joinSolo,
}: Props) => {
  const [color, setColor] = useState("#ffffff")
  const [playerIgn, setPlayerIgn] = useState<string>("")
  // const { isLoading, joinTournament } = useGameblocHooks()

  const onIgnChange = (event: any) => {
    const input = event.target.value
    setPlayerIgn(input)
  }

  const joinAsSoloPlayer = () => {
    if (playerIgn.trim() !== "") {
      joinSolo(
        owner,
        id,
        userId,
        playerIgn,
        "You have successfully joined this tournament",
        "Something went wrong try again",
        "",
      )
    } else {
      errorPopUp("Ign is empty !")
    }
  }

  return (
    <div className="">
      <div className="flex  flex-col">
        <h2 className="text-primary-second text-center text-base  mb-4 ">
          Codm In Game Name
        </h2>
        <div className="flex-col flex mt-4 ">
          <p className="text-[.8rem] sm:text-base mt-[.8rem] font-normal text-white">
            Your IGN
          </p>
          <div className=" my-4 items-center w-full pr-8 h-[2.7rem] pl-[0.5rem] border-[#595959] bg-[#141414] border-solid border rounded-lg flex">
            <input
              className="border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
              placeholder="In game name"
              type="text"
              value={playerIgn}
              onChange={onIgnChange}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full mt-4 justify-center items-center">
        <button
          onClick={() =>
            done === true ? setActive("third") : joinAsSoloPlayer()
          }
          className="pt-1 pb-[.15rem] ml-4  px-[1rem]  sm:px-4 text-[.85rem] sm:text-sm text-black justify-center  flex bg-primary-second rounded-md items-center cursor-pointer sm:py-2"
        >
          {isLoading ? (
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
          ) : (
            <p className="font-semibold">
              {done === true ? "Next" : "Join Tournament"}
            </p>
          )}
        </button>
      </div>
    </div>
  )
}

export default SoloModal
