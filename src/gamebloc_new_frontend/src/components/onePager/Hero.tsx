import React from "react"

const Hero = () => {
  return (
    <div className="relative bg-transparent">
      <div className="flex flex-col justify-center items-center mt-40 ">
        <img
          src={`hero_1.png`}
          alt=""
          className="absolute left-0 top-[-4rem]"
        />
        <img
          src={`hero_2.png`}
          alt=""
          className="absolute left-0 right-0 top-[-4rem]"
        />
        <p className="text-white text-[0.6rem] sm:text-[0.7rem] lg:text-lg mb-[0.5rem] md:mb-[1rem] bg-transparent">
          Next-Generation Gaming HUB. Compete, WIn, Earn.
        </p>
      </div>
    </div>
  )
}

export default Hero
