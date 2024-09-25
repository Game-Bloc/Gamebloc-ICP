import React, { useState } from "react"
import Results from "./Results"
import SquadResult from "./SquadResult"
import ClipLoader from "react-spinners/ClipLoader"

interface Props {
  tourData: any
  game_type: any
  setState: React.Dispatch<React.SetStateAction<string>>
  _point: any
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const TribunalsTable = ({ tourData, game_type, setState, _point }: Props) => {
  const isEnding = false
  const updating = false
  const [color, setColor] = useState("#ffffff")

  return (
    <div className="mt-4">
      {_point ? (
        <div> </div>
      ) : (
        <div className="flex justify-end w-full  mt-4">
          <div className="flex justify-between  gap-4 items-center ">
            <button
              //   onClick={() => setEndModal(true)}
              className="bg-[#303B9C]  flex justify-center items-center rounded-[7px] py-[.5rem] px-[1rem] h-[2.5rem] cursor-pointer"
            >
              {isEnding ? (
                <div className="flex items-center  gap-2">
                  <p className="text-[0.65rem] mr-2 text-white font-bold sm:text-[.85rem]">
                    Wait
                  </p>
                  <ClipLoader
                    color={color}
                    loading={isEnding}
                    cssOverride={override}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                <>
                  {/* <PiPowerBold className="text-white text-[1.5rem] rotate-180" /> */}
                  <p className="ml-[.4rem] text-white text-[.8rem]"> Merge</p>
                </>
              )}
            </button>
            <button
              onClick={() => setState("2")}
              className="bg-[#BB1E10] flex justify-center items-center rounded-[7px] py-[.5rem] px-[1rem] h-[2.5rem] cursor-pointer"
            >
              {updating ? (
                <div className="flex items-center  gap-2">
                  <p className="text-[0.65rem] mr-2 text-white font-bold sm:text-[.85rem]">
                    Wait
                  </p>
                  <ClipLoader
                    color={color}
                    loading={updating}
                    cssOverride={override}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                <>
                  {/* <PiPowerBold className="text-white text-[1.5rem] rotate-180" /> */}
                  <p className="ml-[.4rem] text-white text-[.8rem]">
                    {" "}
                    Override
                  </p>
                </>
              )}
            </button>
          </div>
        </div>
      )}
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
