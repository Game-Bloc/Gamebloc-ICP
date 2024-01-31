import React, { useEffect, useState } from "react"
import SoonModal from "../../../components/Modals/SoonModal"
import { useAppSelector } from "../../../redux/hooks"
import { useGameblocHooks } from "../../../Functions/gameblocHooks"

interface Props {
  list: any
  setModal: any
}

const CarouselCard = ({ list, setModal }: Props) => {
  const { getICPrice } = useGameblocHooks()

  // useEffect(() => {
  //   getICPrice()
  //   console.log("IC price", IC)
  // }, [])

  // const ICvalue = (dollar: number) => {
  //   const currentICP = (1 / IC) * dollar
  //   return currentICP.toFixed(2)
  // }

  return (
    <div className="flex">
      <div className="flex flex-col mt-[.8rem] sm:mt-[1.5rem] w-[75%] sm:w-[50%]  mb-4 bg-gradient-to-r from-[#111101]">
        <p className="font-valorant text-[.8rem] ml-2 sm:ml-6 xl:text-2xl 2xl:text-4xl ">
          {list.title}
        </p>
        <p className="text-[#F8DBFB] hidden sm:block xl:text-xl 2xl:text-4xl ml-6 mt-[1.5rem] mb-4">
          {list.name}
        </p>
        <div className="bg-black ">
          <div className="flex ml-2 sm:ml-4 sm:gap-[3rem]">
            <div className="flex flex-col">
              <p className="mt-4 ml-[.5rem]  text-[0.6rem]  sm:text-sm text-white">
                Price Pool
              </p>
              <div className="flex flex-row justify-center items-center">
                <p className="sm:font-[500] ml-1  text-[#F8DBFB] text-[.8rem] sm:text-[1.7rem]">
                  17
                </p>
                <img
                  src={`Icp.svg`}
                  alt=""
                  className=" w-[1rem] ml-[.4rem] sm:w-[2rem] m-0 "
                />
              </div>
              <p className="font-normal text-[#F8DBFB] sm:mb-4 ml-[.5rem]  text-[.7rem] sm:text-sm">
                $200
              </p>
            </div>
            <div className=" flex ml-4 flex-col">
              <p className="mt-4  text-[0.6rem] sm:text-sm text-white">
                Registration
              </p>
              <div className="flex flex-row justify-start items-center">
                <p className="sm:font-[500]  text-[#F8DBFB] text-[.8rem] sm:text-[1.7rem]">
                  0
                </p>
                <img
                  src={`Icp.svg`}
                  alt=""
                  className=" w-[1rem] ml-[.4rem] sm:w-[2rem] m-0 "
                />
              </div>
              <p className="font-normal  text-[#F8DBFB] sm:mb-4  text-[.7rem] sm:text-sm">
                $0
              </p>
            </div>
          </div>
        </div>
        <div className="ml-2 sm:ml-6 ">
          <p className=" text-[.6rem] sm:text-lg my-[.6rem] sm:my-4">
            Host: {list.Host}
          </p>
          <button
            onClick={() => setModal(true)}
            className="pt-1 pb-[.15rem]  px-[.6rem] sm:px-6 text-[.7rem] sm:text-base text-black justify-between flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3"
          >
            Join now
            <img src={`details.png`} alt="" className=" ml-[.6rem] sm:ml-6" />
          </button>
          <div className="sm:flex sm:flex-wrap gap-4 mt-8 hidden ">
            {list.tags.map((value, index) => (
              <p
                key={index}
                className="flex  justify-center items-center bg-[#686868] text-sm text-white pt-1  pb-[.1rem]  px-4 rounded-sm"
              >
                {value}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <img
          src={list.img}
          alt=""
          className="sm:w-[60vw]  sm:h-[28rem]  h-[15rem] "
        />
      </div>
    </div>
  )
}

export default CarouselCard
