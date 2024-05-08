import React, { useEffect, useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import { useAppSelector } from "../../redux/hooks"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { ulid } from "ulid"
import ClipLoader from "react-spinners/ClipLoader"
import { LuMinus, LuPlus } from "react-icons/lu"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
interface Props {
  modal: () => void
  squad: any
  data: any
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const JoinAsSquad = ({ modal, squad, data }: Props) => {
  const MySwal = withReactContent(Swal)
  const username = sessionStorage.getItem("Username")
  const { isLoading, joinTournamentSqaud } = useGameblocHooks()
  const players = squad.filter((player: any) =>
    player.members.some((member: any) => member.name === username),
  )
  const [color, setColor] = useState("#ffffff")
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([])
  const [playerIGNs, setPlayerIGNs] = useState<[string, string][]>([])

  const togglePlayer = (player: any) => {
    const isSelected = selectedPlayers.some((p) => p.name === player.name)
    if (isSelected) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.name !== player.name))
      setPlayerIGNs(playerIGNs.filter((ign) => ign[0] !== player.principal_id))
    } else {
      setSelectedPlayers([...selectedPlayers, player])
      setPlayerIGNs([...playerIGNs, [player.principal_id, ""]])
    }
  }

  const handlePlayerIGNChange = (principal_id: any, value: string) => {
    setPlayerIGNs((prev) =>
      prev.map((ign) =>
        ign[0] === principal_id ? [principal_id, value] : ign,
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
    const isEmptyIGN = playerIGNs.some(([_, ign]) => ign.trim() === "")
    if (isEmptyIGN) {
      errorPopUp("Please fill in all the in-game names.")
      return
    }

    // Check the game type and enforce player count limit
    const gameType = Object.keys(data.game_type)[0].toUpperCase()
    let maxPlayersAllowed = 4 // Default to 4 for SQUAD

    if (gameType === "DUO") {
      maxPlayersAllowed = 2
    }

    if (selectedPlayers.length !== maxPlayersAllowed) {
      errorPopUp(`Please select only ${maxPlayersAllowed} players.`)
      return
    }

    // Perform join operation
    // joinTournamentSqaud(
    //   squad_id,
    //   id,
    //   [],
    //   "Tournament Joined",
    //   "Error, try again.",
    //   "/dashboard",
    // );
  }

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
                            {players.map((array: any) => array.members.length)}
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
                              }  cursor-pointer  h-[2.5rem] w-[8rem] rounded-[3px] flex justify-between items-center`}
                            >
                              <p
                                className={` ${
                                  selectedPlayers.some(
                                    (p) => p.name === player.name,
                                  )
                                    ? "text-black"
                                    : "text-white"
                                } text-[.9rem]  ml-4`}
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
                                  players.map((squad: any) => squad.captain) ? (
                                    <img
                                      src={`crown.png`}
                                      className=""
                                      alt=""
                                    />
                                  ) : (
                                    <LuMinus className="text-black  w-4 h-4`" />
                                  )
                                ) : (
                                  <LuPlus className={`  text-white  w-4 h-4`} />
                                )}
                              </div>
                            </div>
                          )
                        }),
                      )}
                    </div>
                    <div className="my-4 border border-solid border-[#fff]/10 w-full" />
                    <div className="flex-col flex mt-4 ">
                      {playerIGNs.map(([principalId, ign], index) => (
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
                                value={selectedPlayers[index]?.name || ""}
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
                                placeholder={`Player ${index + 1} in game name`}
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

                  {Object.keys(data.game_type)[0].toUpperCase() === "DUO" &&
                  selectedPlayers.length < 2 ? (
                    <p className="w-full text-center">
                      You need to add {2 - selectedPlayers.length}{" "}
                      {`${selectedPlayers.length !== 0 ? "more" : ""}`} players
                      to join this tournament
                    </p>
                  ) : Object.keys(data.game_type)[0].toUpperCase() ===
                      "SQUAD" && selectedPlayers.length < 4 ? (
                    <p className="w-full text-center">
                      You need to add {4 - selectedPlayers.length}{" "}
                      {`${selectedPlayers.length !== 0 ? "more" : ""}`} players
                      to join this tournament
                    </p>
                  ) : (
                    <div className="flex w-full mt-4 justify-center items-center">
                      <button
                        onClick={() => joinTournament()}
                        className="pt-1 pb-[.15rem] ml-4  px-[1rem]  sm:px-4 text-[.85rem] sm:text-sm text-black justify-center  flex bg-primary-second rounded-md items-center cursor-pointer sm:py-2"
                      >
                        <p className="font-semibold">Join Tournament</p>
                        {isLoading ? (
                          <ClipLoader
                            color={color}
                            loading={isLoading}
                            cssOverride={override}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            className="ml-4"
                          />
                        ) : (
                          <></>
                        )}
                      </button>
                    </div>
                  )}
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