import React, { useState } from "react"
import type { TableColumnsType } from "antd"
import { ConfigProvider, Select, Table, theme } from "antd"
import NewModal from "../../components/Modals/Newmodal"
import Search, { SearchProps } from "antd/es/input/Search"
import { FiSearch } from "react-icons/fi"
import { IoMdAdd } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import AdminCreateTournamentModal from "../AdminModals/AdminCreateTournamentModal"

interface DataType {
  id: React.Key
  creator: string
  name: string
  funding: string
  game_mode: string
  players: number
}

const NewTournamentTable = () => {
  const navigate = useNavigate()
  const [openTournamentModal, setOpeTournamentnModal] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const [selectedRow, setSelectedRow] = useState<DataType | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  //   const dataState = useAppSelector((state) => state.tournamentData);
  //   console.log("dataState", dataState);
  const [data, setData] = useState<any[]>([
    {
      id: "23232",
      creator: "Deonorla",
      name: "The Clash of the greatest",
      funding: "Crowdfunded",
      game_mode: "Solo",
      players: 100,
    },
    {
      id: "32232",
      creator: "Gamebloc",
      name: "The Revenge",
      funding: "Prepaid",
      game_mode: "Squad",
      players: 95,
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

  const handleTournamenteModal = () => {
    setOpeTournamentnModal(!openTournamentModal)
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // render: (text, record) => (
      //   <div key={record.id} className="flex items-center">
      //     <img src={`avatar.svg`} className="w-[3rem] m-0 h-[3rem]" alt="" />

      //     <div className="ml-[.5rem] flex flex-col">
      //       <p className="text-[.8rem] font-semibold ">{record.game}</p>
      //       <p className=" text-[.7rem]">{record.username}</p>
      //     </div>
      //   </div>
      // ),
    },
    { title: "Creator", dataIndex: "creator", key: "creator" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Funding", dataIndex: "funding", key: "funding" },
    { title: "Game_mode", dataIndex: "game_mode", key: "game_mode" },
    { title: "Players", dataIndex: "players", key: "players" },
    {
      title: "",
      key: "operation",
      render: (text, record) => (
        <div key={record.id} className="flex items-center cursor-pointer">
          <img
            onClick={() => navigate(`/admin-tournament-view/${record.id}`)}
            src={`view.png`}
            alt=""
          />
          <img src={`delete-red.png`} className="ml-3 cursor-pointer" alt="" />
        </div>
      ),
    },
  ]
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const handleDelete = () => {
    const newData = data.filter((item) => !selectedRowKeys.includes(item.id))
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

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  const onDropDownChange = (value: string) => {
    setSearch(value)
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
              filterOption={filterOption}
              onChange={onDropDownChange}
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
              filterOption={filterOption}
              className="mr-[2rem]"
              placeholder="Game Mode"
              optionFilterProp="children"
              onChange={onDropDownChange}
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
              onChange={onSearchChange}
              className="bg-[#141414] ml-2 h-[2rem] rounded-[6px] placeholder:text-[#4f4f4f] placeholder:text-[.85rem] text-[.85rem]  focus:outline-none border-none focus:border-[transparent]  focus:ring-[transparent]"
              placeholder="search"
            />
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <button className="bg-[#303B9C] py-2 px-3 flex justify-around items-center mr-[2rem] ">
            <IoMdAdd className="text-white text-[1.1rem] mr-5" />
            <p
              onClick={handleTournamenteModal}
              className="text-[.85rem] text-white"
            >
              New Tournament
            </p>
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
          rowKey={"id"}
        />
      </ConfigProvider>
      {openTournamentModal && (
        <AdminCreateTournamentModal modal={handleTournamenteModal} />
      )}
    </div>
  )
}

export default NewTournamentTable
