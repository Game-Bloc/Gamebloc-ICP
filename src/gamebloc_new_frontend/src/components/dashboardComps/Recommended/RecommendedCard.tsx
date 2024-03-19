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
      className=" bg-[#040D17]/80 h-fit  flex flex-col rounded-xl "
    >
      {!isImageLoaded ? (
        <div className="flex flex-col w-full h-full justify-center items-center">
          <Skeleton.Node className=" bg-[#505050] mt-[.5rem]" active={true}>
            <DotChartOutlined style={{ fontSize: 40, color: "#bfbfbf" }} />
          </Skeleton.Node>
        </div>
      ) : (
        <img src={cardImg} alt="" className="rounded-[12px] m-0  w-full" />
      )}

      <div className="mt-[.5rem] p-[.5rem] flex flex-col w-full">
        <div className="flex mb-2 items-center">
          <img src={`check-yellow.png`} alt="" className=" w-[1rem]  m-0" />
          <p className="ml-2 text-white text-[.7rem] md:text-[.8rem]">
            {data.creator}
          </p>
        </div>
        <p className="font-valorant w-full text-center font-medium text-[0.65rem] 2xl:text-[.8rem]  text-primary-second">
          {data.game}
        </p>
        <p className="text-primary-second text-[0.6rem] 2xl:text-[.659rem] text-center  mt-[2px] mb-2">
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
