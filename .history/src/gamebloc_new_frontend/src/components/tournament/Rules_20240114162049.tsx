import React from "react"

interface Props {
  data: any
}

const Rules = ({ data }: Props) => {
  return (
    <div key={data.id_hash} className="">
      <div className="flex flex-col mx-4 max-h-[27rem]  overflow-x-hidden overflow-y-scroll">
        <p className="text-white">
          👥 Team Composition: Teams consist of at least 6 players: 1 Team Lead
          and 5 squad members. Each squad must have 3 primary players and 2
          substitutes, allowing for a maximum of 12 players with up to 4 subs.
          🚫Rules: Weapons: No shotguns allowed. Respawn: Unlimited respawns to
          keep the action intense. 🚷 Banned Classes: Ninja: Stealth
          capabilities disrupt fair play. Defender: Overpowered defensive
          advantages. Trap Master: Limits strategic mobility. Poltergeist:
          Unfair advantages in avoiding engagements. 🚗 Banned Vehicles:
          Helicopter: Excessive mobility disrupts fair competition. Tank:
          Overpowered firepower imbalance. ATV (All-Terrain Vehicle): Rapid
          mobility gives an unfair edge. 🔐 Additional Regulations: Participants
          must adhere to fair play and sportsmanship. The tournament will follow
          the latest CODM updates and patches.
        </p>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[13rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-2">
          <p className="font-semibold">Join Tournament</p>
        </button>
      </div>
    </div>
  )
}

export default Rules
