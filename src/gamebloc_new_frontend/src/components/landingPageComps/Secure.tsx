import React from "react";

const Secure = () => {
  return (
    <div className="mt-[5rem]">
      <img src={`secure.svg`} alt="" className="hidden md:flex" />
      <div className="flex flex-col md:hidden">
        <p
          className="text-primary-second text-center text-[1.1rem] sm:text-[2rem] flex w-full justify-center md:justify-end  lg:text-[3rem] 
              xl:text-[4rem] h-fit  2xl:text-[4rem] font-valorant mt-4 mb-4 md:m-0  "
        >
          SECURED TRANSACTIONS
        </p>

        <div className="flex justify-center items-center mt-8">
          <img src={`gamemach.svg`} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Secure;
