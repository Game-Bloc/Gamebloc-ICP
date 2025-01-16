import React from "react"
import { Element } from "react-scroll"
import { motion } from "motion/react"

interface Props {
  setModal: any
}

const Gamebloc = ({ setModal }: Props) => {
  return (
    <Element
      name="about"
      id="about"
      className="flex  relative flex-col-reverse md:flex-row mt-[4rem] gap-4 lg:gap-10 items-start mx-8 "
    >
      <img
        src={`hero_2.png`}
        alt=""
        className="absolute left-0 right-0 top-[-8rem]  w-[60%]   opacity-75"
      />
      <div className=" h-full  w-full flex md:hidden justify-center items-center">
        <button className="pt-1 pb-[.15rem]  px-[.6rem] w-[6rem]  sm:w-[10rem] lg:w-[15rem] sm:px-6 text-[.6rem] sm:text-base text-black justify-between mt-[0.8rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3">
          <p className="text-[0.65rem] sm:text-[.85rem]">Learn More</p>
          <img src={`details.png`} alt="" className="m-0 w-[.75rem] sm:w-6" />
        </button>
      </div>
      <motion.img
        initial={{ x: -100, opacity: 0 }}
        whileInView={{
          x: 0,
          opacity: 3,
          transition: { duration: 0.7, delay: 0.3 },
        }}
        src={`home1.svg`}
        alt=""
        className="m-0 md:w-[50%]"
      />
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{
          x: 0,
          opacity: 3,
          transition: { duration: 0.7, delay: 0.3 },
        }}
        className="flex relative flex-col 2xl:w-[50%] justify-end"
      >
        <p
          className="text-primary-second text-[1.1rem] sm:text-[2rem] flex w-full justify-center md:justify-end  lg:text-[2rem] 
               h-fit  2xl:text-[3rem] font-valorant mt-4 mb-4 md:m-0  "
        >
          Gamebloc
        </p>
        <p className="text-primary-second text-semibold text-[0.9rem] flex w-full justify-center md:justify-end  sm:text-[1rem]  mb-[1.3rem] md:mb-[1rem] ">
          What are we all about?
        </p>
        <p className="text-primary-second text-[0.6rem] sm:text-[0.8rem] 2xl:text-base flex w-full justify-end  mb-[0.5rem] md:mb-[1rem] ">
          Gamebloc seeks to be the first social platform for gamers that allows
          users to host and join tournaments where they can win prizes and
          entertain themselves with games that we will be supporting. Also
          provide a game launch platform that will enable game developers to
          launch their games by hosting tournaments streams and events that will
          foster interests in their mobile or desktop game.
        </p>
        <div className=" h-full w-full hidden md:flex justify-end items-end">
          <button
            onClick={() => setModal(true)}
            className="pt-1 pb-[.25rem] hover:bg-primary-second/70   px-[.6rem] w-[6rem]  sm:w-[10rem] lg:w-[15rem] sm:px-6 text-[.6rem] sm:text-base text-black justify-between mt-[0.8rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3"
          >
            <p className="text-[0.65rem] sm:text-[.85rem]">Learn More</p>
            <img src={`details.png`} alt="" className="m-0 w-[.75rem] sm:w-6" />
          </button>
        </div>
      </motion.div>
    </Element>
  )
}

export default Gamebloc
