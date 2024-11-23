import React from "react"

const Hero = () => {
  return (
    <div className="relative bg-transparent">
      <div className="flex flex-col justify-center items-center mt-[15rem]">
        <img
          src={`hero_1.png`}
          alt=""
          className="absolute left-0 top-[-17rem] w-[35%]  opacity-75"
        />
        <img
          src={`hero_2.png`}
          alt=""
          className="absolute left-0 right-0 top-[-11rem] w-[35%] opacity-75"
        />
        <p className="text-white text-[0.6rem] sm:text-[0.7rem] lg:text-lg mb-[0.5rem] md:mb-[1rem] bg-transparent">
          Next-Generation Gaming HUB. Compete, WIn, Earn.
        </p>
        <p
          style={{ lineHeight: "1.3" }}
          className="text-primary-second text-[0.85rem] sm:text-[2rem]  lg:text-[3rem]  xl:text-[4rem] h-fit  2xl:text-[4rem] font-valorant my-4 sm:my-8 "
        >
          THE FUTURE OF WEB3 GAMING
        </p>
        <button
          //   onClick={() => setModal(true)}
          className="pt-1 pb-[.25rem]  px-[.6rem] w-[6rem]  sm:w-[10rem] lg:w-[15rem] sm:px-6 text-[.6rem] sm:text-base text-black justify-between mt-[0.8rem] sm:mt-[1.5rem] hover:bg-primary-second/70  flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3"
        >
          <p className="text-[0.65rem] sm:text-[.85rem]">Get Started</p>
          <img src={`details.png`} alt="" className="m-0 w-[.75rem] sm:w-6" />
        </button>
      </div>
      <div className="relative flex flex-col justify-center items-center">
        <img
          src={`hero_3.png`}
          alt=""
          className="absolute left-0 right-0  mt-[-3rem]"
        />
        <img src={`hero_4.png`} alt="" className="mt-[4rem] z-10" />
      </div>
    </div>
  )
}

export default Hero
