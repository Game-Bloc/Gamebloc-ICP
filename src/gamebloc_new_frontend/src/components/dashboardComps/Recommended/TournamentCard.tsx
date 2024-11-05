import React, { useEffect, useState } from "react"
import { CodImgs } from "../../../data/Index"
import { useNavigate } from "react-router-dom"
import { Skeleton } from "antd"
import { DotChartOutlined } from "@ant-design/icons"
const cardImg = require("../../../../assets/category1.png").default
interface Props {
  data: any
  index: any
}

const TournamentCard = ({ data, index }: Props) => {
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
    <>
      {!isImageLoaded ? (
        <div className="flex flex-col w-full h-full justify-center items-center">
          <Skeleton.Node className=" bg-[#505050] mt-[.5rem]" active={true}>
            <DotChartOutlined style={{ fontSize: 40, color: "#bfbfbf" }} />
          </Skeleton.Node>
          <Skeleton.Input
            className="mt-[1rem] bg-[#505050] h-[1.2rem]"
            active={true}
            size={"small"}
          />
        </div>
      ) : (
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
          {Object.keys(data.status)[0].toUpperCase() === "ARCHIVED" ? (
            <div className="absolute flex top-2 right-2 bg-gradient-to-r justify-between items-center bg-[#FEE4E2] rounded-md py-1 px-2 sm:px-[.5rem] sm:py-[.3rem] ">
              <p className="   text-[0.6rem] font-bold  sm:text-[.6rem] text-[#D92D20] ">
                {Object.keys(data.status)[0]}
              </p>
            </div>
          ) : Object.keys(data.status)[0].toUpperCase() ===
            "ACCEPTINGPLAYERS" ? (
            <div className="absolute flex top-2 right-2 bg-gradient-to-r justify-between items-center bg-[#D1FADF] rounded-md py-1 px-2 sm:px-[.5rem] sm:py-[.3rem] ">
              <p className="   text-[0.6rem] font-bold  sm:text-[.6rem] text-[#039855] ">
                Open
              </p>
            </div>
          ) : Object.keys(data.status)[0].toUpperCase() === "GAMEINPROGRESS" ? (
            <div className="absolute flex top-2 right-2 bg-gradient-to-r justify-between items-center bg-[#FFD98F] rounded-md py-1 px-2 sm:px-[.5rem] sm:py-[.3rem] ">
              <p className="   text-[0.6rem] font-bold  sm:text-[.6rem] text-[#B88217] ">
                In Progress
              </p>
            </div>
          ) : (
            <div className="absolute flex top-2 right-2 bg-gradient-to-r justify-between items-center bg-[#FEE4E2] rounded-md py-1 px-2 sm:px-[.5rem] sm:py-[.3rem] ">
              <p className="   text-[0.6rem] font-bold  sm:text-[.6rem] text-[#D92D20] ">
                Ended
              </p>
            </div>
          )}
          <div className="absolute cursor-pointer bg-primary-first h-fit bottom-2 ml-3  p-[.7rem] justify-between items-center  rounded-xl  flex w-[85%]">
            <div className="flex flex-col  w-full ">
              <div className="flex items-center flex-row">
                <img
                  src={`check-yellow.png`}
                  alt=""
                  className=" w-[.5rem] flex h-[.5rem]  m-0"
                />

                <p className="ml-1 text-white text-[.65rem] font-bold">
                  {data.creator}
                </p>
              </div>
              <p className=" w-full text-center mt-2 font-bold text-[.65rem] sm:text-[0.75rem] 2xl:text-[.95rem]  text-white">
                {data.title}
              </p>
              <p className=" w-full text-center font-bold text-[.65rem] sm:text-[0.75rem] 2xl:text-[.95rem]  text-white">
                {data.game}
              </p>
            </div>
            {/* <img
          src={`right.svg`}
          alt=""
          className="m-0 w-4 hidden lg:block lg:w-[1.07rem]"
        /> */}
          </div>
        </div>
      )}
    </>
  )
}

export default TournamentCard
