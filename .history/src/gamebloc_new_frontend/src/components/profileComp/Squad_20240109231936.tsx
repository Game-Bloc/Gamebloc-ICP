import React, { useState } from "react"

const Squad = () => {
  const [modal, setModal] = useState<boolean>(false)

  return (
    <div className="w-full flex justify-center mt-[3rem]">
      <div className="flex flex-col mb-4 ">
        <img src={`empty.svg`} alt="" />
        <p className="text-white text-[.8rem] mt-8 text-center">
          It looks like you are not in a squad, You can either create a squad or
          join a squad from here.
        </p>
        <div className=" flex justify-center  items-center mt-[3rem]">
          <p className="text-primary-second rounded-md pt-1 pb-[.15rem]  px-[.6rem]  sm:px-4   border border-solid sm:py-2  border-primary-second hover:text-black hover:bg-primary-second  text-[0.85rem] sm:text-sm cursor-pointer">
            Join Squad
          </p>
          <button className="pt-1 pb-[.15rem] ml-4  px-[.6rem]  sm:px-4 text-[.85rem] sm:text-sm text-black justify-center  flex bg-primary-second rounded-lg items-center cursor-pointer sm:py-2">
            <p className="font-semibold">Create Squad</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Squad
