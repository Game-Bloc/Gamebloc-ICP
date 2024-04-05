import React, { useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import ClipLoader from "react-spinners/ClipLoader"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { updateAuth } from "../redux/slice/authClient"
import { useGameblocHooks } from "../Functions/gameblocHooks"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const MySwal = withReactContent(Swal)
  const { isAdmin, isLoading } = useGameblocHooks()
  const [color, setColor] = useState("#ffffff")
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const adminName = useAppSelector((state) => state.userProfile.username)
  console.log("Normal username", adminName)

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

  const onChangeUsername = (e: any) => {
    e.preventDefault()
    const userNameInput = e.target.value
    setUserName(userNameInput)
  }

  const onChangePassword = (e: any) => {
    e.preventDefault()
    const pass_word = e.target.value
    setPassword(pass_word)
  }

  const submit = () => {
    if (userName.trim() === "") {
      errorPopUp("Username is empty !")
    } else if (password.trim() !== "game-Bloc_@2024") {
      errorPopUp("Password incorrect !")
    } else {
      isAdmin(userName, "you are logged in", "/admin-dashboard")
    }
  }

  return (
    <div className="w-full h-fit">
      <div className="flex ">
        <div className="relative w-[50%]">
          <img src={`style.png`} alt="" className="h-screen w-full" />
          <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 m-auto">
            <img
              src={`gamelogo.png`}
              alt=""
              className="w-[15rem] h-[15rem] m-0"
            />
            <h1 className="font-valorant mt-[2rem] text-primary-second text-[2.2rem] text-semibold">
              YOU CONTROL
            </h1>
          </div>
        </div>
        <div className="w-[50%] flex flex-col justify-center items-center">
          <img src={`logo.png`} alt="" className="m-0 w-[15rem]" />
          <div className="flex flex-col w-[80%] mt-4">
            <div className="flex items-center pl-[.5rem] h-[2rem] border-[#F6B8FC]/30 bg-[#f6b8fc7a]/20 border border-solid rounded-[8px] w-full">
              <input
                className="border-none bg-[transparent] text-white/80 placeholder:text-[0.8rem] placeholder:text-white/80 focus:outline-none focus:ring-0 text-[0.8rem] appearance-none w-full"
                type="text"
                placeholder="Username"
                onChange={onChangeUsername}
                value={userName}
              />
            </div>
            <div className="flex items-center mt-8 pl-[.5rem] h-[2rem] border-[#F6B8FC]/30 bg-[#f6b8fc7a]/20 border border-solid rounded-[8px] w-full">
              <input
                className="border-none bg-[transparent] text-white/80 placeholder:text-[0.8rem] placeholder:text-white/80 focus:outline-none focus:ring-0 text-[0.8rem] appearance-none w-full"
                type="text"
                placeholder="Password"
                value={password}
                onChange={onChangePassword}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

{
  /* <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-[#fff]/20  bg-opacity-75 transition-opacity">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full ">
              <div className="relative bg-primary-first w-[90%] md:max-w-[55%]  lg:max-w-[40%] 2xl:max-w-[30%] rounded-[25px] overflow-hidden">
                <div className="bg-primary-first p-[2rem] flex flex-col justify-center items-center">
                  <img
                    src={`welcome.png`}
                    alt=""
                    className="rounded-t-[25px]"
                  /> */
}
{
  /* <RiCloseFill
                    //   onClick={modal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  /> */
}
{
  /* <div className="">
                    <img
                      src={`gamelogo.png`}
                      className="-mt-4 mb-[.3rem] w-[3rem] h-[3rem]"
                      alt=""
                    />
                  </div>
                  <h1 className="font-valorant mt-4 text-primary-second text-[1.1rem] text-semibold">
                    LOGIN AS ADMIN
                  </h1>
                  <p className="text-[.7rem] lg:text-[.82rem] text-center text-primary-second/80 my-[.2rem]">
                    Welcome
                  </p>

                  <div className="flex flex-col w-[80%] mt-4">
                    <div className="flex items-center pl-[.5rem] h-[2rem] border-[#F6B8FC]/30 bg-[#f6b8fc7a]/20 border border-solid rounded-[8px] w-full">
                      <input
                        className="border-none bg-[transparent] text-white/80 placeholder:text-[0.8rem] placeholder:text-white/80 focus:outline-none focus:ring-0 text-[0.8rem] appearance-none w-full"
                        type="text"
                        placeholder="Username"
                        onChange={onChangeUsername}
                        value={userName}
                      />
                    </div>
                    <div className="flex items-center mt-8 pl-[.5rem] h-[2rem] border-[#F6B8FC]/30 bg-[#f6b8fc7a]/20 border border-solid rounded-[8px] w-full">
                      <input
                        className="border-none bg-[transparent] text-white/80 placeholder:text-[0.8rem] placeholder:text-white/80 focus:outline-none focus:ring-0 text-[0.8rem] appearance-none w-full"
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={onChangePassword}
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <button
                      onClick={() => submit()}
                      className="justify-center h-[2rem] w-full px-6 text-[.6rem] sm:text-base text-black mt-[0.8rem]  sm:mt-[1.5rem] flex bg-primary-second hover:bg-primary-second/70 rounded-[12px] items-center cursor-pointer py-3"
                    >
                      <p className="flex justify-center items-center text-[0.65rem] font-bold sm:text-[.85rem]">
                        Login
                        {isLoading && (
                          <span className="ml-[.5rem]">
                            <ClipLoader
                              color={color}
                              loading={isLoading}
                              cssOverride={override}
                              size={13}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          </span>
                        )}
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
