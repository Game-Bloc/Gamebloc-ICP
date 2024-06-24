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

const SquadListView = ({ players }: prop) => {
  const squads = useAppSelector((state) => state.squad)
  const [dataSource, setDataSource] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(null)

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
          columns={columnsWithActions}
          dataSource={dataSource}
          rowKey="key"
        />
      </ConfigProvider>

      {isModalVisible && currentPlayer && (
        <AssignPointsModal
          modal={hideModal}
          player={currentPlayer}
          onSave={(points) => handleSave(currentPlayer.id, points)}
        />
      )}
    </div>
  )
}

export default SquadListView
