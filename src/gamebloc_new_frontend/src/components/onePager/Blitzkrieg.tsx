import React from "react"

const Blitzkrieg = () => {
  return (
    <div className=" mt-[5rem] h-[50vh]">
      <div className="flex relative flex-col-reverse lg:flex-row justify-between mt-8 lg:mx-[6rem]">
        <img
          src={`sherder.png`}
          alt="ghost"
          className=" md:relative mt-5  md:w-[50vw] h-[50vh] lg:ml-[-2rem]  md:opacity-100"
        />
        <div className=" mx-4 lg:mx-0 flex items-start flex-col md:mr-8 mt-2 md:mt-6 bg-primary-bg_color/10 md:bg-[transparent]">
          <p className=" text-[#EB0000] font-valorant font-black text-[1.1rem] sm:text-[2rem]  2xl:text-[3rem]  my-4">
            BLITZKRIEG
          </p>
          <img
            src={`duo.png`}
            alt=""
            className="m-0 w-[12rem] sm:max-w-[20rem]"
          />
          <div className="bg-gradient-to-tr from-[#41070B] to-[#2D040C] px-3 py-2 mt-3">
            <p className="text-white text-[1.1rem]  md:text-2xl lg:text-xl 2xl:text-4xl font-valorant uppercase">
              ₦ 500,000 Prize pool
            </p>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex flex-row-reverse lg:flex-row  items-center mt-3">
              <p className="text-white ml-3 text-[.8rem]">$1 entry fee</p>
              <div className="h-[2.4rem] md:h-[3rem] w-2 bg-[#EB0000]  lg:ml-3 " />
            </div>
            <div className="flex  flex-row-reverse  lg:flex-row items-center mt-3">
              <p className="text-white ml-3 text-[.8rem]">Only 100 slot</p>
              <div className=" h-[2.4rem] md:h-[3rem] w-2 bg-[#EB0000]  lg:ml-3" />
            </div>
            <div className="flex flex-row-reverse lg:flex-row items-center mt-3">
              <p className="text-white ml-3 text-[.8rem]">Win 5k per kills</p>
              <div className=" h-[2.4rem] md:h-[3rem] w-2 bg-[#EB0000]  lg:ml-3" />
            </div>
          </div>
          <div className="flex items-start mt-3">
            <a
              href="https://cv4ma-4qaaa-aaaal-adntq-cai.icp0.io/dashboard"
              className="pt-[.7rem] pb-[.7rem]  px-[.6rem] w-[10rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-between mt-[0.3rem] flex bg-[#F6B8FC] rounded-md items-center cursor-pointer sm:py-[.4rem]"
            >
              <p className="text-[.7rem]">Join Tournament</p>
              <img
                src={`details.png`}
                alt=""
                className="m-0 w-4 lg:w-[1.07rem]"
              />
            </a>
          </div>
          <p className="text-white text-[.8rem] my-3">
            Registration Opens Now On Discord
          </p>
        </div>
      </div>
    </div>
  )
}

export default Blitzkrieg
