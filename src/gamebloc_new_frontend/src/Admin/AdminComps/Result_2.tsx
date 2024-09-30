import React from "react"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import FallbackLoading from "../../components/Modals/FallBackLoader"
import { ConfigProvider, Table, theme } from "antd"

type prop = {
  tourData: any
  solo_mode: any
}
const Result_2 = ({ tourData, solo_mode }: prop) => {
  const { isLoading, multiSelect_user_profile } = useGameblocHooks()

  // Flatten and map the dataSource to the result array
  const result = tourData.flatMap((state) =>
    state?.[solo_mode].flatMap((innerArray) =>
      innerArray.map(([name, id, pointsObject]) => ({
        id,
        name: name,
        principal: id.substring(0, 3) + "......" + id.substring(60, 64),
        killPoints: pointsObject.kill_points,
        totalPoints: pointsObject.total_points,
        positionPoints: pointsObject.position_points,
      })),
    ),
  )


  const transformTournamentData = (tournamentDataArray) => {
    if (!Array.isArray(tournamentDataArray) || tournamentDataArray.length === 0) {
      console.log("tournamentDataArray is not a valid array or is empty")
      return []
    }
    const tournamentData = tournamentDataArray[0]
    // console.log("tournamentData:", tournamentData)

    const { in_game_names = [], no_of_participants = 0 } = tournamentData
    // console.log("in_game_names:", in_game_names)

    if (!Array.isArray(in_game_names) || in_game_names.length === 0) {
      console.log("in_game_names is not a valid array or is empty")
      return []
    }

    const players = in_game_names.flatMap((lobby, lobbyIndex) =>
      lobby.map(([name, id, ign], index) => {
        // console.log("id, ign:", id, ign)
        let point_payload = result.find((element) => element.id === id);
        return {
          position: lobbyIndex * no_of_participants + index + 1,
          name: name,
          ign: ign,
          userId: id,
          principal: id.substring(0, 3) + "......" + id.substring(60, 64),
          position_points: point_payload.positionPoints,
          kill_points: point_payload.kill_points,
          total_points: point_payload.total_points,
        }
      }),
    )

    // console.log("players:", players)
    return players
  }

  const result2 = transformTournamentData(tourData);
  console.log("sorted result view:", result2)

  // Sort the result array by killPoints in descending order
  const sortedResult = result2.sort((a, b) => b.totalPoints - a.totalPoints)

  // Add a position field based on the sorted array index
  const resultWithPosition = sortedResult.map((item, index) => ({
    ...item,
    position: index + 1,
  }))

  console.log("Result with Position", resultWithPosition)

  const columns = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    { title: "Username", dataIndex: "name", key: "name" },
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
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimaryActive: "#F6B8FC",
              colorPrimary: "#F6B8FC",
              colorPrimaryHover: "#F6B8FC",
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
          />
        </ConfigProvider>
      </div>
    )
  }
}

export default Result_2
