import React, { useEffect, useState } from "react"
import CountDownTimer from "../utils/CountDownTimer"
import { useCountdown } from "../utils/CountDown"
import { useAppSelector } from "src/redux/hooks"

interface Props {
  data: any
}

const TournamentInfo = ({ data }: Props) => {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState("#ffffff")
  const [days, hours, minutes, seconds] = useCountdown(count)
  const owner = useAppSelector((state) => state.userProfile.username)

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  }

  function convertToMilliseconds(inputDateString: string) {
    const dateTimeMatch = inputDateString.match(
      /(\d{1,2}:\d{2}\s*[APMapm]+)\s*(\d{4}-\d{2}-\d{2})/,
    )

    if (!dateTimeMatch) {
      console.error("Invalid date format")
      return NaN
    }

    const [, time, date] = dateTimeMatch

    // Extract hours, minutes, and AM/PM from the time part
    const [hoursStr, minutesStr] = time.split(":")
    const hours = parseInt(hoursStr, 10)
    const minutes = parseInt(minutesStr, 10)
    const isPM = /pm/i.test(time)

    // Extract year, month, and day from the date part
    const [yearStr, monthStr, dayStr] = date.split("-")
    const year = parseInt(yearStr, 10)
    const month = parseInt(monthStr, 10) - 1
    const day = parseInt(dayStr, 10)

    // Convert 12-hour format to 24-hour format
    let adjustedHours = hours
    if (isPM && hours !== 12) {
      adjustedHours += 12
    } else if (!isPM && hours === 12) {
      adjustedHours = 0
    }

    // Create a new Date object with the components
    const dateObject = new Date(year, month, day, adjustedHours, minutes)

    // Check for invalid date
    if (isNaN(dateObject.getTime())) {
      console.error("Invalid date")
      return NaN
    }

    // Get the timestamp in milliseconds
    const timestampInMilliseconds = dateObject.getTime()

    return timestampInMilliseconds
  }

  useEffect(() => {
    const inputDateString = data.starting_date
    const result = convertToMilliseconds(inputDateString)
    setCount(result)
  }, [])

  return (
    <div>
      <div className="flex flex-col mx-4 max-h-[27rem]  overflow-x-hidden overflow-y-scroll">
        <div className="mt-8 w-full p-4 ">
          <div className="flex flex-col">
            <div className="flex gap-4 xl:gap-8">
              <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                <div className="flex flex-col w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
                  <p className="text-[.8rem]  text-white">Entry Fee</p>
                  <h1 className=" text-[2rem] sm:text-[3rem] font-valorant bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                    {data.entry_prize == 0 ? "FREE" : `$${data.entry_prize}`}
                  </h1>
                </div>
              </div>
              <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                <div className="flex flex-col w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
                  <p className="text-[.8rem]  text-white">Prize Pool</p>
                  <h1 className="text-[2rem] sm:text-[3rem] font-valorant bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                    {Object.keys(data.tournament_type)[0].toUpperCase() ==
                    "CROWDFUNDED"
                      ? `$${data.entry_price * data.users.length}`
                      : `$${data.total_prize}`}
                  </h1>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8 mt-4">
              <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                <div className="flex flex-col justify-center items-center w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
                  <p className="text-[.8rem]  text-white">1st</p>
                  <img src={`price1.svg`} className="mt-4" alt="" />
                  <h1 className="text-[1.5rem] font-valorant mt-4 bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                    {`$${data.total_prize * 0.5}`}
                  </h1>
                </div>
              </div>
              <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                <div className="flex flex-col justify-center items-center w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
                  <p className="text-[.8rem]  text-white">2nd</p>
                  <img src={`price2.svg`} className="mt-4" alt="" />
                  <h1 className="text-[1.5rem] font-valorant mt-4 bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                    {`$${data.total_prize * 0.3}`}
                  </h1>
                </div>
              </div>
              <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                <div className="flex flex-col justify-center items-center w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
                  <p className="text-[.8rem]  text-white">3rd</p>
                  <img src={`price3.svg`} className="mt-4" alt="" />
                  <h1 className="text-[1.5rem] font-valorant mt-4 bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                    {`$${data.total_prize * 0.2}`}
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-[1.5rem] mb-[1.5rem] border border-solid border-[#2E3438] w-full" />

            <div className="flex flex-col">
              <div className="flex items-center">
                <img src={`calender2.png`} className="m-0" alt="" />
                <h2 className="text-[0.8rem] ml-3 font-semibold sm:text-base  text-white">
                  Timeline [GMT+1]
                </h2>
              </div>
              <div className="mt-8 w-full flex flex-col">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center">
                    <img
                      src={
                        days == 0 && hours == 0 && minutes == 0 && seconds == 0
                          ? `check2.svg`
                          : `check.svg`
                      }
                      className="m-0"
                      alt=""
                    />
                    <p
                      className={
                        days == 0 && hours == 0 && minutes == 0 && seconds == 0
                          ? "text-[.85rem] ml-3 text-[#2E3438]"
                          : "text-[.85rem] ml-3 text-primary-second "
                      }
                    >
                      Registration opens
                    </p>
                  </div>
                  <p
                    className={
                      days == 0 && hours == 0 && minutes == 0 && seconds == 0
                        ? "text-[.85rem]  text-[#2E3438]"
                        : "text-[.85rem]  text-primary-second "
                    }
                  >
                    Ongoing
                  </p>
                </div>
                <div className="flex justify-between mt-4 items-center w-full">
                  <div className="flex items-center">
                    <img
                      src={
                        days == 0 && hours == 0 && minutes == 0 && seconds == 0
                          ? `check2.svg`
                          : `check.svg`
                      }
                      className="m-0"
                      alt=""
                    />
                    <p
                      className={
                        days == 0 && hours == 0 && minutes == 0 && seconds == 0
                          ? "text-[.85rem] ml-3 text-[#2E3438]  "
                          : "text-[.85rem] ml-3 text-primary-second"
                      }
                    >
                      Registration closes
                    </p>
                  </div>
                  <p
                    className={
                      days == 0 && hours == 0 && minutes == 0 && seconds == 0
                        ? "text-[.85rem]  text-[#2E3438]"
                        : "text-[.85rem]  text-primary-second "
                    }
                  >
                    Jan 25 @ 12:00 AM
                  </p>
                </div>
                <div className="flex justify-between mt-4 items-center w-full">
                  <div className="flex items-center">
                    <img
                      src={
                        days == 0 && hours == 0 && minutes == 0 && seconds == 0
                          ? `check.svg`
                          : `check2.svg`
                      }
                      className="m-0"
                      alt=""
                    />
                    <p
                      className={
                        days == 0 && hours == 0 && minutes == 0 && seconds == 0
                          ? "text-[.85rem] ml-3 text-primary-second "
                          : "text-[.85rem] ml-3 text-[#2E3438]"
                      }
                    >
                      Tournament begins
                    </p>
                  </div>
                  <p
                    className={
                      days == 0 && hours == 0 && minutes == 0 && seconds == 0
                        ? "text-[.85rem]  text-primary-second "
                        : "text-[.85rem]  text-[#2E3438]"
                    }
                  >
                    Jan 26 @ 12:00 AM
                  </p>
                </div>
              </div>

              <div className=" mt-8 w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                <div className="flex flex-col w-full rounded-md  bg-primary-first p-4">
                  <CountDownTimer targetDate={count} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        {data.users.some((index: any) => index.includes(owner)) ? (
          <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-white justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-[#63aa88] rounded-md items-center sm:py-2">
            <p className="font-semibold">Joined</p>
          </button>
        ) : (
          <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-2">
            <p className="font-semibold">Join Tournament</p>
          </button>
        )}
      </div>
    </div>
  )
}

export default TournamentInfo
function usetate<T>(): [any, any] {
  throw new Error("Function not implemented.")
}
