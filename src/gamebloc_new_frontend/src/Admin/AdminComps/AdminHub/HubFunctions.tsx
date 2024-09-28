import React, { useState } from "react"
import { Principal } from "@dfinity/principal"
import ClipLoader from "react-spinners/ClipLoader"
import hooks from "../../../Functions/hooks"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const HubFunctions = () => {
  const _principal = Principal.fromText("")
  const [color, setColor] = useState("hsl(0, 0%, 100%)")
  const { isLoading, updating, setAdmin, setTribunal } = hooks()
  const [adminPricipal, setAdminPrincipal] = useState<string>("")
  const [tribunalPricipal, setTribunalPrincipal] = useState<string>("")

  const adminchange = (e: any) => {
    e.preventDefault()
    const value = e.target.value
    setAdminPrincipal(value)
  }

  const tribunalchange = (e: any) => {
    e.preventDefault()
    const value = e.target.value
    setTribunalPrincipal(value)
  }

  return (
    <div className="bg-primary-first flex flex-col ">
      <p className="text-[0.8rem]  mb-[1rem] font-semibold sm:text-base  text-primary-second">
        Mod Functions
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex-col  flex mt-3">
          <p className="text-sm sm:text-[.85rem] mt-[.8rem] font-normal text-white">
            Set Principal as Administrator
          </p>
          <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
            <input
              className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
              placeholder="Principal"
              type="text"
              onChange={adminchange}
              value={adminPricipal}
            />
          </div>
          <button
            onClick={() => setAdmin(Principal.fromText(adminPricipal))}
            className="bg-[#303B9C]  flex justify-center items-center rounded-[7px] py-[.5rem] px-[1rem] h-[2.5rem] cursor-pointer"
          >
            {updating ? (
              <div className="flex items-center  gap-2">
                <p className="text-[0.65rem] mr-2 text-white font-bold sm:text-[.85rem]">
                  Wait
                </p>
                <ClipLoader
                  color={color}
                  loading={updating}
                  cssOverride={override}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <>
                <p className="ml-[.4rem] text-white text-[.8rem]"> Set</p>
              </>
            )}
          </button>
        </div>
        <div className="flex-col  flex mt-3">
          <p className="text-sm sm:text-[.85rem] mt-[.8rem] font-normal text-white">
            Set Principal as Tribunal Mod
          </p>
          <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
            <input
              className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
              placeholder="Principal"
              type="text"
              onChange={tribunalchange}
              value={tribunalPricipal}
            />
          </div>
          <button
            onClick={() => setAdmin(Principal.fromText(tribunalPricipal))}
            className="bg-[#303B9C]  flex justify-center items-center rounded-[7px] py-[.5rem] px-[1rem] h-[2.5rem] cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center  gap-2">
                <p className="text-[0.65rem] mr-2 text-white font-bold sm:text-[.85rem]">
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
              <>
                <p className="ml-[.4rem] text-white text-[.8rem]"> Set</p>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default HubFunctions
