import React, { useEffect, useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import { useAppSelector } from "../../redux/hooks"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { ulid } from "ulid"
import ClipLoader from "react-spinners/ClipLoader"
import { LuMinus, LuPlus } from "react-icons/lu"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

interface Props {
  modal: () => void
  squad: any
  data: any
  squad_id: string
  id: string
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const JoinAsSquad = ({ modal, squad, data, squad_id, id }: Props) => {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const username = useAppSelector((state) => state.userProfile.username)
  const { isLoading, joinTournamentSqaud } = useGameblocHooks()
  const players = squad.filter((player: any) =>
    player.members.some((member: any) => member.name === username),
  )
  const icp_price = useAppSelector((state) => state.IcpBalance.currentICPrice)

  const [color, setColor] = useState("#ffffff")
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([])
  const [playerIGNs, setPlayerIGNs] = useState<[string, string, string][]>([])

  const togglePlayer = (player: any) => {
    const isSelected = selectedPlayers.some((p) => p.name === player.name)
    if (isSelected) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.name !== player.name))
      setPlayerIGNs(playerIGNs.filter((ign) => ign[1] !== player.principal_id))
    } else {
      setSelectedPlayers([...selectedPlayers, player])
      setPlayerIGNs([...playerIGNs, [player.name, player.principal_id, ""]])
    }
  }

  const handlePlayerIGNChange = (principal_id: any, value: string) => {
    setPlayerIGNs((prev) =>
      prev.map((ign) =>
        ign[1] === principal_id ? [ign[0], principal_id, value] : ign,
      ),
    )
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

  const joinTournament = () => {
    // Check if any IGN field is empty
    const isEmptyIGN = playerIGNs.some(([_, __, ign]) => ign.trim() === "")
    if (isEmptyIGN) {
      errorPopUp("Please fill in all the in-game names.")
      return
    }

    // Check the game type and enforce player count limit
    const gameType = data.game_type.toUpperCase()
    let maxPlayersAllowed = 4 // Default to 4 for SQUAD

    if (gameType === "DUO") {
      maxPlayersAllowed = 2
    }

    if (selectedPlayers.length !== maxPlayersAllowed) {
      errorPopUp(`Please select only ${maxPlayersAllowed} players.`)
      return
    }

    console.log("squad_id", squad_id)
    console.log("id", id)
    console.log("igns", playerIGNs)

    // Perform join operation
    joinTournamentSqaud(
      squad_id,
      id,
      playerIGNs,
      "Tournament Joined",
      "Error, try again.",
      "/dashboard",
    )
  }

  // const captain = players.map((squad: any) => squad.captain)[0]
  // console.log("captain", captain)

  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-[#fff]/20  bg-opacity-75 transition-opacity">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full ">
              <div className="relative bg-[#030C15] w-[90%] md:max-w-[70%] border border-solid border-[#595959] rounded-[25px] overflow-hidden">
                <div className="bg-[#030C15] p-[2rem] flex flex-col  ">
                  <RiCloseFill
                    onClick={modal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  />

                  {players.length === 0 ? (
                    <div className="w-full flex justify-center mt-[3rem]">
                      <div className="flex flex-col mb-4 ">
                        <img src={`empty.svg`} alt="" />
                        <p className="text-white text-[.8rem] mt-8 text-center">
                          you need to join a squad before you can participate.
                        </p>
                        <p
                          onClick={() => navigate("/profile")}
                          className="text-primary-second rounded-md pt-1 pb-[.15rem] text-center mt-4 px-[.6rem]  sm:px-4   border border-solid sm:py-2  border-primary-second hover:text-black hover:bg-primary-second  text-[0.85rem] sm:text-sm cursor-pointer"
                        >
                          Join a Squad
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex  flex-col">
                      <div className="flex items-center">
                        <img src={`frame.svg`} className="m-0" alt="" />
                        <div className="flex flex-col ml-4">
                          <h2 className="text-white font-bold text-[.9rem] sm:text-[1.2rem]">
                            {players.map((squad: any) => squad.name)}
                          </h2>
                          <p className="text-white text-[.8rem]">
                            Clan Tag -
                            <span className="text-[#E0DFBA]  text-[.8rem]">
                              {" "}
                              {players.map((squad: any) => squad.tag)}
                            </span>
                          </p>
                          <div className=" px-[3px] rounded-sm flex items-center w-fit  mt-1 bg-primary-second">
                            <img
                              src={`member.png`}
                              className="m-0 w-[.7rem] h-[.7rem]"
                              alt=""
                            />
                            <p className="text-black ml-1 text-[.7rem]">
                              {players.map(
                                (array: any) => array.members.length,
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="my-4 border border-solid border-[#fff]/10 w-full" />
                      <div className="flex flex-wrap gap-4 lg:gap-8 ">
                        {players.map((array: any) =>
                          array.members.map((player: any, index: any) => {
                            return (
                              <div
                                key={index}
                                onClick={() => togglePlayer(player)}
                                className={` ${
                                  selectedPlayers.some(
                                    (p) => p.name === player.name,
                                  )
                                    ? " bg-primary-second  "
                                    : " border border-primary-second border-solid"
                                }  cursor-pointer  h-[2.5rem] rounded-[3px] flex justify-between items-center`}
                              >
                                <p
                                  className={` ${
                                    selectedPlayers.some(
                                      (p) => p.name === player.name,
                                    )
                                      ? "text-black"
                                      : "text-white"
                                  } text-[.9rem]  ml-4 text-ellipsis`}
                                >
                                  {player.name}
                                </p>
                                <div
                                  className={`${
                                    selectedPlayers.some(
                                      (p) => p.name === player.name,
                                    )
                                      ? ""
                                      : "border border-l-primary-second "
                                  } flex justify-center items-center h-full w-[2.5rem] ml-4 `}
                                >
                                  {" "}
                                  {selectedPlayers.some(
                                    (p) => p.name === player.name,
                                  ) ? (
                                    player.name ==
                                    players.map(
                                      (squad: any) => squad.captain,
                                    ) ? (
                                      <img
                                        src={`crown.png`}
                                        className=""
                                        alt=""
                                      />
                                    ) : (
                                      <LuMinus className="text-black  w-4 h-4`" />
                                    )
                                  ) : (
                                    <LuPlus
                                      className={`  text-white  w-4 h-4`}
                                    />
                                  )}
                                </div>
                              </div>
                            )
                          }),
                        )}
                      </div>
                      <div className="my-4 border border-solid border-[#fff]/10 w-full" />
                      <div className="flex-col flex mt-4 ">
                        {playerIGNs.map(([name, principalId, ign], index) => (
                          <div
                            key={index}
                            className="flex w-full flex-col md:flex-row gap-4 lg:gap-8"
                          >
                            <div className="flex w-full flex-col">
                              <p className="text-[.75rem]  mt-[.8rem] font-normal text-white">
                                Player {index + 1}
                              </p>
                              <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
                                <input
                                  className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                                  readOnly
                                  type="text"
                                  value={name || ""}
                                />
                              </div>
                            </div>
                            <div className="flex w-full flex-col">
                              <p className="text-[.75rem]  mt-[.8rem] font-normal text-white">
                                Player {index + 1} IGN
                              </p>
                              <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
                                <input
                                  className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                                  placeholder={`Player ${
                                    index + 1
                                  } in game name`}
                                  type="text"
                                  onChange={(e) =>
                                    handlePlayerIGNChange(
                                      principalId,
                                      e.target.value,
                                    )
                                  }
                                  value={ign}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    {players.length === 0 ? (
                      <></>
                    ) : (
                      <>
                        {data.game_type.toUpperCase() === "DUO" &&
                        selectedPlayers.length < 2 ? (
                          <p className="w-full text-center">
                            You need to add {2 - selectedPlayers.length}{" "}
                            {`${selectedPlayers.length !== 0 ? "more" : ""}`}{" "}
                            players to join this tournament
                          </p>
                        ) : data.game_type.toUpperCase() === "SQUAD" &&
                          selectedPlayers.length < 4 ? (
                          <p className="w-full text-center">
                            You need to add {4 - selectedPlayers.length}{" "}
                            {`${selectedPlayers.length !== 0 ? "more" : ""}`}{" "}
                            players to join this tournament
                          </p>
                        ) : (
                          <div className="flex w-full mt-4 justify-center items-center">
                            <button
                              onClick={
                                players.map(
                                  (squad: any) => squad.captain,
                                )[0] === username
                                  ? () => joinTournament()
                                  : () =>
                                      errorPopUp(
                                        "Only a squad captain can join on your behalf",
                                      )
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
                                <p className="font-semibold">Join Tournament</p>
                              )}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinAsSquad
