import { TableColumnsType, Table } from "antd"
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
            src={record.action == "sent" ? `send.png` : `dollar-coins.png`}
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
        <p key={record.id} className=" text-[.7rem]">
          {record.amount}
        </p>
      ),
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (text, record) => (
        <p key={record.id} className=" text-[.7rem]">
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
        <p key={record.id} className=" text-[.7rem]">
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
        <p key={record.id} className=" text-[.7rem]">
          {record.date}
        </p>
      ),
    },
  ]

  const data: any[] = [
    {
      key: 1,
      action: "Sent",
      amount: "12 ICP",
      from: "fbd9bced65f2b86318f18370a75c2720c38b8ac43abadd4df1ed5aac38685585",
      to: "3dba5f1057334d52d697e37c357433b007fcb00a2a0a16edf2e19620aaca1b08",
      date: "20.Feb.2024",
    },
    {
      key: 2,
      action: "Recieved",
      amount: "20 ICP",
      from: "fbd9bced65f2b86318f18370a75c2720c38b8ac43abadd4df1ed5aac38685585",
      to: "3dba5f1057334d52d697e37c357433b007fcb00a2a0a16edf2e19620aaca1b08",
      date: "20.Feb.2024",
    },
  ]

  return (
    <div>
      <Table
        rowClassName={() => "rowClassName1"}
        columns={columns}
        dataSource={dataState}
        scroll={{ x: true }}
      />
      {/* {selectedRow && (
        <NewModal
          modal={handleCloseModal}
          name={selectedRow.username}
          gameName={selectedRow.game}
          startDate={selectedRow.date}
          entryPrize={selectedRow.prize}
          gameType={selectedRow.type}
          playersCount={selectedRow.players}
        />
      )} */}
    </div>
  )
}

export default TransactionHistory
