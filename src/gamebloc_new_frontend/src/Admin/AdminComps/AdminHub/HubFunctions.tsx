import React, { useState } from "react"
import { Principal } from "@dfinity/principal"
import ClipLoader from "react-spinners/ClipLoader"
import hooks from "../../../Functions/hooks"
import { errorPopUp } from "../../../components/utils/ErrorModal"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const HubFunctions = () => {
  const {
    isLoading,
    updating,
    activateloading,
    allocateUserPoint,
    setAdmin,
    setTribunal,
  } = hooks()
  const [color, setColor] = useState("hsl(0, 0%, 100%)")
  const [adminPrincipal, setAdminPrincipal] = useState<string>("")
  const [tribunalPrincipal, setTribunalPrincipal] = useState<string>("")
  const [pointPrincipal, setPointPrincipal] = useState<string>("")
  const [point, setPoint] = useState<string>("")

  const validatePrincipalId = (text): boolean => {
    return text.length === 63
  }

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

  const principalChange = (e: any) => {
    e.preventDefault()
    const value = e.target.value
    setPointPrincipal(value)
  }
  const pointChange = (e: any) => {
    e.preventDefault()
    const value = e.target.value
    setPoint(value)
  }

  const adminFunction = () => {
    if (validatePrincipalId(adminPrincipal)) {
      setAdmin(Principal.fromText(adminPrincipal))
      setAdminPrincipal("")
    } else {
      errorPopUp("Invalid principal")
    }
  }
  const tribunalFunction = () => {
    if (validatePrincipalId(tribunalPrincipal)) {
      setTribunal(Principal.fromText(tribunalPrincipal))
      setTribunalPrincipal("")
    } else {
      errorPopUp("Invalid principal")
    }
  }

  const allocateFunction = () => {
    const numericValue = Number(point)
    if (
      validatePrincipalId(pointPrincipal) &&
      !isNaN(numericValue) &&
      point.trim() !== ""
    ) {
      allocateUserPoint(
        Principal.fromText(pointPrincipal),
        numericValue,
        "Points allocated",
        "Error allocating points",
        "",
      )
      setPointPrincipal("")
      setPoint("")
    } else {
      errorPopUp("Invalid input")
    }
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
              value={adminPrincipal}
            />
          </div>
          <button
            onClick={() => adminFunction()}
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
              value={tribunalPrincipal}
            />
          </div>
          <button
            onClick={() => tribunalFunction()}
            className="bg-[#303B9C]  flex justify-center items-center rounded-[7px] py-[.5rem] px-[1rem] h-[2.5rem] cursor-pointer "
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

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <p className="text-sm sm:text-[.85rem] mt-[.8rem] font-normal text-white">
                User's Principal
              </p>
              <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
                <input
                  className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                  placeholder="Principal"
                  type="text"
                  onChange={principalChange}
                  value={pointPrincipal}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm sm:text-[.85rem] mt-[.8rem] font-normal text-white">
                Point
              </p>
              <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
                <input
                  className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                  placeholder="Point"
                  type="text"
                  onChange={pointChange}
                  value={point}
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => allocateFunction()}
            className="bg-[#303B9C]  flex justify-center items-center rounded-[7px] py-[.5rem] px-[1rem] h-[2.5rem] cursor-pointer"
          >
            {activateloading ? (
              <div className="flex items-center  gap-2">
                <p className="text-[0.65rem] mr-2 text-white font-bold sm:text-[.85rem]">
                  Allocating
                </p>
                <ClipLoader
                  color={color}
                  loading={activateloading}
                  cssOverride={override}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <>
                <p className="ml-[.4rem] text-white text-[.8rem]">
                  {" "}
                  Allocate Point
                </p>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default HubFunctions
