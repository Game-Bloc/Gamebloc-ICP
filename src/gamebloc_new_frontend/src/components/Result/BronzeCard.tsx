import React from "react"
interface prop {
  tourData: any
  no_winner: number
  sortedPlayersResult: any
  sortedSquadResult: any
}

const BronzeCard = ({
  tourData,
  no_winner,
  sortedSquadResult,
  sortedPlayersResult,
}: prop) => {
  const single = tourData.game_type.toUpperCase() === "SINGLE"
  const squadCount = () => {
    let totalCount = 0
    tourData?.squad?.forEach(
      (player: any) => (totalCount += player?.members?.length),
    )
    return totalCount
  }

  return (
    <div className=" w-full h-[fit] rounded-md bg-gradient-to-r from-[transparent]   to-[#633E2A] p-[.04rem]">
      <div className="relative flex flex-col h-full justify-center items-center w-full rounded-md  from-[#1B1412]   to-[#2A1D17]   bg-gradient-to-r  py-[.5rem] ">
        <div className="absolute text-[.8rem] text-[#DA713C] -left-[2rem] flex justify-center items-center -rotate-90 rounded-br-[12px] rounded-bl-[12px] rounded h-[1.8rem] w-[6rem] bg-[#211E1E]">
          3RD PLACE
        </div>
        <div className="rounded-md h-[fit] w-[10rem]">
          <img src={`codm3.png`} alt="" className="rounded-md" />
        </div>
        <p className="font-black text-[1rem] text-white mt-3">
          {single ? sortedPlayersResult[2]?.name : sortedSquadResult[2]?.name}
        </p>
        <div className="mt-6 flex ">
          <div className="flex flex-col">
            <p className="text-white/60 text-[.8rem]">Total Point</p>
            <p className="text-[#eda323] text-[1rem]">
              {" "}
              {single
                ? sortedPlayersResult[2]?.totalPoints
                : sortedSquadResult[2]?.totalPoints}
            </p>
          </div>
          <div className="border border-white/10 border-l h-8 mx-[4rem]" />
          <div className="flex flex-col">
            <p className="text-white/60 text-[.8rem]">Prize</p>
            <p className="text-[#eda323] text-[1rem]">
              {no_winner === 3
                ? Object.keys(tourData.tournament_type)[0].toUpperCase() ===
                    "CROWDFUNDED" &&
                  tourData.game_type.toUpperCase() === "SINGLE"
                  ? `$${(
                      tourData.entry_prize *
                      tourData?.users?.length *
                      0.2
                    ).toFixed(2)}`
                  : Object.keys(tourData.tournament_type)[0].toUpperCase() ==
                      "CROWDFUNDED" &&
                    tourData.game_type.toUpperCase() === "DUO"
                  ? `$${(tourData.entry_prize * squadCount() * 0.2).toFixed(2)}`
                  : Object.keys(tourData.tournament_type)[0].toUpperCase() ==
                      "CROWDFUNDED" &&
                    tourData.game_type.toUpperCase() === "SQUAD"
                  ? `$${(tourData.entry_prize * squadCount() * 0.2).toFixed(2)}`
                  : `$${(tourData.total_prize * 0.2).toFixed(2)}`
                : ``}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BronzeCard
