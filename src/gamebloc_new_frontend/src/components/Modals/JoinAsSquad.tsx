import React, { useEffect, useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import { useAppSelector } from "../../redux/hooks"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { ulid } from "ulid"
import ClipLoader from "react-spinners/ClipLoader"
interface Props {
  modal: () => void
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const JoinAsSquad = ({ modal }: Props) => {
  const [captainIGN, setCaptainIGN] = useState<string>("")
  const [playerOneId, setPlayerOneId] = useState<string>("")
  const [playerOneIGN, setPlayerOneIGN] = useState<string>("")
  const [playerTwoId, setPlayerTwoId] = useState<string>("")
  const [playerTwoIGN, setPlayerTwoIGN] = useState<string>("")
  const [playerThreeId, setPlayerThreeId] = useState<string>("")
  const [playerThreeIGN, setPlayerThreeIGN] = useState<string>("")

  const [color, setColor] = useState("#ffffff")

  const { isLoading, joinTournamentSqaud } = useGameblocHooks()

  //    const joinWithSquad = () => {
  //        joinTournamentSqaud(
  //          squad_id,
  //          id,
  //          [],
  //          "Tournament Joined",
  //          "Error, try again.",
  //          "/dashboard",
  //        )
  //    }

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
                    <h2 className="text-primary-second text-center text-[.9rem] lg:text-base  mb-4 ">
                      Enter your squad’s current CODM In Game Names and player
                      IDs to join this tournament
                    </h2>
                    <div className="flex-col flex mt-4 ">
                      <p className="text-[.75rem]  mt-[.8rem] font-normal text-white">
                        Your IGN
                      </p>
                      <div className=" my-4 lg:w-[47%] items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
                        <input
                          className="border-none w-full  text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                          placeholder="In game name"
                          type="text"
                          onChange={(e) => setCaptainIGN(e.target.value)}
                          value={captainIGN}
                        />
                      </div>

                      <div className="my-4 border border-solid border-[#fff]/10 w-full" />
                      <div className="flex w-full flex-col md:flex-row gap-4 lg:gap-8">
                        <div className="flex w-full flex-col">
                          <p className="text-[.75rem]  mt-[.8rem] font-normal text-white">
                            Player ID 1
                          </p>
                          <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
                            <input
                              className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                              placeholder=" player 1 Id"
                              type="text"
                              onChange={(e) => setPlayerOneId(e.target.value)}
                              value={playerOneId}
                            />
                          </div>
                        </div>
                        <div className="flex w-full flex-col">
                          <p className="text-[.75rem]  mt-[.8rem] font-normal text-white">
                            IGN 1
                          </p>
                          <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
                            <input
                              className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                              placeholder="In game name"
                              type="text"
                              onChange={(e) => setPlayerOneIGN(e.target.value)}
                              value={playerOneIGN}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="my-4 border border-solid border-[#fff]/10 w-full" />
                      <div className="flex w-full flex-col md:flex-row gap-4 lg:gap-8">
                        <div className="flex w-full flex-col">
                          <p className="text-[.75rem]  mt-[.8rem] font-normal text-white">
                            Player ID 2
                          </p>
                          <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
                            <input
                              className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                              placeholder=" player 2 Id"
                              type="text"
                              onChange={(e) => setPlayerTwoId(e.target.value)}
                              value={playerTwoId}
                            />
                          </div>
                        </div>
                        <div className="flex w-full flex-col">
                          <p className="text-[.75rem]  mt-[.8rem] font-normal text-white">
                            IGN 2
                          </p>
                          <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
                            <input
                              className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                              placeholder="In game name"
                              type="text"
                              onChange={(e) => setPlayerTwoIGN(e.target.value)}
                              value={playerTwoIGN}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="my-4 border border-solid border-[#fff]/10 w-full" />
                      <div className="flex w-full flex-col md:flex-row gap-4 lg:gap-8">
                        <div className="flex w-full flex-col">
                          <p className="text-[.75rem]  mt-[.8rem] font-normal text-white">
                            Player ID 3
                          </p>
                          <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
                            <input
                              className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                              placeholder=" player 3 Id"
                              type="text"
                              onChange={(e) => setPlayerThreeId(e.target.value)}
                              value={playerThreeId}
                            />
                          </div>
                        </div>
                        <div className="flex w-full flex-col">
                          <p className="text-[.75rem]  mt-[.8rem] font-normal text-white">
                            IGN 3
                          </p>
                          <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
                            <input
                              className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                              placeholder="In game name"
                              type="text"
                              onChange={(e) =>
                                setPlayerThreeIGN(e.target.value)
                              }
                              value={playerThreeIGN}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full mt-4 justify-center items-center">
                    <button className="pt-1 pb-[.15rem] ml-4  px-[1rem]  sm:px-4 text-[.85rem] sm:text-sm text-black justify-center  flex bg-primary-second rounded-md items-center cursor-pointer sm:py-2">
                      <p className="font-semibold">Join</p>
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
