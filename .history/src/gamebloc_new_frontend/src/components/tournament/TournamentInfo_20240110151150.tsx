import React from "react"

const TournamentInfo = () => {
  return (
    <div className="mt-8 w-full p-4 ">
      <div className="flex flex-col">
        <div className="flex gap-4">
          <div className=" w-full rounded-md bg-gradient-to-b from-[#B33283] via-[#F8DBFB] to-[#96C2FB] p-[.1rem]">
            <div className="flex h-full w-full rounded-md  bg-primary-first p-4 ">
              <p className="text-sm  text-white">Entry Fee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentInfo
