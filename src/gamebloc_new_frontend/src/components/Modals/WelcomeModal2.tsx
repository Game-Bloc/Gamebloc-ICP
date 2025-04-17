// import { Button } from "antd"
// import { DatePicker } from "antd"
import React, { useEffect, useState } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { ulid } from "ulid"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"

function WelcomeModal2() {
  const [avatar, setAvatar] = useState("random.png")
  const [page, setPage] = useState("user details")
  const [mobile, setMobile] = useState(false)
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

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
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

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setMobile(true)
    } else {
      setMobile(false)
    }
  }, [window.innerWidth])

  function handleImg(img: string) {
    if (img === avatar) {
      return
    } else {
      setAvatar(img)
    }
  }
  return (
    <div
      className={`w-screen h-screen bg-[#222226] py-5 fixed lg:inset-0 top-0 left-0 z-50 flex justify-center items-center bg-opacity-80 backdrop-blur-sm $`}
    >
      <div className="flex flex-col gap-3 lg:gap-6 py-8 px-8 w-max max-w-[90%] bg-[#151718] rounded-md ">
        <h1 className="font-valorant text-center text-lg lg:text-2xl gradient-text text-transparent bg-gradient-to-r from-[#F6B8FC] to-[#E875FC]">
          SET UP YOUR GAMEBLOC PROFILE
        </h1>
        <div className="flex justify-between flex-col lg:flex-row gap-5">
          {((mobile && page === "user details") || !mobile) && (
            <div className="w-full lg:border-b-0  border-[#D0D0D5] lg:pb-10 flex flex-col gap-2">
              <h1 className="font-body text-base lg:text-xl mb-5 text-[#FBFBFC] font-semibold text-center">
                User Details
              </h1>
              <form action="" className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="username"
                    className="text-[#FBFBFC] text-[0.9rem] font-body font-semibold"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="bg-transparent px-3 py-5 h-[2rem] border border-[#D0D0D5] w-full focus:outline-none rounded-sm text-sm text-white font-body"
                    placeholder="Username"
                    onChange={onChangeUsername}
                    value={userName}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className="text-[#FBFBFC] text-[0.9rem] font-semibold font-body"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="bg-transparent px-3 py-5 h-[2rem] border border-[#D0D0D5] w-full focus:outline-none rounded-sm text-sm text-white font-body"
                    placeholder="Email address"
                    onChange={onChangeMail}
                    value={mail}
                  />
                </div>
                {emailError && (
                  <p className="text-red-500 text-center text-xs mt-2">
                    {emailError}
                  </p>
                )}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="dob"
                    className="text-[#FBFBFC] text-[0.9rem] font-semibold font-body"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    name="email"
                    className="bg-transparent px-3 py-5 h-[2rem] border border-[#D0D0D5] w-full focus:outline-none rounded-sm text-sm text-white font-body"
                    placeholder="Age"
                    value={age}
                    onChange={onChangeAge}
                  />
                  {/* <DatePicker
                    className="bg-transparent hover:bg-transparent px-3 py-5 border border-[#D0D0D5] w-full focus:outline-none rounded-sm text-sm text-white font-body"
                    placeholder="DD/MM/YYYY"
                    format="DD/MM/YYYY"
                  /> */}
                </div>
              </form>
              <button
                onClick={() => submit()}
                disabled={isLoading}
                className=" w-max ml-auto mt-3 font-body px-5 md:px-8 py-3 md:py-3 bg-[#F9CDFD] font-semibold text-xs md:text-sm rounded-sm  hover:bg-gradient-to-r hover:from-[#F9CDFD] hover:to-[#E875FC]  transition-all duration-200 ease-in-out"
              >
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
                  "Enter Gamebloc"
                )}
              </button>
              {/* {mobile && (
                <button
                  onClick={() => setPage("avatar")}
                  className="ml-auto mt-5 font-body px-5 md:px-8 py-3 md:py-3 bg-[#F9CDFD] font-semibold text-xs md:text-sm rounded-sm  hover:bg-gradient-to-r hover:from-[#F9CDFD] hover:to-[#E875FC]  transition-all duration-200 ease-in-out"
                >
                  Next
                </button>
              )} */}
            </div>
          )}
          {/* {((mobile && page === "avatar") || !mobile) && (
            <div className="w-full lg:w-[60%] pl-5 flex flex-col gap-3 lg:gap-5">
              <h1 className="font-body text-xl lg:mb-5 text-[#FBFBFC] font-semibold text-center lg:text-left">
                Select your profile avatar
              </h1>
              <div className="flex gap-5 flex-col lg:flex-row items-center lg:items-start">
                <div
                  className={`w-[90px] lg:w-[120px] flex-shrink-0 mx:auto md:mx-0`}
                >
                  <img
                    src={`${avatar}`}
                    alt="selects a random avatar"
                    className="w-[90px] lg:w-[120px] h-[90px] lg:h-[120px] border-2 p-[4px] bg-gradient-to-br from-[#E875FC] to-[#4E1EEC] cursor-pointer transition-all duration-200 ease-in-out hover:scale-105"
                    onClick={() => {
                      console.log("clicked")
                      function randomize() {
                        const randomImg =
                          images[Math.floor(Math.random() * images.length)]
                        return randomImg
                      }
                      while (randomize() === avatar) {
                        randomize()
                        console.log("same image")
                      }
                      handleImg(randomize())
                    }}
                  />
                </div>
                <div className="flex gap-2 flex-wrap flex-grow min-w-0 justify-center lg:justify-start">
                  {images.map((imageName, index) => (
                    <img
                      key={index}
                      src={imageName}
                      alt={`avatar ${index + 1}`}
                      className={`w-[70px] lg:w-[80px] h-[70px] lg:h-[80px] cursor-pointer mb-2 transition-all duration-200 ease-in-out hover:scale-105 ${
                        avatar === imageName
                          ? "border border-[#E875FC] opacity-30 "
                          : ""
                      }`}
                      onClick={() => handleImg(imageName)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-6 lg:justify-end mt-5 lg:mt-auto">
                {mobile && (
                  <button
                    onClick={() => setPage("user details")}
                    className="font-body px-5 md:px-8 py-3 md:py-3 text-[#F9CDFD] bg-transparent font-semibold text-xs md:text-sm rounded-sm border border-[#E875FC] hover:bg-[#E875FC]  transition-all duration-200 ease-in-out"
                  >
                    Go Back
                  </button>
                )}
                <button className=" font-body px-5 md:px-8 py-3 md:py-3 bg-[#F9CDFD] font-semibold text-xs md:text-sm rounded-sm  hover:bg-gradient-to-r hover:from-[#F9CDFD] hover:to-[#E875FC]  transition-all duration-200 ease-in-out">
                  Enter Gamebloc
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

const images = [
  "avatar1.png",
  "avatar2.png",
  "avatar3.png",
  "avatar4.png",
  "avatar5.png",
  "avatar6.png",
  "avatar7.png",
  "avatar8.png",
  "avatar9.png",
  "avatar10.png",
]

export default WelcomeModal2
