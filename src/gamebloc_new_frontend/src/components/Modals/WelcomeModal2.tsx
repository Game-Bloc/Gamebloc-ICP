// import { Button } from "antd"
import React, { useEffect } from "react"
import { useState } from "react"
import { DatePicker } from "antd"

function WelcomeModal2() {
  const [image, setImage] = useState("random.png")
  const [page, setPage] = useState("user details")
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true)
    } else {
      setMobile(false)
    }
  }, [window.innerWidth])

  function handleImg(img: string) {
    if (img === image) {
      return
    } else {
      setImage(img)
    }
  }
  return (
    <div
      className={`w-screen h-screen bg-[#222226] py-5 fixed lg:inset-0 top-0 left-0 z-50 flex justify-center items-center bg-opacity-80 backdrop-blur-sm $`}
    >
      <div className="flex flex-col gap-3 lg:gap-6 py-8 px-8 w-max max-w-[90%] bg-[#151718] rounded-md ">
        <h1 className="font-valorant text-center text-2xl gradient-text text-transparent bg-gradient-to-r from-[#F6B8FC] to-[#E875FC]">
          SET UP YOUR GAMEBLOC PROFILE
        </h1>
        <div className="flex justify-between flex-col lg:flex-row gap-5">
          {((mobile && page === "user details") || !mobile) && (
            <div className="w-full lg:w-[40%] lg:border-b-0  lg:border-r border-[#D0D0D5] lg:pr-5 lg:pb-10 flex flex-col gap-2 mb-2 lg:mb-0">
              <h1 className="font-body text-xl mb-5 text-[#FBFBFC] font-semibold text-center lg:text-left">
                User Details
              </h1>
              <form action="" className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="username"
                    className="text-[#FBFBFC] text-lg font-body font-semibold"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="bg-transparent px-3 py-5 border border-[#D0D0D5] w-full focus:outline-none rounded-sm text-sm text-white font-body"
                    placeholder="Enter your username. You cannot change this in the future"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className="text-[#FBFBFC] text-lg font-semibold font-body"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="bg-transparent px-3 py-5 border border-[#D0D0D5] w-full focus:outline-none rounded-sm text-sm text-white font-body"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="dob"
                    className="text-[#FBFBFC] text-lg font-semibold font-body"
                  >
                    Date of birth
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="bg-transparent px-3 py-5 border border-[#D0D0D5] w-full focus:outline-none rounded-sm text-sm text-white font-body"
                    placeholder="DD/MM/YYYY"
                  />
                  <DatePicker
                    className="bg-transparent px-3 py-5 border border-[#D0D0D5] w-full focus:outline-none rounded-sm text-sm text-white font-body"
                    placeholder="DD/MM/YYYY"
                    format="DD/MM/YYYY"
                  />
                </div>
              </form>
              {mobile && (
                <button
                  onClick={() => setPage("avatar")}
                  className="ml-auto mt-5 font-body px-5 md:px-8 py-3 md:py-3 bg-[#F9CDFD] font-semibold text-xs md:text-sm rounded-sm  hover:bg-gradient-to-r hover:from-[#F9CDFD] hover:to-[#E875FC]  transition-all duration-200 ease-in-out"
                >
                  Next
                </button>
              )}
            </div>
          )}
          {((mobile && page === "avatar") || !mobile) && (
            <div className="w-full lg:w-[60%] pl-5 flex flex-col gap-3 lg:gap-5">
              <h1 className="font-body text-xl lg:mb-5 text-[#FBFBFC] font-semibold text-center lg:text-left">
                Select your profile avatar
              </h1>
              <div className="flex gap-5 flex-col lg:flex-row items-center lg:items-start">
                <div
                  className={`w-[90px] lg:w-[120px] flex-shrink-0 mx:auto md:mx-0`}
                >
                  <img
                    src={`${image}`}
                    alt="selects a random avatar"
                    className="w-[90px] lg:w-[120px] h-[90px] lg:h-[120px] border-2 p-[4px] bg-gradient-to-br from-[#E875FC] to-[#4E1EEC] cursor-pointer transition-all duration-200 ease-in-out hover:scale-105"
                    onClick={() => {
                      console.log("clicked")
                      function randomize() {
                        const randomImg =
                          images[Math.floor(Math.random() * images.length)]
                        return randomImg
                      }
                      while (randomize() === image) {
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
                        image === imageName
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
          )}
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
