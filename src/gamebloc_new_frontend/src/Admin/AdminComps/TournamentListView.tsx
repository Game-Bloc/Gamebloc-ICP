import React, { useState, useEffect } from "react"
import { useAppSelector } from "../../redux/hooks"
import { ConfigProvider, Table, theme } from "antd"
import AssignPointsModal from "../AdminModals/AssignPointsModal"

interface Props {
  rowSelection: any
  columns: any[]
  dataSearch: any[]
  setPlayerPoints: any
  playerPoints: any
  tourData: any
  game_type: any
}

interface Points {
  position_points: number
  kill_points: number
  total_points: number
}

const transformTournamentData = (tournamentDataArray, userProfile) => {
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
      return {
        position: lobbyIndex * no_of_participants + index + 1,
        name: name,
        ign: ign,
        userId: id,
        principal: id.substring(0, 3) + "......" + id.substring(60, 64),
        position_points: 0,
        kill_points: 0,
        total_points: 0,
      }
    }),
  )

  // console.log("players:", players)
  return players
}

const TournamentListView = ({
  rowSelection,
  columns,
  dataSearch,
  setPlayerPoints,
  playerPoints,
  tourData,
  game_type,
}: Props) => {
  const userProfile = useAppSelector((state) => state.userProfile)
  const [dataSource, setDataSource] = useState(
    transformTournamentData(tourData, userProfile),
  )
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(null)

  useEffect(() => {
    const initialPoints: [string, string, Points][] = dataSource.map(
      (player) => [
        player.name,
        player.userId,
        {
          position_points: player.position_points,
          kill_points: player.kill_points,
          total_points: player.total_points,
        },
      ],
    )
    setPlayerPoints(initialPoints)
  }, [dataSource])

  const showModal = (player) => {
    setCurrentPlayer(player)
    setIsModalVisible(true)
  }
  // console.log("playerPoints", playerPoints)
  const hideModal = () => {
    setIsModalVisible(false)
    setCurrentPlayer(null)
  }
  const handleSave = (userId, points) => {
    const updatedPlayerPoints: any = playerPoints.map(([id, pts]) =>
      id === userId ? [id, points] : [id, pts],
    )

    setPlayerPoints(updatedPlayerPoints)

    const updatedData = dataSource.map((player) =>
      player.userId === userId ? { ...player, ...points } : player,
    )

    setDataSource(updatedData)
    hideModal()
  }

  const columnsWithActions = [
    ...columns,
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <div
          onClick={() => showModal(record)}
          key={record.position}
          className="flex items-center cursor-pointer"
        >
          <img src={`view.png`} alt="" />
        </div>
      ),
    },
  ]

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
          rowSelection={rowSelection}
          rowClassName={() => "rowClassName1"}
          columns={columnsWithActions}
          dataSource={dataSource}
          rowKey={"position"}
        />
      </ConfigProvider>

      {isModalVisible && currentPlayer && (
        <AssignPointsModal
          modal={hideModal}
          player={currentPlayer}
          onSave={(points) => handleSave(currentPlayer.userId, points)}
          game_type={game_type}
        />
      )}
    </div>
  )
}

export default TournamentListView
