import React from "react"

interface Props {
  data: any
}

const Rules = ({ data }: Props) => {
  return (
    <div className="">
      <div className="flex flex-col mx-4 max-h-[27rem]  overflow-x-hidden overflow-y-scroll">
        <p className="text-white">{data.tournament_rules}</p>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-2">
          <p className="font-semibold">Join Tournament</p>
        </button>
      </div>
    </div>
  )
}

export default Rules
