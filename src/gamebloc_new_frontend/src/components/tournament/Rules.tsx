import React, { useState } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import { useAppSelector } from "../../redux/hooks"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { useParams } from "react-router-dom"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { useAuth } from "../../Auth/use-auth-client"
import LoginModal2 from "../Modals/LoginModal2"
interface Props {
  data: any
}

const Rules = ({ data }: Props) => {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const [color, setColor] = useState("#ffffff")
  const MySwal = withReactContent(Swal)
  const owner =
    useAppSelector((state) => state.userProfile.username) === ""
      ? sessionStorage.getItem("Username")
      : useAppSelector((state) => state.userProfile.username)
  const gamerName = useAppSelector((state) => state.userProfile.username)
  const { isLoading, joinTournament, joinTournamentSqaud } = useGameblocHooks()
  const squad_data = useAppSelector((state) => state.squad)
  const squad_id = useAppSelector((state) => state.userProfile.squad_badge)
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  }

  const errorPopUp = (errorMsg: string) => {
    MySwal.fire({
      position: "center",
      icon: "error",
      text: errorMsg,
      showConfirmButton: true,
      background: "#01070E",
      color: "#fff",
    })
  }
  const handleLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }

  const join = () => {
    if (squad_data.some((player: any) => player.captain == owner)) {
      joinTournamentSqaud(
        squad_id,
        id,
        "Tournament Joined",
        "Error, try again.",
        "/dashboard",
      )
    } else {
      errorPopUp(
        "Only a squad captain can join a tournament on behalf of a squad.",
      )
    }
  }

  const joinAsSoloPlayer = () => {
    joinTournament(
      owner,
      id,
      "You have successfully joined this tournament",
      "Something went wrong try again",
      "/",
    )
  }

  return (
    <div className="">
      <div className="flex flex-col mx-4 max-h-[27rem] h-[25rem]  overflow-x-hidden overflow-y-scroll">
        <p className="text-white">{data.tournament_rules}</p>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        {Object.keys(data.tournament_type)[0].toUpperCase() == "PREPAID" &&
        data.creator == owner ? (
          <div></div>
        ) : data.users.some((index: any) => index.includes(owner)) ||
          data.squad.some((players: any) =>
            players.members.some((gamer: any) => gamer.name.includes(owner)),
          ) ? (
          <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-[#63aa88] rounded-md items-center sm:py-2">
            <p className="font-semibold">Joined</p>
          </button>
        ) : (
          <button
            onClick={
              isAuthenticated
                ? () => {
                    Object.keys(data.game_type)[0].toUpperCase() === "SINGLE"
                      ? joinAsSoloPlayer()
                      : join()
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
                {" "}
                {Object.keys(data.game_type)[0].toUpperCase() === "SINGLE"
                  ? "Join Solo Tournament"
                  : "Join Tournament with Squad"}
              </p>
            )}
          </button>
        )}
      </div>
      {openLoginModal && <LoginModal2 modal={handleLoginModal} />}
    </div>
  )
}

export default Rules
