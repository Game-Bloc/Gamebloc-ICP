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

  // Sort the result array by killPoints in descending order
  const sortedResult = result.sort((a, b) => b.totalPoints - a.totalPoints)

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

export default Results
