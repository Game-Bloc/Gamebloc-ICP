import React, { useState } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import { useAppSelector } from "../../redux/hooks"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { useParams } from "react-router-dom"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { useAuth } from "../../Auth/use-auth-client"
import LoginModal2 from "../Modals/LoginModal2"
import parse from "html-react-parser"
import JoinAsSolo from "../Modals/JoinAsSolo"
import JoinAsSquad from "../Modals/JoinAsSquad"
import { hasDateReached } from "../utils/utills"
interface Props {
  data: any
}

const Rules = ({ data }: Props) => {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const principal = useAppSelector((state) => state.userProfile.principal_id)
  const [color, setColor] = useState("#ffffff")
  const MySwal = withReactContent(Swal)
  const owner = useAppSelector((state) => state.userProfile.username)
  const gamerName = useAppSelector((state) => state.userProfile.username)
  const { isLoading, joinTournament, joinTournamentSqaud } = useGameblocHooks()
  const squad_data = useAppSelector((state) => state.squad)
  const squad_id = useAppSelector((state) => state.userProfile.squad_badge)
  const squad = useAppSelector((state) => state.squad)
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
  const [openSoloModal, setOpenSoloModal] = useState<boolean>(false)
  const [openSquadModal, setOpenSquadModal] = useState<boolean>(false)

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

  const handleSoloModal = () => {
    setOpenSoloModal(!openSoloModal)
  }

  const handleSquadModal = () => {
    setOpenSquadModal(!openSquadModal)
  }

  return (
    <div className="">
      <div className="flex flex-col mx-4 max-h-[27rem] h-[25rem]  overflow-x-hidden overflow-y-scroll">
        <div
          className="ProseMirror text-white"
          dangerouslySetInnerHTML={{ __html: data.tournament_rules }}
        />
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        {Object.keys(data.tournament_type)[0].toUpperCase() == "PREPAID" &&
        data.creator == owner ? (
          <div></div>
        ) : data.users.some((index: any) => index.includes(owner)) ||
          data.squad.some((players: any) =>
            players.members.some((gamer: any) => gamer.name.includes(owner)),
          ) ? (
          hasDateReached(data.end_date) ? (
            <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-[#f55d2f] rounded-md items-center sm:py-2">
              <p className="font-semibold">Ended</p>
            </button>
          ) : (
            <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-[#63aa88] rounded-md items-center sm:py-2">
              <p className="font-semibold">Joined</p>
            </button>
          )
        ) : hasDateReached(data.end_date) ? (
          <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-[#f55d2f]  rounded-md items-center sm:py-2">
            <p className="font-semibold">Ended</p>
          </button>
        ) : (
          <button
            onClick={
              isAuthenticated
                ? () => {
                    data.game_type.toUpperCase() === "SINGLE"
                      ? setOpenSoloModal(true)
                      : setOpenSquadModal(true)
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
                {data.game_type.toUpperCase() === "SINGLE"
                  ? "Join Solo Tournament"
                  : "Join Tournament with Squad"}
              </p>
            )}
          </button>
        )}
      </div>
      {openLoginModal && <LoginModal2 modal={handleLoginModal} />}
      {openSoloModal && (
        <JoinAsSolo
          modal={handleSoloModal}
          owner={owner}
          userId={principal}
          id={id}
        />
      )}
      {openSquadModal && (
        <JoinAsSquad
          modal={handleSquadModal}
          squad_id={squad_id}
          id={id}
          squad={squad}
          data={data}
        />
      )}
    </div>
  )
}

export default Rules
