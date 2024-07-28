import React, { useEffect, useState } from "react"
import { CodImgs } from "../../../data/Index"
import { useNavigate } from "react-router-dom"
import { Skeleton } from "antd"
import { DotChartOutlined } from "@ant-design/icons"
const cardImg = require("../../../../assets/cyber.svg").default
interface Props {
  data: any
  index: any
}

const RecommendedCard = ({ data, index }: Props) => {
  const navigate = useNavigate()
  const [isImageLoaded, setIsimageLoaded] = useState<boolean>(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setIsimageLoaded(true)
    }
    img.src = cardImg
  }, [cardImg])

  return (
    <div
      onClick={() => navigate(`/active-tournament/${data.id_hash}`)}
      className=" relative bg-[#040D17]/80 h-fit  flex flex-col rounded-xl "
    >
      {!isImageLoaded ? (
        <div className="flex flex-col w-full h-full justify-center items-center">
          <Skeleton.Node className=" bg-[#505050] mt-[.5rem]" active={true}>
            <DotChartOutlined style={{ fontSize: 40, color: "#bfbfbf" }} />
          </Skeleton.Node>
        </div>
      ) : (
        <div className="relative">
          <img src={cardImg} alt="" className="rounded-[12px] m-0  w-full" />
          {Object.keys(data.status)[0].toUpperCase() === "ARCHIVED" ? (
            <div className="absolute flex top-2 left-2 bg-gradient-to-r justify-between items-center bg-[#FEE4E2] rounded-md py-1 px-2 sm:px-[.5rem] sm:py-[.3rem] ">
              <p className="   text-[0.6rem] font-bold  sm:text-[.6rem] text-[#D92D20] ">
                {Object.keys(data.status)[0]}
              </p>
            </div>
          ) : Object.keys(data.status)[0].toUpperCase() ===
            "ACCEPTINGPLAYERS" ? (
            <div className="absolute flex top-2 left-2 bg-gradient-to-r justify-between items-center bg-[#D1FADF] rounded-md py-1 px-2 sm:px-[.5rem] sm:py-[.3rem] ">
              <p className="   text-[0.6rem] font-bold  sm:text-[.6rem] text-[#039855] ">
                Accepting Players
              </p>
            </div>
          ) : Object.keys(data.status)[0].toUpperCase() === "GAMEINPROGRESS" ? (
            <div className="absolute flex top-2 left-2 bg-gradient-to-r justify-between items-center bg-[#FFD98F] rounded-md py-1 px-2 sm:px-[.5rem] sm:py-[.3rem] ">
              <p className="   text-[0.6rem] font-bold  sm:text-[.6rem] text-[#B88217] ">
                In Progress
              </p>
            </div>
          ) : (
            <div className="absolute flex top-2 left-2 bg-gradient-to-r justify-between items-center bg-[#FEE4E2] rounded-md py-1 px-2 sm:px-[.5rem] sm:py-[.3rem] ">
              <p className="   text-[0.6rem] font-bold  sm:text-[.6rem] text-[#D92D20] ">
                Ended
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-[.5rem] p-[.5rem] flex flex-col w-full">
        <div className="flex mb-2 items-center">
          <img src={`check-yellow.png`} alt="" className=" w-[1rem]  m-0" />
          <p className="ml-2 text-white text-[.7rem] md:text-[.8rem]">
            {data.creator}
          </p>
        </div>
        <p className="font-valorant w-full text-center font-medium text-[0.75rem] 2xl:text-[.8rem]  text-primary-second">
          {data.game}
        </p>
        <p className="text-primary-second text-[0.8rem] 2xl:text-[.8rem] text-center  mt-[2px] mb-2">
          {data.title}
        </p>
        <div className="flex w-full justify-center items-center">
          <button className="pt-1 pb-[.25rem]  px-[.6rem] w-[7rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-between mt-[0.3rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-[.2rem]">
            <p className="text-[.7rem]">View</p>
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
