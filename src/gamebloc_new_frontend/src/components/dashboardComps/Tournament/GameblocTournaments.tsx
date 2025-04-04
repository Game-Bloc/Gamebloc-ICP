import React, { useEffect, useState } from "react"
import SoonModal from "../../../components/Modals/SoonModal"
import { DotChartOutlined } from "@ant-design/icons"
import { Skeleton } from "antd"
const img1 = require("../../../../assets/category1.png").default

interface props {
  loading: boolean
}

const GameblocTournaments = ({ loading }: props) => {
  const [modal, setModal] = useState<boolean>(false)
  const [isImageLoaded, setImageLoaded] = useState<boolean>(false)

  const handleModal = () => {
    setModal(!modal)
  }

  useEffect(() => {
    const img = new Image()
    if (img1) {
      setImageLoaded(true)
    }
    img.src = img1
  }, [img1])

  return (
    <div className="bg-[#040D17] rounded-[1.5rem] w-full p-4 mt-14">
      <div className="flex flex-col ">
        <div className="flex w-full mt-4 justify-center items-center">
          <img
            src={`gamelogo.png`}
            className="w-[1.5rem] sm:w-[3rem] m-0"
            alt=""
          />
          <h2 className="font-valorant ml-4 text-sm sm:text-lg md:text-xl text-white">
            GAMEBLOC TOURNAMENTS
          </h2>
        </div>
        <div className=" lg:flex w-full lg:justify-center lg:items-center">
          <div className="mt-8 gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 2xl:gap-[3rem]">
            {/* <div
              onClick={() => setModal(true)}
              className="relative flex cursor-pointer "
            >
              {!isImageLoaded ? (
                <div className="flex flex-col w-full h-full justify-center items-center">
                  <Skeleton.Node className=" bg-[#505050] " active={true}>
                    <DotChartOutlined
                      style={{ fontSize: 40, color: "#bfbfbf" }}
                    />
                  </Skeleton.Node>
                  <Skeleton.Input
                    className="mt-[1rem] bg-[#505050] h-[1.2rem]"
                    active={true}
                    size={"small"}
                  />
                </div>
              ) : (
                <>
                  <img src={`Gcard1.png`} />
                  <div className="absolute -bottom-[2px] py-2  w-full rounded-bl-[0.625rem] rounded-br-[0.625rem] rounded bg-[#311A34] flex justify-center items-center">
                    <p className="text-white text-[0.7rem] sm:text-sm ">
                      Registration: Coming
                    </p>
                  </div>
                </>
              )}
            </div> */}
            <div
              onClick={() => setModal(true)}
              className="relative cursor-pointer "
            >
              {!isImageLoaded ? (
                <div className="flex flex-col w-full h-full justify-center items-center">
                  <Skeleton.Node className=" bg-[#505050] " active={true}>
                    <DotChartOutlined
                      style={{ fontSize: 40, color: "#bfbfbf" }}
                    />
                  </Skeleton.Node>
                  <Skeleton.Input
                    className="mt-[1rem] bg-[#505050] h-[1.2rem]"
                    active={true}
                    size={"small"}
                  />
                </div>
              ) : (
                <>
                  <img src={`Gcard2.png`} />
                  <div className="absolute -bottom-[2px] py-2  w-full rounded-bl-[0.625rem] rounded-br-[0.625rem] rounded bg-[#311A34] flex justify-center items-center">
                    <p className="text-white text-[0.7rem] sm:text-sm ">
                      Registration: Coming
                    </p>
                  </div>
                </>
              )}
            </div>
            <div
              onClick={() => setModal(true)}
              className="relative  cursor-pointer"
            >
              {!isImageLoaded ? (
                <div className="flex flex-col w-full h-full justify-center items-center">
                  <Skeleton.Node className=" bg-[#505050] " active={true}>
                    <DotChartOutlined
                      style={{ fontSize: 40, color: "#bfbfbf" }}
                    />
                  </Skeleton.Node>
                  <Skeleton.Input
                    className="mt-[1rem] bg-[#505050] h-[1.2rem]"
                    active={true}
                    size={"small"}
                  />
                </div>
              ) : (
                <>
                  <img src={`Gcard3.png`} />
                  <div className="absolute -bottom-[2px] py-2  w-full rounded-bl-[0.625rem] rounded-br-[0.625rem] rounded bg-[#311A34] flex justify-center items-center">
                    <p className="text-white text-[0.7rem] sm:text-sm ">
                      Registration: Coming
                    </p>
                  </div>
                </>
              )}
            </div>
            <div
              onClick={() => setModal(true)}
              className="relative cursor-pointer"
            >
              {!isImageLoaded ? (
                <div className="flex flex-col w-full h-full justify-center items-center">
                  <Skeleton.Node className=" bg-[#505050] " active={true}>
                    <DotChartOutlined
                      style={{ fontSize: 40, color: "#bfbfbf" }}
                    />
                  </Skeleton.Node>
                  <Skeleton.Input
                    className="mt-[1rem] bg-[#505050] h-[1.2rem]"
                    active={true}
                    size={"small"}
                  />
                </div>
              ) : (
                <>
                  <img src={`Gcard4.png`} />
                  <div className="absolute -bottom-[2px] py-2  w-full rounded-bl-[0.625rem] rounded-br-[0.625rem] rounded bg-[#311A34] flex justify-center items-center">
                    <p className="text-white text-[0.7rem] sm:text-sm ">
                      Registration: Coming
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full mt-4 justify-center items-center">
          <button
            onClick={() => setModal(true)}
            className="pt-1 pb-[.25rem]  px-[.6rem] w-[6rem]   sm:w-[10rem] sm:px-6 text-[.7rem] sm:text-base text-black justify-between mt-[0.7rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3"
          >
            <p>See All</p>
            <img src={`details.png`} alt="" className="m-0 w-4 sm:w-6" />
          </button>
        </div>
      </div>
      {modal && <SoonModal modal={handleModal} />}
    </div>
  )
}

export default GameblocTournaments
