import React, { useState } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import TournamentListView from "./TournamentListView"
import SquadListView from "./SquadListView"
import SquadResult from "./SquadResult"
import Results from "./Results"

interface Prop {
  _point: any
  _squad_point: any
  game_type: any
  saveChanges: () => void
  isLoading: boolean
  isAssigningPoints: boolean
  tourData: any
  rowSelection: any
  columns: any
  dataSearch: any
  setPlayerPoints: any
  playerPoints: any
  solo_mode: any
  squad_mode: any
  players: any
  setSquadPoints: any
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const TableLogic = ({
  _point,
  _squad_point,
  game_type,
  saveChanges,
  isLoading,
  isAssigningPoints,
  setPlayerPoints,
  dataSearch,
  playerPoints,
  solo_mode,
  squad_mode,
  tourData,
  rowSelection,
  columns,
  players,
  setSquadPoints,
}: Prop) => {
  const [color, setColor] = useState("#ffffff")

  return (
    <div className="flex mt-8 bg-[#070C12] p-4 flex-col ">
      <div className="flex mr-8 justify-between items-center">
        {_point ? (
          <p className="text-[1.2rem] ml-8 font-semibold text-white">
            Assign points
          </p>
        ) : (
          <p className="text-[1.2rem]  font-semibold text-white">
            Collated Result
          </p>
        )}

        {_point ? (
          <div className="flex justify-center items-center ">
            {game_type[0] === true ? (
              <button
                onClick={() => saveChanges()}
                className="bg-[#303B9C] py-2 px-3 flex justify-around items-center mr-[2rem] "
              >
                {isLoading ? (
                  <div className="flex items-center  gap-2">
                    <p className="text-[0.65rem] mr-2 text-white font-bold sm:text-[.85rem]">
                      Wait
                    </p>
                    <ClipLoader
                      color={color}
                      loading={isLoading}
                      cssOverride={override}
                      size={10}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                ) : (
                  <p className="text-[.85rem] text-white">Save Changes</p>
                )}
              </button>
            ) : (
              <button
                onClick={() => saveChanges()}
                className="bg-[#303B9C] py-2 px-3 flex justify-around items-center mr-[2rem] "
              >
                {isAssigningPoints ? (
                  <div className="flex items-center  gap-2">
                    <p className="text-[0.65rem] mr-2  text-white font-bold sm:text-[.85rem]">
                      Wait
                    </p>
                    <ClipLoader
                      color={color}
                      loading={isAssigningPoints}
                      cssOverride={override}
                      size={10}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                ) : (
                  <p className="text-[.85rem] text-white">Save Points</p>
                )}
              </button>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      {_squad_point ? (
        <div className="my-8 border border-solid border-[#2E3438] w-full" />
      ) : (
        <></>
      )}
      {game_type[0] === true ? (
        <>
          {_point ? (
            <TournamentListView
              tourData={tourData}
              rowSelection={rowSelection}
              columns={columns}
              dataSearch={dataSearch}
              setPlayerPoints={setPlayerPoints}
              playerPoints={playerPoints}
              game_type={game_type}
            />
          ) : (
            // <TournamentGridView players={players} />
            <Results tourData={tourData} solo_mode={solo_mode} />
          )}
        </>
      ) : (
        <>
          {_squad_point ? (
            <SquadListView
              tourData={tourData}
              players={players}
              setSquadPoints={setSquadPoints}
              setPlayerPoints={setPlayerPoints}
              game_type={game_type}
            />
          ) : (
            <SquadResult
              tourData={tourData}
              solo_mode={solo_mode}
              squad_mode={squad_mode}
            />
          )}
        </>
      )}
    </div>
  )
}

export default TableLogic
