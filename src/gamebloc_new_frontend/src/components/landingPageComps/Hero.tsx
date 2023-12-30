import React from "react";
import "./hero.css";

interface Props {
  setModal: any;
}
const Hero = ({ setModal }: Props) => {
  return (
    <div className="relative mt-[5rem] h-fit">
      <img src={`layer1.svg`} className="w-screen relative" alt="" />
      <img src={`layer2.svg`} className="w-screen absolute top-0" alt="" />
      <div className="absolute w-full top-0 flex justify-between items-center">
        <div className="flex flex-col w-[69%] 2xl:w-[70%] ml-8">
          <p
            style={{ lineHeight: "1.3" }}
            className="text-primary-second text-[0.85rem] sm:text-[2rem]  lg:text-[3rem]  xl:text-[4rem] h-fit  2xl:text-[4rem] font-valorant my-4 sm:my-8 "
          >
            THE FUTURE OF WEB3 GAMING
          </p>
          <p className="text-white text-[0.6rem] sm:text-[0.7rem] lg:text-lg mb-[0.5rem] md:mb-[1rem] ">
            {" "}
            Your Hub for Next-Gen Gaming! Join Crowdfunded Tournaments, Win
            Prizes, and Host Game Launch Events.
          </p>
          <button
            onClick={() => setModal(true)}
            className="pt-1 pb-[.15rem]  px-[.6rem] w-[6rem]  sm:w-[10rem] lg:w-[15rem] sm:px-6 text-[.6rem] sm:text-base text-black justify-between mt-[0.8rem] sm:mt-[1.5rem] hover:bg-primary-second/70  flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3"
          >
            <p className="text-[0.65rem] sm:text-[.85rem]">Get Started</p>
            <img src={`details.png`} alt="" className="m-0 w-[.75rem] sm:w-6" />
          </button>
        </div>

        <img src={`layer3.svg`} className="w-[48.5%] 2xl:w-[68%]" alt="" />
      </div>
    </div>
  );
};

export default Hero;
