import React, { useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import ClipLoader from "react-spinners/ClipLoader"
import { useAppSelector } from "../../redux/hooks"
import { errorPopUp } from "../utils/ErrorModal"

interface Props {
  modal: () => void
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const JoinSquadModal = ({ modal }: Props) => {
  const [squadId, setSquadId] = useState<string>("")
  const { isLoading, joinSquad } = useGameblocHooks()
  const [color, setColor] = useState("#ffffff")
  const username = useAppSelector((state) => state.userProfile.username)
  const principal = useAppSelector((state) => state.userProfile.principal_id)

  const onIdChange = (e: any) => {
    e.preventDefault()
    const input = e.target.value
    setSquadId(input)
  }

  const join_Squad = () => {
    if (squadId.trim() === "") {
      return errorPopUp("Please fill in all fields")
    }
    joinSquad(
      squadId,
      username,
      principal,
      "Squad Joined",
      "Invalid Squad Id",
      "/dashboard",
    )
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
              <div className="relative bg-[#030C15] w-[90%] md:max-w-[55%] border border-solid border-[#595959] lg:max-w-[40%] 2xl:max-w-[30%] rounded-[25px] overflow-hidden">
                <div className="bg-[#030C15] p-[2rem] flex flex-col  ">
                  <RiCloseFill
                    onClick={modal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  />
                  <div className="mt-4 flex  flex-col">
                    <h2 className="text-primary-second text-base sm:text-xl mb-4 ">
                      Join Squad
                    </h2>
                    <div className="flex-col flex mt-4 ">
                      <p className="text-[.8rem] sm:text-base mt-[.8rem] font-normal text-white">
                        Squad I.D
                      </p>
                      <div className=" my-4 items-center w-full pr-8 h-[2.7rem] pl-[0.5rem] border-[#595959] bg-[#141414] border-solid border rounded-lg flex">
                        <input
                          className="border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
                          placeholder="Enter Squad I.D"
                          type="text"
                          value={squadId}
                          onChange={onIdChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full mt-4 justify-end">
                    <button
                      disabled={isLoading}
                      onClick={() => join_Squad()}
                      className="pt-1 pb-[.15rem] ml-4  px-[.6rem]  sm:px-4 text-[.85rem] sm:text-sm text-black justify-center  flex bg-primary-second rounded-lg items-center cursor-pointer sm:py-2"
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
                        <p className="font-semibold">Join</p>
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

export default JoinSquadModal
