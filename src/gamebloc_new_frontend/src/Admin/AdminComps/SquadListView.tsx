import React, { useEffect, useState } from "react"
import {
  ConfigProvider,
  Table,
  TableColumnsType,
  TableProps,
  theme,
} from "antd"
import { useAppSelector } from "../../redux/hooks"
import AssignPointsModal from "../AdminModals/AssignPointsModal"

type TableRowSelection<T> = TableProps<T>["rowSelection"]

type prop = {
  players: any[]
  setSquadPoints: React.Dispatch<
    React.SetStateAction<[string, string, Points][]>
  >
  setPlayerPoints: React.Dispatch<
    React.SetStateAction<[string, string, Points][]>
  >
  tourData: any
  game_type: any
}

interface Points {
  position_points: number
  kill_points: number
  total_points: number
}

interface DataType {
  key: React.ReactNode
  name: string
  id: string
  ign: string
  position_points: number
  kill_points: number
  total_points: number
  children?: any[]
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Squad Name",
    dataIndex: "squad_name",
    key: "squad_name",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "IGN",
    dataIndex: "ign",
    key: "ign",
  },
  {
    title: "Position Points",
    dataIndex: "position_points",
    key: "position_points",
  },
  {
    title: "Kill Points",
    dataIndex: "kill_points",
    key: "kill_points",
  },
  {
    title: "Total Points",
    dataIndex: "total_points",
    key: "total_points",
  },
]

const transformSquadData = (squads, players) => {
  return squads.map((squad) => {
    const members = squad.members.map((member) => {
      const player =
        players.find((p) => p.principalId === member.principal_id) || {}
      return {
        key: member.principal_id,
        name: member.name,
        ign: player.inGameName || "",
        id: member.principal_id,
        position_points: 0,
        kill_points: 0,
        total_points: 0,
      }
    })

    return {
      key: squad.id_hash,
      squad_name: squad.name,
      id: squad.id_hash,
      ign: "",
      position_points: 0,
      kill_points: 0,
      total_points: 0,
      children: members,
    }
  })
}

const SquadListView = ({
  players,
  setSquadPoints,
  setPlayerPoints,
  tourData,
  game_type,
}: prop) => {
  // const squads = useAppSelector((state) => state.squad)
  const [dataSource, setDataSource] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(null)

  const squads = tourData[0].squad
  console.log("players", players)
  // console.log("false", squads)

  useEffect(() => {
    const transformedData = transformSquadData(squads, players)
    setDataSource(transformedData)
  }, [squads, players])

  const showModal = (player) => {
    setCurrentPlayer(player)
    setIsModalVisible(true)
  }

  const hideModal = () => {
    setIsModalVisible(false)
    setCurrentPlayer(null)
  }

  const handleSave = (id, points) => {
    const updatedData = dataSource.map((squad) => {
      const updatedChildren = squad.children.map((member) =>
        member.id === id ? { ...member, ...points } : member,
      )

      const squadKillPoints = updatedChildren.reduce(
        (sum, member) => sum + member.kill_points,
        0,
      )
      const squadPositionPoints = updatedChildren.reduce(
        (sum, member) => sum + member.position_points,
        0,
      )
      const squadTotalPoints = updatedChildren.reduce(
        (sum, member) => sum + member.total_points,
        0,
      )

      return {
        ...squad,
        children: updatedChildren,
        kill_points: squadKillPoints,
        position_points: squadPositionPoints,
        total_points: squadTotalPoints,
      }
    })

    setDataSource(updatedData)

    // Update player points
    setPlayerPoints((prevPoints) => [
      ...prevPoints.filter(([_, pid]) => pid !== id),
      [currentPlayer.name, id, points],
    ])

    // Update squad points
    updatedData.forEach((squad) => {
      setSquadPoints((prevPoints) => [
        ...prevPoints.filter(([sname, sid]) => sid !== squad.id),
        [
          squad.squad_name,
          squad.id,
          {
            kill_points: squad.kill_points,
            position_points: squad.position_points,
            total_points: squad.total_points,
          },
        ],
      ])
    })

    hideModal()
  }

  const columnsWithActions = [
    ...columns,
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        !record.children && ( // Only show the action button for player rows, not squad rows
          <div
            onClick={() => showModal(record)}
            key={record.key}
            className="flex items-center cursor-pointer"
          >
            <img src={`view.png`} alt="View" />
          </div>
        ),
    },
  ]

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
          columns={columnsWithActions}
          dataSource={dataSource}
          rowKey="key"
          scroll={{ x: true }}
        />
      </ConfigProvider>

      {isModalVisible && currentPlayer && (
        <AssignPointsModal
          modal={hideModal}
          player={currentPlayer}
          onSave={(points) => handleSave(currentPlayer.id, points)}
          game_type={game_type}
        />
      )}
    </div>
  )
}

export default SquadListView
