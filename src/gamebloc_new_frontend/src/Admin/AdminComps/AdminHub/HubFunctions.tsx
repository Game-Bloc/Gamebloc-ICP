import React, { useState, useRef, useEffect } from "react"
import { Principal } from "@dfinity/principal"
import ClipLoader from "react-spinners/ClipLoader"
import hooks from "../../../Functions/hooks"
import { errorPopUp, SuccessPopUp } from "../../../components/utils/ErrorModal"
import { useAppSelector } from "../../../redux/hooks"
import Copy from "../../../components/utils/Copy"
import copy from "clipboard-copy"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const HubFunctions = () => {
  const {
    sending,
    isLoading,
    updating,
    activateloading,
    allocateUserPoint,
    setAdmin,
    setTribunal,
    getUserWalletAddress,
  } = hooks()
  const textRef = useRef()
  const [color, setColor] = useState("hsl(0, 0%, 100%)")
  const [adminPrincipal, setAdminPrincipal] = useState<string>("")
  const [code, setCode] = useState<string>("")
  const [tribunalPrincipal, setTribunalPrincipal] = useState<string>("")
  const [pointPrincipal, setPointPrincipal] = useState<string>("")
  const [point, setPoint] = useState<string>("")
  const address = useAppSelector((state) => state.IcpBalance.address)

  const validatePrincipalId = (text): boolean => {
    return text.length === 63
  }
  const validateCode = (text: string): boolean => {
    return text.length === 5
  }

  useEffect(() => {
    if (address != "" || address != undefined) {
    }
  }, [address])

  const handleCopyClick = async () => {
    try {
      await copy(address)
      SuccessPopUp("Copied to clipboard")
      console.log("Text copied to clipboard:", address)
    } catch (err) {
      console.error("Copy to clipboard failed:", err)
    }
  }

  const adminchange = (e: any) => {
    e.preventDefault()
    const value = e.target.value
    setAdminPrincipal(value)
  }
  const codeChange = (e: any) => {
    e.preventDefault()
    const value = e.target.value
    setCode(value)
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

  const getAddress = () => {
    if (validateCode(code)) {
      getUserWalletAddress(code)
    } else {
      errorPopUp("Invalid code")
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
          <p className="text-[.7rem] sm:text-[.85rem] mt-[.8rem] font-normal text-white">
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
            disabled={updating}
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
          <p className="text-[.7rem] sm:text-[.85rem] mt-[.8rem] font-normal text-white">
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
            disabled={isLoading}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <div className="flex flex-col w-full">
          <div className="flex justify-between gap-2 lg:gap-0 items-center w-full">
            <div className="flex flex-col">
              <p className="text-[.7rem] sm:text-[.85rem] mt-[.8rem] font-normal text-white">
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
              <p className="text-[.7rem] sm:text-[.85rem] mt-[.8rem] font-normal text-white">
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
            disabled={activateloading}
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
          <div className="flex flex-col mt-8">
            <p className="text-[.7rem] sm:text-[.85rem] mt-[.8rem] font-normal text-white">
              Unique code
            </p>
            <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
              <input
                className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                placeholder="Code"
                type="text"
                onChange={codeChange}
                value={code}
              />
            </div>
            <button
              onClick={() => getAddress()}
              disabled={sending}
              className="bg-[#303B9C]  flex justify-center items-center rounded-[7px] py-[.5rem] px-[1rem] h-[2.5rem] cursor-pointer"
            >
              {sending ? (
                <div className="flex items-center  gap-2">
                  <p className="text-[0.65rem] mr-2 text-white font-bold sm:text-[.85rem]">
                    wait
                  </p>
                  <ClipLoader
                    color={color}
                    loading={sending}
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
                    Get address
                  </p>
                </>
              )}
            </button>
            {address !== "" && (
              <div className="w-full mt-4 flex flex-col justify-center items-center">
                <p className="text-bold text-[.7rem] p-[.65rem]  sm:text-[.8rem] sm:p-[.8rem] text-[#9B9B9B]">
                  Wallet address
                </p>
                <div className="flex items-center">
                  <h2 className=" text-white p-[.5rem] text-bold text-[.72rem] sm:text-[1rem] ">
                    {address
                      ? address.substring(0, 7) +
                        "......" +
                        address.substring(58, 64)
                      : null}
                  </h2>
                  <Copy textToCopy={address} />
                </div>
                <button
                  ref={textRef}
                  onClick={() => {
                    handleCopyClick()
                  }}
                  className="bg-primary-second text-black text-[.8rem] py-2 lg:py-4 px-6 w-full lg:w-[80%] h-8 lg:h-[3rem] rounded-md mt-4"
                >
                  Copy address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HubFunctions
