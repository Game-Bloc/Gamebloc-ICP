import React from "react";

const RecommendedCard = () => {
  return (
    <div className=" bg-[#040D17]/80 p-4 flex flex-col rounded-xl ">
      <img src={`rec1.png`} alt="" />
      <div className="mt-6 flex flex-col w-full">
        <div className="flex mb-4 items-center">
          <img src={`check-yellow.png`} alt="" className=" w-[1rem]  m-0" />
          <p className="ml-2 text-white text-[.7rem] md:text-[.8rem]">2k</p>
        </div>
        <p className="font-valorant w-full font-medium text-[0.65rem] 2xl:text-[.8rem]  text-primary-second">
          NBA2k CHAMPS SHOWDOWN
        </p>
        <p className="text-primary-second text-[0.6rem] 2xl:text-[.659rem]  my-[2px]">
          NBA 2k23
        </p>
        <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full sm:px-6 text-[.7rem] sm:text-base text-black justify-between mt-[0.8rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3">
          <p>View</p>
          <img src={`details.png`} alt="" className="m-0 w-4 sm:w-6" />
        </button>
      </div>
    </div>
  );
};

export default RecommendedCard;
