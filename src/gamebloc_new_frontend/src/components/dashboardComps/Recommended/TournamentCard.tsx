import React from "react"
import { CodImgs } from "../../../data/Index"
import { useNavigate } from "react-router-dom"
interface Props {
  data: any
  index: any
}

const TournamentCard = ({ data, index }: Props) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/active-tournament/${data.id_hash}`)}
      className=" h-fit relative  flex flex-col cursor-pointer rounded-xl "
    >
      <img
        src={`xbox-pad.jpg`}
        alt=""
        className="rounded-[12px] m-0 h-[18rem] 2xl:h-[20rem]  w-full"
      />
      <div className="absolute flex top-2 left-2 bg-gradient-to-r justify-between items-center from-[#77536F] to-[#574151] rounded-md py-1 px-2 sm:px-[.5rem] sm:py-[.3rem] ">
        <img src={`mdi_crowd.png`} className="m-0 w-3 h-3" alt="" />
        <p className=" ml-[.5rem]  text-[0.6rem]  sm:text-[.6rem] text-white">
          {Object.keys(data.tournament_type)[0].toUpperCase()}
        </p>
      </div>
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
