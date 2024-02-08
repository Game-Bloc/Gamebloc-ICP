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

const CreateSquadModal = ({ modal }: Props) => {
  const [idHash, setIdHash] = useState<string>("")
  const [squadName, setSquadName] = useState<string>("")
  const [tagName, setTagName] = useState<string>("")
  const [color, setColor] = useState("#ffffff")
  const captain = useAppSelector((state) => state.userProfile.username)
  const principal = useAppSelector((state) => state.userProfile.principal_id)
  const { isLoading, createSquad } = useGameblocHooks()

  const generateHash = () => {
    const date = new Date()
    let day = date.getDate()
    const id = ulid(day)
    setIdHash(id)
  }

  const onNameChange = (e: any) => {
    e.preventDefault()
    const squadNameInput = e.target.value
    setSquadName(squadNameInput)
  }

  const onTagChange = (e: any) => {
    e.preventDefault()
    const tagNameInput = e.target.value
    setTagName(tagNameInput)
  }

  useEffect(() => {
    generateHash()
  }, [])

  const addSquad = () => {
    createSquad(
      idHash,
      captain,
      { Open: null },
      squadName,
      tagName,
      principal,
      [],
      "Squad Created",
      "Error, try again",
      "/dashboard",
    )
  }
  const test = () => {
    console.log("id_hash", idHash)
    console.log("captain", captain)
    console.log("status", { Open: null })
    console.log("squadName", squadName)
    console.log("tagName", tagName)
    console.log("members", [captain])
    console.log("requests", [])
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
              <div className="relative bg-[#030C15] w-[90%] md:max-w-[55%] border border-solid border-[#595959]  lg:max-w-[40%] 2xl:max-w-[30%] rounded-[25px] overflow-hidden">
                <div className="bg-[#030C15] p-[2rem] flex flex-col  ">
                  <RiCloseFill
                    onClick={modal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  />
                  <div className="mt-4 flex  flex-col">
                    <h2 className="text-primary-second text-base sm:text-xl mb-4 ">
                      Create Squad
                    </h2>
                    <div className="flex-col flex mt-4 ">
                      <p className="text-[.8rem] sm:text-base mt-[.8rem] font-normal text-white">
                        Squad Name
                      </p>
                      <div className=" my-4 items-center w-full pr-8 h-[2.7rem] pl-[0.5rem] border-[#595959] bg-[#141414] border-solid border rounded-lg flex">
                        <input
                          className="border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
                          placeholder="Name of your squad"
                          type="text"
                          value={squadName}
                          onChange={onNameChange}
                        />
                      </div>
                    </div>
                    <div className="flex-col flex mt-4 ">
                      <p className="text-[.8rem] sm:text-base mt-[.8rem] font-normal text-white">
                        Squad Tag
                      </p>
                      <div className=" my-4 items-center w-full  pr-8 h-[2.7rem] pl-[0.5rem] border-[#595959] bg-[#141414] border-solid border rounded-lg flex">
                        <input
                          className="border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
                          placeholder="Enter a Squad Tag"
                          type="text"
                          value={tagName}
                          onChange={onTagChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full mt-4 justify-end">
                    <button
                      onClick={() => addSquad()}
                      className="pt-1 pb-[.15rem] ml-4  px-[.6rem]  sm:px-4 text-[.85rem] sm:text-sm text-black justify-center  flex bg-primary-second rounded-lg items-center cursor-pointer sm:py-2"
                    >
                      {isLoading ? (
                        <ClipLoader
                          color={color}
                          loading={isLoading}
                          cssOverride={override}
                          size={10}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : (
                        <p className="font-semibold">Create</p>
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

export default CreateSquadModal
