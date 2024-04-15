import React, { useState } from "react"
import type { TableColumnsType } from "antd"
import { ConfigProvider, Select, Table, theme } from "antd"
import NewModal from "../../components/Modals/Newmodal"
import Search, { SearchProps } from "antd/es/input/Search"
import { FiSearch } from "react-icons/fi"
import { IoMdAdd } from "react-icons/io"

interface DataType {
  key: React.Key
  username: any
  type: any
  game: any
  players: any
  prize: any
  date: any
}

const OngoingTable = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const [selectedRow, setSelectedRow] = useState<DataType | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  //   const dataState = useAppSelector((state) => state.tournamentData);
  //   console.log("dataState", dataState);
  const [data, setData] = useState<DataType[]>([
    {
      key: 1,
      username: "Deonorla",
      type: "CrowdFunded",
      game: "Call of Duty",
      players: 34,
      prize: "$2",
      date: "20.Feb.2024",
    },
    {
      key: 2,
      username: "DFinisher",
      type: "CrowdFunded",
      game: "Spider",
      players: 94,
      prize: "$5",
      date: "2.Feb.2024",
    },
  ])

  const dataSearch = data.filter((obj) => {
    return Object.keys(obj).some((key) =>
      obj[key]
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase()),
    )
  })

  const handleOpenModal = (record: DataType) => {
    setSelectedRow(record)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setSelectedRow(null)
    setOpenModal(false)
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: "Tournament Title",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <div key={record.key} className="flex items-center">
          <img src={`avatar.svg`} className="w-[3rem] m-0 h-[3rem]" alt="" />

          <div className="ml-[.5rem] flex flex-col">
            <p className="text-[.8rem] font-semibold ">{record.game}</p>
            <p className=" text-[.7rem]">{record.username}</p>
          </div>
        </div>
      ),
    },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Game", dataIndex: "game", key: "game" },
    { title: "Players", dataIndex: "players", key: "players" },
    { title: "Prize", dataIndex: "prize", key: "prize" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: ".",
      key: "operation",
      render: (text, record) => (
        <div key={record.key}>
          <p
            onClick={() => {
              handleOpenModal(record)
            }}
            className="hover:text-primary-second text-sm cursor-pointer text-white"
          >
            View
          </p>
          {/* {openModal && (
            <NewModal
              key={record.key}
              modal={setOpenModal}
              name={record.username}
              gameName={record.game}
              startDate={record.date}
              entryPrize={record.prize}
              gameType={record.type}
              playersCount={record.players}
            />
          )} */}
        </div>
      ),
    },
  ]
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const handleDelete = () => {
    const newData = data.filter((item) => !selectedRowKeys.includes(item.key))
    setData(newData)
    setSelectedRowKeys([])
  }

  const onSearchChange = (event: any) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  // const data = dataState.map((item, index) => ({
  //   key: index,
  //   username: item.username,
  //   type: item.tournamentType,
  //   game: item.gameName,
  //   players: item.participants.length,
  //   prize: item.entryPrize,
  //   date: item.date,
  // }));

  return (
    <div className="">
      <div className="flex justify-between items-center my-8">
        <div className="flex items-center">
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
            }}
          >
            <Select
              className="mr-[2rem]"
              placeholder="Game Type"
              optionFilterProp="children"
              options={[
                {
                  value: "Prepaid",
                  label: "Prepaid",
                },
                {
                  value: "Crowdfunded",
                  label: "Crowdfunded",
                },
              ]}
            />
          </ConfigProvider>
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
            }}
          >
            <Select
              className="mr-[2rem]"
              placeholder="Game Mode"
              optionFilterProp="children"
              options={[
                {
                  value: "Solo",
                  label: "Solo",
                },
                {
                  value: "Duo",
                  label: "Duo",
                },
                {
                  value: "Squad",
                  label: "Squad",
                },
              ]}
            />
          </ConfigProvider>

          <div className=" flex items-center bg-[#141414] rounded-[6px]  border-solid border-[1px] border-[#4f4f4f] hover:border-primary-second ">
            <FiSearch className="text-[#4f4f4f] ml-2" />
            <input
              value={search}
              onChange={onSearchChange}
              className="bg-[#141414] ml-2 h-[2rem] rounded-[6px] placeholder:text-[#4f4f4f] placeholder:text-[.85rem] text-[.85rem]  focus:outline-none border-none focus:border-[transparent]  focus:ring-[transparent]"
              placeholder="search"
            />
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <button className="bg-[#303B9C] py-2 px-3 flex justify-around items-center mr-[2rem] ">
            <IoMdAdd className="text-white text-[1.1rem] mr-5" />
            <p className="text-[.85rem] text-white">New Tournament</p>
          </button>
          <button
            onClick={handleDelete}
            disabled={selectedRowKeys.length === 0}
            className=" hover:border-primary-second border-primary-second/50 border border-solid rounded-[3px] h-[2.3rem] w-[2.5rem] p-2 flex justify-around items-center cursor-pointer"
          >
            <img src={`delete.png`} className="m-0" alt="" />
          </button>
        </div>
      </div>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Table
          rowSelection={rowSelection}
          rowClassName={() => "rowClassName1"}
          columns={columns}
          dataSource={dataSearch}
        />
      </ConfigProvider>
      {selectedRow && (
        <NewModal
          modal={handleCloseModal}
          name={selectedRow.username}
          gameName={selectedRow.game}
          startDate={selectedRow.date}
          entryPrize={selectedRow.prize}
          gameType={selectedRow.type}
          playersCount={selectedRow.players}
        />
      )}
    </div>
  )
}

export default OngoingTable
