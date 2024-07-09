import React from "react"

interface prop {
  tourData: any
  no_winner: number
  sortedPlayersResult: any
  sortedSquadResult: any
}

const GoldCard = ({
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
    <div className=" w-full h-[fit] rounded-md bg-gradient-to-r from-[transparent]   to-[#5B4228] p-[.04rem]">
      <div className="relative flex flex-col h-full justify-center items-center w-full rounded-md  from-[#1A1310]   to-[#2B2316]   bg-gradient-to-r  py-[.5rem] ">
        <div className="absolute text-[.8rem] text-[#EEB640] -left-[2rem] flex justify-center items-center -rotate-90 rounded-br-[12px] rounded-bl-[12px] rounded h-[1.8rem] w-[6rem] bg-[#252216]">
          1ST PLACE
        </div>
        <div className="rounded-md h-[fit] w-[10rem]">
          <img src={`codm.png`} alt="" className="rounded-md" />
        </div>
        <p className="font-black text-[1rem] text-white mt-3">
          {single ? sortedPlayersResult[0]?.name : sortedSquadResult[0]?.name}
        </p>
        <div className="mt-6 flex ">
          <div className="flex flex-col">
            <p className="text-white/60 text-[.8rem]">Total Point</p>
            <p className="text-[#eda323] text-[1rem]">
              {single
                ? sortedPlayersResult[0]?.totalPoints
                : sortedSquadResult[0]?.totalPoints}
            </p>
          </div>
          <div className="border border-white/10 border-l h-8 mx-[4rem]" />
          <div className="flex flex-col">
            <p className="text-white/60 text-[.8rem]">Prize</p>
            <p className="text-[#eda323] text-[1rem]">
              {no_winner === 1
                ? Object.keys(tourData.tournament_type)[0].toUpperCase() ===
                    "CROWDFUNDED" &&
                  tourData.game_type.toUpperCase() === "SINGLE"
                  ? `$${(
                      tourData.entry_prize * tourData?.users?.length
                    ).toFixed(2)}`
                  : Object.keys(tourData.tournament_type)[0].toUpperCase() ==
                      "CROWDFUNDED" &&
                    tourData.game_type.toUpperCase() === "DUO"
                  ? `$${(tourData.entry_prize * squadCount()).toFixed(2)}`
                  : Object.keys(tourData.tournament_type)[0].toUpperCase() ==
                      "CROWDFUNDED" &&
                    tourData.game_type.toUpperCase() === "SQUAD"
                  ? `$${(tourData.entry_prize * squadCount()).toFixed(2)}`
                  : `$${tourData.total_prize.toFixed(2)}`
                : no_winner === 2
                ? Object.keys(tourData.tournament_type)[0].toUpperCase() ===
                    "CROWDFUNDED" &&
                  tourData.game_type.toUpperCase() === "SINGLE"
                  ? `$${(
                      tourData.entry_prize *
                      tourData?.users?.length *
                      0.6
                    ).toFixed(2)}`
                  : Object.keys(tourData.tournament_type)[0].toUpperCase() ==
                      "CROWDFUNDED" &&
                    tourData.game_type.toUpperCase() === "DUO"
                  ? `$${(tourData.entry_prize * squadCount() * 0.6).toFixed(2)}`
                  : Object.keys(tourData.tournament_type)[0].toUpperCase() ==
                      "CROWDFUNDED" &&
                    tourData.game_type.toUpperCase() === "SQUAD"
                  ? `$${(tourData.entry_prize * squadCount() * 0.6).toFixed(2)}`
                  : `$${(tourData.total_prize * 0.6).toFixed(2)}`
                : Object.keys(tourData.tournament_type)[0].toUpperCase() ===
                    "CROWDFUNDED" &&
                  tourData.game_type.toUpperCase() === "SINGLE"
                ? `$${(
                    tourData.entry_prize *
                    tourData?.users?.length *
                    0.5
                  ).toFixed(2)}`
                : Object.keys(tourData.tournament_type)[0].toUpperCase() ==
                    "CROWDFUNDED" && tourData.game_type.toUpperCase() === "DUO"
                ? `$${(tourData.entry_prize * squadCount() * 0.5).toFixed(2)}`
                : Object.keys(tourData.tournament_type)[0].toUpperCase() ==
                    "CROWDFUNDED" &&
                  tourData.game_type.toUpperCase() === "SQUAD"
                ? `$${(tourData.entry_prize * squadCount() * 0.5).toFixed(2)}`
                : `$${(tourData.total_prize * 0.5).toFixed(2)}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoldCard
