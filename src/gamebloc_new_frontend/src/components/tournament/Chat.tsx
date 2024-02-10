import { Avatar } from "antd"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { IoSend } from "react-icons/io5"
import { ulid } from "ulid"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { useGetTournamentMessages } from "../../Functions/blochooks"
import { useAppSelector } from "../../redux/hooks"

interface Props {
  data: any
}

const Chat = ({ data }: Props) => {
  const scrollContainerRef = useRef(null)
  const [time, setTime] = useState<string>("")
  const [id, setId] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const { sendTournamentMessage } = useGameblocHooks()
  const { updateMessages } = useGetTournamentMessages()
  const username = useAppSelector((state) => state.userProfile.username)

  const getTimeIn12HourFormat = () => {
    const date = new Date()
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? "pm" : "am"

    hours %= 12
    hours = hours || 12 // Handle midnight (0 hours)

    const formattedTime = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`
    return formattedTime
  }

  const generateULID = () => {
    const date = new Date()
    let day = date.getDate()
    const id = ulid(day)
    setId(id)
    console.log("ulid:", id)
  }

  const onMessageChange = (e: any) => {
    e.preventDefault()
    const input = e.target.value
    setMessage(input)
  }

  useEffect(() => {
    // Scroll to the bottom of the container when new messages are added
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    }
    setTime(getTimeIn12HourFormat())
    generateULID()
  }, [data])

  useEffect(() => {
    setInterval(() => {
      updateMessages()
    }, 2000)
  }, [])

  const sendMessage = () => {
    sendTournamentMessage(id, username, time, message)
  }

  const list = "Deonorla"
  return (
    <div>
      <div
        ref={scrollContainerRef}
        className="flex  flex-col h-[27rem] max-h-[50rem] overflow-x-hidden overflow-y-scroll"
      >
        <div className="flex items-center mb-6">
          <Avatar
            style={{
              backgroundColor: "#fde3cf",
              color: "#f56a00",
            }}
          >
            {list.substring(0, 2).toUpperCase()}
          </Avatar>
          <div className="ml-2 bg-white/10 rounded-xl p-3 w-fit  max-w-[27rem]">
            <div className="flex items-center  mb-3">
              <p className="text-sm text-gray font-bold">Deonorla</p>{" "}
              <p className="text-[.65rem] ml-2 mr-2 text-gray/80">12:00 pm</p>
            </div>
            <p className="text-gray">
              I need some help to with getting the best team memmbers for this
              tournament. I currently have just 4 players in my team.
            </p>
          </div>
        </div>
        <div className="flex justify-end items-center mb-6">
          <div className=" bg-primary-second/20 rounded-xl p-3 w-fit  max-w-[27rem]">
            <div className="flex items-center  mb-3">
              <p className="text-sm text-gray font-bold">Deonorla</p>{" "}
              <p className="text-[.65rem] ml-2 mr-2 text-gray/80">12:00 pm</p>
            </div>
            <p className="text-gray">Hi</p>
          </div>
          <div className="ml-2">
            <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
              {list.substring(0, 2).toUpperCase()}
            </Avatar>
          </div>
        </div>
      </div>
      <div className="w-full mt-2 flex justify-center items-center">
        <div className=" w-full justify-center items-center p-4 bg-[#fff]/10 rounded-full flex">
          <textarea
            className="r border-none w-full text-gray/80 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-gray/80  appearance-none text-[0.9rem] bg-[transparent]"
            placeholder="Message"
            rows={1}
            value={message}
            onChange={onMessageChange}
          />
        </div>
        {message === "" ? (
          <></>
        ) : (
          <IoSend
            onClick={() => {
              setTime(getTimeIn12HourFormat())
              sendMessage()
            }}
            className="text-gray mr-0 my-0 ml-4 text-[1.5rem]"
          />
        )}
      </div>
    </div>
  )
}

export default Chat
