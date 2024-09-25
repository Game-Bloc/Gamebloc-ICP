import { ConfigProvider, Tabs, TabsProps } from "antd"
import React, { useState } from "react"
import TribunalsTable from "./TribunalsTable"
import TableLogic from "./TableLogic"

interface Props {
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

const TribunalBar = ({
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
}: Props) => {
  const [state, setState] = useState("1")

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Tribunal Results`,
      children: (
        <TribunalsTable
          setState={setState}
          tourData={tourData}
          game_type={game_type}
        />
      ),
    },
    {
      key: "2",
      label: `Admin Result`,
      children: (
        <TableLogic
          _point={_point}
          players={players}
          setSquadPoints={setSquadPoints}
          _squad_point={_squad_point}
          game_type={game_type}
          saveChanges={saveChanges}
          isLoading={isLoading}
          isAssigningPoints={isAssigningPoints}
          setPlayerPoints={setPlayerPoints}
          dataSearch={dataSearch}
          playerPoints={playerPoints}
          solo_mode={solo_mode}
          squad_mode={squad_mode}
          tourData={tourData}
          rowSelection={rowSelection}
          columns={columns}
        />
      ),
    },
  ]
  return (
    <div className="">
      <ConfigProvider
        theme={{
          token: {
            colorPrimaryActive: "#F6B8FC",
            colorPrimary: "#F6B8FC",
            colorPrimaryHover: "#F6B8FC",
            colorText: "#fff",
          },
        }}
      >
        <Tabs activeKey={state} onChange={setState} items={items} />
      </ConfigProvider>
    </div>
  )
}

export default TribunalBar
