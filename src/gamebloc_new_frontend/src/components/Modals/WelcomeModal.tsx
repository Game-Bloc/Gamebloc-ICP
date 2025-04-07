import React, { useEffect, useState } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import { RiCloseFill } from "react-icons/ri"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { ulid } from "ulid"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"

interface Props {
  modal: () => void
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const WelcomeModal = ({ modal }: Props) => {
  const [userName, setUserName] = useState<string>("")
  const [mail, setMail] = useState<string>("")
  const [age, setAge] = useState("")
  const [joinDate, setJoinDate] = useState<string>("January, 2033")
  const [color, setColor] = useState("#ffffff")
  const [idHash, setIdHash] = useState<string>("")
  const { createAccount, isLoading } = useGameblocHooks()
  const MySwal = withReactContent(Swal)
  const Squad_badge = ""

  // State to handle email validation
  const [emailError, setEmailError] = useState<string>("")

  const generateDate = () => {
    let currentDate = new Date()

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }

    const dayOptions: Intl.DateTimeFormatOptions = {
      weekday: "short",
    }

    const timeString = currentDate.toLocaleTimeString("en-US", timeOptions)
    const dayString = currentDate.toLocaleDateString("en-US", dayOptions)

    let currentMonth = currentDate.toLocaleString("default", { month: "long" })
    let currentYear = currentDate.getFullYear()
    let dayOfMonth = currentDate.getDate()

    let date =
      `${timeString}, ${dayString}` +
      ", " +
      dayOfMonth +
      " " +
      currentMonth +
      ", " +
      currentYear +
      "."

    console.log(date)
    setJoinDate(date)
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

  const generateId = () => {
    const date = new Date()
    let day = date.getDate()
    const id = ulid(day)
    setIdHash(id)
    // setJoinDate()
  }

  const onChangeUsername = (e: any) => {
    e.preventDefault()
    const userNameInput = e.target.value
    setUserName(userNameInput)
  }

  const onChangeMail = (e: any) => {
    e.preventDefault()
    const mailInput = e.target.value
    setMail(mailInput)

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (emailRegex.test(mailInput)) {
      setEmailError("") // Clear error if email is valid
    } else {
      setEmailError("Please enter a valid email address.")
    }
  }

  const onChangeAge = (e: any) => {
    e.preventDefault()
    const ageInput = e.target.value
    setAge(ageInput)
  }

  const submit = () => {
    if (userName.trim() === "" || age.trim() === "") {
      errorPopUp("Field is empty !")
    } else if (emailError !== "") {
      errorPopUp("Invalid email format!")
    } else {
      createAccount(
        idHash,
        +age,
        userName,
        joinDate,
        Squad_badge,
        [{ Player: null }],
        mail,
        "Account Created",
        "Error, try again",
        "/dashboard",
      )
    }
  }

  useEffect(() => {
    generateId()
    generateDate()
  }, [])

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
                    onClick={modal}
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
                    Create Account
                  </h1>
                  <p className="text-[.7rem] lg:text-[.82rem] text-center text-primary-second/80 my-[.2rem]">
                    Welcome, you are one step away from a world of immersive
                    gaming experience.
                  </p>

                  <div className="flex flex-col w-[80%] mt-4">
                    <div className="flex items-center  h-[2rem] border-[#F6B8FC]/30 bg-[#f6b8fc7a]/20 border border-solid rounded-[8px] w-full">
                      <input
                        className="border-none bg-[transparent] text-white/80 placeholder:text-[0.8rem] placeholder:text-white/80 focus:outline-none focus:ring-0 text-[0.8rem] appearance-none w-full"
                        type="text"
                        placeholder="Username"
                        onChange={onChangeUsername}
                        value={userName}
                      />
                    </div>
                    <div className="flex items-center mt-8  h-[2rem] border-[#F6B8FC]/30 bg-[#f6b8fc7a]/20 border border-solid rounded-[8px] w-full">
                      <input
                        className="border-none bg-[transparent] text-white/80 placeholder:text-[0.8rem] placeholder:text-white/80 focus:outline-none focus:ring-0 text-[0.8rem] appearance-none w-full"
                        type="text"
                        placeholder="Age"
                        value={age}
                        onChange={onChangeAge}
                      />
                    </div>
                    <div className="flex items-center mt-8 h-[2rem] border-[#F6B8FC]/30 bg-[#f6b8fc7a]/20 border border-solid rounded-[8px] w-full">
                      <input
                        className="border-none bg-[transparent] text-white/80 placeholder:text-[0.8rem] placeholder:text-white/80 focus:outline-none focus:ring-0 text-[0.8rem] appearance-none w-full"
                        type="text"
                        placeholder="Email"
                        onChange={onChangeMail}
                        value={mail}
                      />
                    </div>
                    {emailError && (
                      <p className="text-red-500 text-center text-xs mt-2">
                        {emailError}
                      </p>
                    )}
                  </div>
                  <div className="mt-8">
                    <button
                      onClick={() => submit()}
                      className="justify-center h-[2rem] w-full px-6 text-[.6rem] sm:text-base text-black mt-[0.8rem]  sm:mt-[1.5rem] flex bg-primary-second hover:bg-primary-second/70 rounded-[12px] items-center cursor-pointer py-3"
                    >
                      <div className="text-[0.65rem] font-bold sm:text-[.85rem]">
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <p className="text-[0.65rem] mr-2 font-bold sm:text-[.85rem]">
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
                          "Create Account"
                        )}
                      </div>
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

export default WelcomeModal
