import React, { useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import ClipLoader from "react-spinners/ClipLoader"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import { updateAuth } from "../redux/slice/authClient"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [color, setColor] = useState("#ffffff")
  const MySwal = withReactContent(Swal)

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

  const successPopUp = (successMsg: string, route: any) => {
    MySwal.fire({
      position: "center",
      icon: "success",
      text: successMsg,
      showConfirmButton: true,
      background: "#01070E",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(route)
      }
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
    } else if (password.trim() !== process.env.ADMINPASSWORD) {
      errorPopUp("Password incorrect !")
    } else {
      localStorage.setItem("adminAuthState", "true")

      dispatch(updateAuth(true))
      successPopUp("you are logged in", "/admin-dashboard")
    }
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
              <div className="relative bg-primary-first w-[90%] md:max-w-[55%]  lg:max-w-[40%] 2xl:max-w-[30%] rounded-[25px] overflow-hidden">
                <div className="bg-primary-first p-[2rem] flex flex-col justify-center items-center">
                  <img
                    src={`welcome.png`}
                    alt=""
                    className="rounded-t-[25px]"
                  />
                  {/* <RiCloseFill
                    //   onClick={modal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  /> */}
                  <div className="">
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
                      <p className="text-[0.65rem] font-bold sm:text-[.85rem]">
                        {/* {isLoading ? (
                            <ClipLoader
                              color={color}
                              loading={isLoading}
                              cssOverride={override}
                              size={10}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            "Login as Admin"
                          )} */}
                        Login
                      </p>
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

export default AdminLogin
