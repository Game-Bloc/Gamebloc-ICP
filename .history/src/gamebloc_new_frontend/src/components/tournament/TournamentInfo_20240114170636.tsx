import React from "react"
import CountDownTimer from "../utils/CountDownTimer"

interface Props {
  data: any
}

const TournamentInfo = ({ data }: Props) => {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000
  const NOW_IN_MS = new Date().getTime()

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS

  function convertToMilliseconds(inputDateString) {
    // Parse the input date string
    const [time, date] = inputDateString.split(" ")

    // Convert time to 24-hour format
    const [hours, minutes] = time.split(":")
    const isPM = /pm/i.test(time)
    const adjustedHours = isPM ? parseInt(hours, 10) + 12 : parseInt(hours, 10)
    const formattedTime = `${adjustedHours}:${minutes}`

    // Concatenate date and formatted time
    const formattedDateString = `${date} ${formattedTime}`

    // Create a Date object from the formatted string
    const dateObject = new Date(formattedDateString)

    // Get the timestamp in milliseconds
    const timestampInMilliseconds = dateObject.getTime()

    return timestampInMilliseconds
  }
  const inputDateString = "4:00 pm 2024-01-16"
  const result = convertToMilliseconds(inputDateString)

  console.log(result)
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
                  <img src={`price1.svg`} className="mt-4" alt="" />
                  <h1 className="text-[1.5rem] font-valorant mt-4 bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] text-[transparent] bg-clip-text  ">
                    {`$${data.total_prize * 0.3}`}
                  </h1>
                </div>
              </div>
              <div className=" w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                <div className="flex flex-col justify-center items-center w-full rounded-md  bg-primary-first pt-[.5rem] pl-[.5rem]">
                  <p className="text-[.8rem]  text-white">3rd</p>
                  <img src={`price1.svg`} className="mt-4" alt="" />
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
                    <img src={`check.svg`} className="m-0" alt="" />
                    <p className="text-[.85rem] ml-3 text-primary-second ">
                      Registration opens
                    </p>
                  </div>
                  <p className="text-[.85rem] text-primary-second ">Ongoing</p>
                </div>
                <div className="flex justify-between mt-4 items-center w-full">
                  <div className="flex items-center">
                    <img src={`check2.svg`} className="m-0" alt="" />
                    <p className="text-[.85rem] ml-3 text-[#2E3438] ">
                      Registration closes
                    </p>
                  </div>
                  <p className="text-[.85rem] text-[#2E3438] ">
                    Jan 25 @ 12:00 AM
                  </p>
                </div>
                <div className="flex justify-between mt-4 items-center w-full">
                  <div className="flex items-center">
                    <img src={`check2.svg`} className="m-0" alt="" />
                    <p className="text-[.85rem] ml-3 text-[#2E3438] ">
                      Tournament begins
                    </p>
                  </div>
                  <p className="text-[.85rem] text-[#2E3438] ">
                    Jan 26 @ 12:00 AM
                  </p>
                </div>
              </div>

              <div className=" mt-8 w-full rounded-md bg-gradient-to-b from-[#A380C4]  to-[#96C2FB] p-[.09rem]">
                <div className="flex flex-col w-full rounded-md  bg-primary-first p-4">
                  <CountDownTimer targetDate={dateTimeAfterThreeDays} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-2">
          <p className="font-semibold">Join Tournament</p>
        </button>
      </div>
    </div>
  )
}

export default TournamentInfo
