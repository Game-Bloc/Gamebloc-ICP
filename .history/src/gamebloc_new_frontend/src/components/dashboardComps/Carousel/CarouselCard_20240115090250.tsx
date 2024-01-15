import React from "react"

interface Props {
  list: any
}

const CarouselCard = ({ list }: Props) => {
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
                <img
                  src={`Icp.png`}
                  alt=""
                  className=" w-[1.5rem] sm:w-[2.5rem] m-0 "
                />
                <p className="sm:font-[500] ml-[.2rem] text-[#F8DBFB] text-[.8rem] sm:text-[1.7rem]">
                  31
                </p>
              </div>
              <p className="font-normal text-[#F8DBFB] sm:mb-4 ml-[.5rem]  text-[.7rem] sm:text-sm">
                $400
              </p>
            </div>
            <div className=" flex flex-col">
              <p className="mt-4 ml-[1rem] text-[0.6rem] sm:text-sm text-white">
                Registration
              </p>
              <div className="flex flex-row justify-center items-center">
                <img
                  src={`Icp.png`}
                  alt=""
                  className="w-[1.5rem] sm:w-[2.5rem] m-0"
                />
                <p className="sm:font-[500] ml-[.2rem] text-[#F8DBFB] text-[.8rem] sm:text-[1.7rem]">
                  Free
                </p>
              </div>
              <p className="font-normal ml-[1rem] text-[#F8DBFB] sm:mb-4  text-[.7rem] sm:text-sm">
                Free
              </p>
            </div>
          </div>
        </div>
        <div className="ml-2 sm:ml-6 ">
          <p className=" text-[.6rem] sm:text-lg my-[.6rem] sm:my-4">
            Host: {list.Host}
          </p>
          <button className="pt-1 pb-[.15rem]  px-[.6rem] sm:px-6 text-[.7rem] sm:text-base text-black justify-between flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3">
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
