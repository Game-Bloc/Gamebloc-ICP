import { ConfigProvider, Table, theme } from "antd"
import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import { Principal } from "@dfinity/principal"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import FallbackLoading from "../../components/Modals/FallBackLoader"

// // Mock function for multiSelect_user_profile
// const multiSelect_user_profile = async (principal) => {
//   // Replace this with the actual API call
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ username: `User_${principal}` });
//     }, 1000);
//   });
// };

const Results = () => {
  const { isLoading, multiSelect_user_profile } = useGameblocHooks()
  const dataSource = useAppSelector((state) => state.tournamentData)

  const result = dataSource.flatMap((state) =>
    state.points.flatMap((innerArray) => {
      //   console.log("Inner Array:", innerArray) // Debug log
      return innerArray.map(([id, pointsObject]) => {
        // console.log("ID:", id) // Debug log
        // console.log("Points Object:", pointsObject) // Debug log
        return {
          id,
          killPoints: pointsObject.kill_points,
          totalPoints: pointsObject.total_points,
          positionPoints: pointsObject.position_points,
        }
      })
    }),
  )

  console.log("Result", result)

  const columns = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    { title: "IGN", dataIndex: "ign", key: "ign" },
    { title: "Principal", dataIndex: "principal", key: "principal" },
    {
      title: "Position Points",
      dataIndex: "position_points",
      key: "position_points",
    },
    { title: "Kill Points", dataIndex: "kill_points", key: "kill_points" },
    { title: "Total Points", dataIndex: "total_points", key: "total_points" },
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
            //   rowSelection={rowSelection}
            rowClassName={() => "rowClassName1"}
            //   dataSource={dataSource}
            rowKey={"position"}
          />
        </ConfigProvider>
      </div>
    )
  }
}

export default Results
