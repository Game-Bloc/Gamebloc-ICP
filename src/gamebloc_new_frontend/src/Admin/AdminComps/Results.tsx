import { ConfigProvider, Table, theme } from "antd"
import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import FallbackLoading from "../../components/Modals/FallBackLoader"

type prop = {
  tourData: any
  solo_mode: any
}

const Results = ({ tourData, solo_mode }: prop) => {
  const { isLoading, multiSelect_user_profile } = useGameblocHooks()

  // Flatten and map the dataSource to the result array
  const result = tourData[0]?.[solo_mode].flatMap((point, pointIndex) =>
    point.map(([name, id, pointsObject], index) => {
      return {
        id,
        name: name,
        principal: id.substring(0, 3) + "......" + id.substring(60, 64),
        killPoints:
          pointsObject?.kill_points == undefined
            ? 0
            : pointsObject?.kill_points,
        totalPoints:
          pointsObject?.total_points == undefined
            ? 0
            : pointsObject?.total_points,
        positionPoints:
          pointsObject?.position_points == undefined
            ? 0
            : pointsObject?.position_points,
      }
    }),
  )

  const transformTournamentData = (tournamentDataArray) => {
    if (
      !Array.isArray(tournamentDataArray) ||
      tournamentDataArray.length === 0
    ) {
      console.log("tournamentDataArray is not a valid array or is empty")
      return []
    }
    const tournamentData = tournamentDataArray[0]
    const { in_game_names = [], no_of_participants = 0 } = tournamentData
    if (!Array.isArray(in_game_names) || in_game_names.length === 0) {
      console.log("in_game_names is not a valid array or is empty")
      return []
    }

    const players = in_game_names.flatMap((lobby, lobbyIndex) =>
      lobby.map(([name, id, ign], index) => {
        let point_payload = result.find((element) => element.id === id)
        return {
          position: lobbyIndex * no_of_participants + index + 1,
          name: name,
          ign: ign,
          userId: id,
          principal: id.substring(0, 3) + "......" + id.substring(60, 64),
          positionPoints: point_payload?.positionPoints,
          killPoints: point_payload?.killPoints,
          totalPoints: point_payload?.totalPoints,
        }
      }),
    )
    return players
  }

  const result2 = transformTournamentData(tourData)

  // Sort the result array by killPoints in descending order
  const sortedResult = result2.sort((a, b) => b.totalPoints - a.totalPoints)

  // Add a position field based on the sorted array index
  const resultWithPosition = sortedResult.map((item, index) => ({
    ...item,
    position: index + 1,
  }))

  // console.log("Result with Position", resultWithPosition)

  const columns = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    { title: "Username", dataIndex: "name", key: "name" },
    { title: "IGN", dataIndex: "ign", key: "ign" },
    { title: "Principal", dataIndex: "principal", key: "principal" },
    {
      title: "Position Points",
      dataIndex: "positionPoints",
      key: "positionPoints",
    },
    { title: "Kill Points", dataIndex: "killPoints", key: "killPoints" },
    { title: "Total Points", dataIndex: "totalPoints", key: "totalPoints" },
  ]

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <FallbackLoading />
      </div>
    )
  } else {
    return (
      <div className="mt-4">
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
              colorBgContainer: "#030C15",
              colorBorder: "#595959",
              colorSplit: "#595959",
              controlItemBgActive: "#f6b8fc86",
              colorText: "#fff",
            },
          }}
        >
          <Table
            // rowSelection={rowSelection}
            columns={columns}
            rowClassName={() => "rowClassName1"}
            dataSource={resultWithPosition}
            rowKey={"position"}
            scroll={{ x: true }}
          />
        </ConfigProvider>
      </div>
    )
  }
}

export default Results
