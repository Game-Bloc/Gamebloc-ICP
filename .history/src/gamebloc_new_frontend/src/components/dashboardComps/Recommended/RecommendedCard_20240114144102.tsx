import React from "react"
import { CodImgs } from "../../../data/Index"
import { useNavigate } from "react-router-dom"
interface Props {
  data: any
  index: any
}

const RecommendedCard = ({ data, index }: Props) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() =>
        navigate(`/active-tournament-details/${data.tournamentId}`)
      }
      className=" bg-[#040D17]/80 h-fit  flex flex-col rounded-xl "
    >
      <img
        src={`${CodImgs[Math.floor(Math.random() * CodImgs.length)]}`}
        alt=""
        className="rounded-[12px] m-0 h-[15rem] 2xl:h-[18rem] w-full"
      />
      <div className="mt-[.5rem] p-[.5rem] flex flex-col w-full">
        <div className="flex mb-4 items-center">
          <img src={`check-yellow.png`} alt="" className=" w-[1rem]  m-0" />
          <p className="ml-2 text-white text-[.7rem] md:text-[.8rem]">
            {data.creator}
          </p>
        </div>
        <p className="font-valorant w-full font-medium text-[0.65rem] 2xl:text-[.8rem]  text-primary-second">
          {data.game}
        </p>
        {/* <p className="text-primary-second text-[0.6rem] 2xl:text-[.659rem]  my-[2px]">
          NBA 2k23
        </p> */}
        <div className="flex w-full justify-center items-center">
          <button className="pt-1 pb-[.15rem]  px-[.6rem] w-[7rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-between mt-[0.8rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-[.2rem]">
            <p>View</p>
            <img
              src={`details.png`}
              alt=""
              className="m-0 w-4 lg:w-[1.07rem]"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecommendedCard
