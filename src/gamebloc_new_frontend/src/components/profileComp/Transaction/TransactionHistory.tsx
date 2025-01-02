import { TableColumnsType, Table, ConfigProvider, theme } from "antd"
import React, { useState } from "react"
import { useAppSelector } from "../../../redux/hooks"

const TransactionHistory = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<any | null>(null)
  const dataState = useAppSelector((state) => state.transaction)
  console.log("dataState", dataState)

  const handleOpenModal = (record: any) => {
    setSelectedRow(record)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setSelectedRow(null)
    setOpenModal(false)
  }

  const columns: TableColumnsType<any> = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div key={record.id} className="flex items-center">
          <img
            src={
              record.action == "sent"
                ? `send.png`
                : record.action == "received"
                ? `dollar-coins.png`
                : `approve.png`
            }
            className="w-[1.5rem] m-0 h-[1.5rem]"
            alt=""
          />

          <div className="ml-[.5rem] flex flex-col">
            <p className="text-[.7rem] font-semibold ">{record.action}</p>
            {/* <p className=" text-[.7rem]">{record.username}</p> */}
          </div>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (
        <p
          className={` whitespace-nowrap ${
            record.action === "received"
              ? "text-[#3be58c]"
              : record.action === "sent"
              ? "text-[#e04438]"
              : "text-[#B88217]"
          } text-[.7rem] text-nowrap`}
        >
          {record.action === "received"
            ? `+${record.amount}`
            : record.action === "sent"
            ? `-${record.amount}`
            : `${record.amount}`}
          <span></span> ICP
        </p>
      ),
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (text, record) => (
        <p className=" whitespace-nowrap text-[.7rem]">
          {" "}
          {record.from
            ? record.from.substring(0, 7) +
              "......" +
              record.from.substring(58, 64)
            : ""}
        </p>
      ),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      render: (text, record) => (
        <p className=" whitespace-nowrap text-[.7rem]">
          {" "}
          {record.to
            ? record.to.substring(0, 7) + "......" + record.to.substring(58, 64)
            : ""}
        </p>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, record) => (
        <p className="whitespace-nowrap text-[.7rem] text-nowrap">
          {record.date}
        </p>
      ),
    },
  ]

  return (
    <div>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorBgContainer: "#030C15",
            colorBorder: "#595959",
            colorSplit: "#595959",
            controlItemBgActive: "#f6b8fc86",
          },
        }}
      >
        <Table
          rowClassName={() => "rowClassName1"}
          columns={columns}
          dataSource={dataState}
          scroll={{ x: true }}
          rowKey="id"
        />
      </ConfigProvider>
    </div>
  )
}

export default TransactionHistory
