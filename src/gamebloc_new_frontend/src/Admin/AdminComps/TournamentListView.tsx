import { ConfigProvider, Table, theme } from "antd"
import React, { useState } from "react"

interface props {
  rowSelection: any
  columns: any[]
  dataSearch: any[]
}

const TournamentListView = ({ rowSelection, columns, dataSearch }: props) => {
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
          columns={columns}
          dataSource={dataSearch}
          rowKey={"position"}
        />
      </ConfigProvider>
    </div>
  )
}

export default TournamentListView
