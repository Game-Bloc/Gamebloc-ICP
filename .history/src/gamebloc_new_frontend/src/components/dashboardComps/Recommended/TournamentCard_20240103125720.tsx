import React from "react"
import { CodImgs } from "../../../data/Index"
interface Props {
  data: any
  index: any
}

const TournamentCard = ({ data, index }: Props) => {
  return (
    <div className=" h-fit relative  flex flex-col rounded-xl ">
      <img
        src={`${CodImgs[Math.floor(Math.random() * CodImgs.length)]}`}
        alt=""
        className="rounded-[12px] m-0 h-[18rem] 2xl:h-[20rem]  w-full"
      />
      <div className="absolute cursor-pointer bg-primary-first h-fit bottom-2 ml-3  p-[.7rem] justify-between items-center  rounded-xl  flex w-[85%]">
        <div className="flex flex-col justify-start items-start">
          <p className=" w-full font-bold text-[.65rem] sm:text-[0.75rem] 2xl:text-[.95rem]  text-white">
            {data.game}
          </p>
          <div className="flex mt-[6px] justify-center items-center flex-row">
            <img
              src={`check-yellow.png`}
              alt=""
              className=" w-[.5rem] flex h-[.5rem]  m-0"
            />

            <p className="ml-1 text-white text-[.6rem] ">{data.creator}</p>
          </div>
        </div>
        {/* <img
          src={`right.svg`}
          alt=""
          className="m-0 w-4 hidden lg:block lg:w-[1.07rem]"
        /> */}
      </div>
    </div>
  )
}

export default TournamentCard
