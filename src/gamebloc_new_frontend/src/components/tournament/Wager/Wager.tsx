import React, { useEffect, useState } from "react"
import hooks from "../../../Functions/hooks"
import { useAppSelector } from "../../../redux/hooks"
import { useNavigate } from "react-router-dom"
interface Props {
  data: any
}
const Wager = ({ data }: Props) => {
  const navigate = useNavigate()
  const { updating, reward, activateloading, getUserBet, getExpectedReward } =
    hooks()
  const bet = useAppSelector((state) => state.userWager)
  const game_type = data.game_type.toUpperCase()
  const principal_id = useAppSelector((state) => state.userProfile.principal_id)

  useEffect(() => {
    getUserBet(data.id_hash, principal_id)
    getExpectedReward(data.id_hash, principal_id)
    console.log("_reward", reward)
  }, [])

  return (
    <div className="w-full p-4 ">
      {bet?.player_principal_id === "" ? (
        <div className="w-full flex justify-center mt-[3rem]">
          <div className="flex flex-col mb-4 ">
            <img src={`empty.svg`} alt="" />
            <p className="text-white text-[.8rem] mt-8 text-center">
              You have no active bet.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <h2 className="text-[0.8rem] mb-4 font-semibold sm:text-base  text-white">
            Your stake info
          </h2>
          <div className="flex flex-col">
            <p className="text-[#E0DFBA] text-[.8rem] my-2 sm:text-base text-normal">
              {`${game_type === "SINGLE" ? "player's ID:" : "Squad's ID:"}`}{" "}
              {bet.player_principal_id.substring(0, 7) +
                "......" +
                bet.player_principal_id.substring(58, 64)}
            </p>
            <p className="text-[#E0DFBA] text-[.8rem] my-2 sm:text-base text-normal">
              Amount staked: ${bet.amount}
            </p>
            <p className="text-[#E0DFBA] text-[.8rem] my-2 sm:text-base text-normal">
              Expected reward: ${reward}
            </p>
          </div>
          <div className="w-full flex justify-center items-center mt-4">
            <button
              onClick={() =>
                navigate(`/active-tournament/${data.id_hash}/Wager_account`)
              }
              className="py-2 px-8 bg-primary-second text-[#000] w-full  text-xs sm:text-sm "
            >
              Increase bet
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Wager
