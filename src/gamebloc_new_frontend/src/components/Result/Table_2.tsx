import { ConfigProvider, Table, theme } from "antd"
import React from "react"
import FallbackLoading from "../Modals/FallBackLoader"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
interface prop {
  tourData: any
}

const Table_2 = ({ tourData }: prop) => {
  const { isLoading, multiSelect_user_profile } = useGameblocHooks()

  // Flatten and map the dataSource to the result array
  const result = tourData.flatMap((state) =>
    state.squad_points.flatMap((innerArray) =>
      innerArray.map(([squad_name, id, pointsObject]) => ({
        id,
        name: squad_name,
        squad_id: id.substring(0, 3) + "......" + id.substring(23, 26),
        killPoints: pointsObject.kill_points,
        totalPoints: pointsObject.total_points,
        positionPoints: pointsObject.position_points,
      })),
    ),
  )
  // Sort the result array by killPoints in descending order
  const sortedResult = result.sort((a, b) => b.totalPoints - a.totalPoints)

  // Add a position field based on the sorted array index
  const resultWithPosition = sortedResult.map((item, index) => ({
    ...item,
    position: index + 1,
  }))

  const columns = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    { title: "Squad Name", dataIndex: "name", key: "name" },
    { title: "Squad Id", dataIndex: "squad_id", key: "squad_id" },
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

export default Table_2
