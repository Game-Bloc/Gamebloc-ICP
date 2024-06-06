import React, { useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import {
  ConfigProvider,
  Table,
  Modal,
  InputNumber,
  Form,
  Button,
  theme,
} from "antd"
import AssignPointsModal from "../AdminModals/AssignPointsModal"
interface props {
  rowSelection: any
  columns: any[]
  dataSearch: any[]
}

const transformTournamentData = (tournamentDataArray, userProfile) => {
  if (!Array.isArray(tournamentDataArray) || tournamentDataArray.length === 0) {
    console.log("tournamentDataArray is not a valid array or is empty")
    return []
  }

  const tournamentData = tournamentDataArray[0]
  console.log("tournamentData:", tournamentData)

  const { in_game_names = [], no_of_participants = 0 } = tournamentData

  // Log the in_game_names to check its structure
  console.log("in_game_names:", in_game_names)

  // Safeguard for undefined or null in_game_names
  if (!Array.isArray(in_game_names) || in_game_names.length === 0) {
    console.log("in_game_names is not a valid array or is empty")
    return []
  }

  // Flatten the in_game_names array and map to player data
  const players = in_game_names.flatMap((lobby, lobbyIndex) =>
    lobby.map(([id, ign], index) => {
      console.log("id, ign:", id, ign)
      return {
        position: lobbyIndex * no_of_participants + index + 1,
        ign: ign,
        userId: id,
        name: userProfile.username,
        position_points: 0,
        kill_points: 0,
        total_points: 0,
      }
    }),
  )

  console.log("players:", players)
  return players
}

const TournamentListView = ({ rowSelection, columns, dataSearch }: props) => {
  const userProfile = useAppSelector((state) => state.userProfile)
  const [dataSource, setDataSource] = useState(
    transformTournamentData(dataSearch, userProfile),
  )
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [editingPlayer, setEditingPlayer] = useState(null)

  const handleEdit = (player) => {
    setEditingPlayer(player)
  }

  const showModal = (player) => {
    setCurrentPlayer(player)
    setIsModalVisible(true)
  }

  const hideModal = () => {
    setIsModalVisible(false)
    setCurrentPlayer(null)
  }

  const handleSave = (values) => {
    const updatedData = dataSource.map((player) =>
      player.position === currentPlayer.position
        ? {
            ...player,
            ...values,
            total_points:
              values.position_points +
              values.kill_points -
              (values.pointsDeduction || 0),
          }
        : player,
    )
    setDataSource(updatedData)
    setIsModalVisible(false)
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

      {isModalVisible && (
        <AssignPointsModal
          modal={hideModal}
          player={currentPlayer}
          onSave={handleSave}
        />
      )}
      {/* {openPlayerModal && <AssignPointsModal modal={handleModal} />} */}
    </div>
  )
}

export default TournamentListView
