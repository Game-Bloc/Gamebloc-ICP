import React from "react"
import Results from "./Results"
import SquadResult from "./SquadResult"

interface Props {
  tourData: any
  solo_mode: any
  squad_mode: any
  game_type: any
}

const TribunalsTable = ({
  tourData,
  solo_mode,
  squad_mode,
  game_type,
}: Props) => {
  return (
    <div className="">
      <p className="text-[1.2rem]  font-semibold text-white">
        Tribunal Collated Results
      </p>
      <div className="mt-4">
        <p className="text-[1.2rem]  font-semibold text-white">
          Tribunal Mod 1
        </p>
        {game_type[0] === true ? (
          <Results tourData={tourData} solo_mode={"points_vector_mod_1"} />
        ) : (
          <SquadResult
            tourData={tourData}
            solo_mode={"points_vector_mod_1"}
            squad_mode={"squad_vector_mod_1"}
          />
        )}
      </div>
      <div className="mt-4">
        <p className="text-[1.2rem]  font-semibold text-white">
          Tribunal Mod 2
        </p>
        {game_type[0] === true ? (
          <Results tourData={tourData} solo_mode={"points_vector_mod_2"} />
        ) : (
          <SquadResult
            tourData={tourData}
            solo_mode={"points_vector_mod_2"}
            squad_mode={"squad_vector_mod_2"}
          />
        )}
      </div>
      <div className="mt-4">
        <p className="text-[1.2rem]  font-semibold text-white">
          Tribunal Mod 3
        </p>
        {game_type[0] === true ? (
          <Results tourData={tourData} solo_mode={"points_vector_mod_3"} />
        ) : (
          <SquadResult
            tourData={tourData}
            solo_mode={"points_vector_mod_3"}
            squad_mode={"squad_vector_mod_3"}
          />
        )}
      </div>
    </div>
  )
}

export default TribunalsTable
