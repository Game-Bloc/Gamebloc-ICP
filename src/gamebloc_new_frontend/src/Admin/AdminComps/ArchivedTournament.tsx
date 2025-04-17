import React, { useState } from "react"
import type { TableColumnsType } from "antd"
import { ConfigProvider, Select, Table, theme } from "antd"
import NewModal from "../../components/Modals/Newmodal"
import Search, { SearchProps } from "antd/es/input/Search"
import { FiSearch } from "react-icons/fi"
import { IoMdAdd } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import AdminCreateTournamentModal from "../AdminModals/AdminCreateTournamentModal"
import { useAppSelector } from "../../redux/hooks"

interface DataType {
  creator: string
  creator_id: string[]
  messages: any[]
  end_date: string
  entry_prize: number
  game: string
  game_type: any
  id_hash: string
  idx: number
  no_of_participants: number
  no_of_winners: number
  squad: any[]
  starting_date: string
  status: any
  title: string
  total_prize: number
  tournament_rules: string
  tournament_type: any
  users: any[]
  winners: any[]
  squad_points: []
  squad_in_game_names: []
  in_game_names: []
  points: []
  lobbies: []
}

const ArchivedTournament = () => {
  const navigate = useNavigate()
  const data = useAppSelector((state) => state.tournamentData)
  const [search, setSearch] = useState<string>("")
  const [openTournamentModal, setOpeTournamentnModal] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<DataType | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const archivedTournament = data
    .filter(
      (tour: any) => Object.keys(tour.status)[0].toUpperCase() === "ARCHIVED",
    )
    .map((tour: any) => tour)
  console.log("ArcivedTournament", archivedTournament)

  const dataSearch = archivedTournament.filter((obj) => {
    // Check if any key matches the search term
    const keyMatches = Object.keys(obj).some((key) =>
      key.toLowerCase().includes(search.toLowerCase()),
    )

    // Check if any value matches the search term
    const valueMatches = Object.values(obj).some((value) => {
      if (typeof value === "object" && value !== null) {
        // If the value is an object (nested object), check its keys
        return Object.keys(value).some((nestedKey) =>
          nestedKey.toLowerCase().includes(search.toLowerCase()),
        )
      } else {
        // Otherwise, convert the value to string and perform case-insensitive search
        return value.toString().toLowerCase().includes(search.toLowerCase())
      }
    })

    return keyMatches || valueMatches
  })

  const handleTournamenteModal = () => {
    setOpeTournamentnModal(!openTournamentModal)
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id_hash",
      key: "id_hash",
      render: (text: any, record: any) => (
        <p key={record.id_hash} className="text-[.85rem] ">
          {record.id_hash.substring(0, 3) +
            "..." +
            record.id_hash.substring(23, 26)}
        </p>
      ),
    },
    { title: "Creator", dataIndex: "creator", key: "creator" },
    { title: "Name", dataIndex: "title", key: "title" },
    {
      title: "Funding",
      dataIndex: "tournament_type",
      key: "tournament_type",
      render: (text: any, record: any) => (
        <p key={record.id_hash} className="text-[.85rem] ">
          {Object.keys(record.tournament_type)[0]}
        </p>
      ),
    },
    {
      title: "Mode",
      dataIndex: "game_type",
      key: "game_type",
      render: (text: any, record: any) => (
        <p key={record.id_hash} className="text-[.85rem] ">
          {record.game_type}
        </p>
      ),
    },
    {
      title: "Players",
      dataIndex: "no_of_participants",
      key: "no_of_participants",
    },
    {
      title: "Action",
      key: "operation",
      render: (text: any, record: any) => (
        <div key={record.id_hash} className="flex items-center cursor-pointer">
          <img
            onClick={() => navigate(`/admin-tournament-view/${record.id_hash}`)}
            src={`view.png`}
            alt=""
          />
        </div>
      ),
    },
  ]
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const handleDelete = () => {
    const newData = data.filter(
      (item) => !selectedRowKeys.includes(item.id_hash),
    )
    // setData(newData)
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
        <div className="flex  flex-wrap gap-4 items-center">
          <ConfigProvider
            theme={{
              algorithm: theme.defaultAlgorithm,
              token: {
                colorPrimaryActive: "#F6B8FC",
                colorPrimary: "#F6B8FC",
                colorPrimaryHover: "#F6B8FC",
                colorText: "#fff",
                colorBorder: "#595959",
                colorBgContainer: "#01070E",
                colorBgElevated: "#01070E",
                controlOutline: "transparent",
                colorTextBase: "#ffffff",
                controlItemBgActive: "#f6b8fc86",
              },
            }}
          >
            <Select
              className="mr-[2rem]"
              placeholder="Game Type"
              optionFilterProp="children"
              style={{ width: "fit-content" }}
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
              algorithm: theme.defaultAlgorithm,
              token: {
                colorPrimaryActive: "#F6B8FC",
                colorPrimary: "#F6B8FC",
                colorPrimaryHover: "#F6B8FC",
                colorText: "#fff",
                colorBorder: "#595959",
                colorBgContainer: "#01070E",
                colorBgElevated: "#01070E",
                controlOutline: "transparent",
                colorTextBase: "#ffffff",
                controlItemBgActive: "#f6b8fc86",
              },
            }}
          >
            <Select
              filterOption={filterOption}
              className="mr-[2rem]"
              placeholder="Game Mode"
              optionFilterProp="children"
              onChange={onDropDownChange}
              style={{ width: "fit-content" }}
              options={[
                {
                  value: "Single",
                  label: "Single",
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

          <div className=" flex items-center bg-[#01070E] rounded-[6px]  border-solid border-[1px] border-[#4f4f4f] hover:border-primary-second ">
            <FiSearch className="text-[#4f4f4f] ml-2" />
            <input
              onChange={onSearchChange}
              className="bg-[#01070E] ml-2 h-[2rem] rounded-[6px] placeholder:text-[#4f4f4f] placeholder:text-[.85rem] text-[.85rem]  focus:outline-none border-none focus:border-[transparent]  focus:ring-[transparent]"
              placeholder="search"
            />
          </div>
        </div>
        <div className="flex justify-center items-center ">
          {/* <button className="bg-[#303B9C] py-2 px-3 flex justify-around items-center mr-[2rem] ">
            <IoMdAdd className="text-white text-[1.1rem] mr-5" />
            <p
              onClick={handleTournamenteModal}
              className="text-[.85rem] text-white"
            >
              New Tournament
            </p>
          </button> */}
          {/* <button
            onClick={handleDelete}
            disabled={selectedRowKeys.length === 0}
            className=" hover:border-primary-second border-primary-second/50 border border-solid rounded-[3px] h-[2.3rem] w-[2.5rem] p-2 flex justify-around items-center cursor-pointer"
          >
            <img src={`delete.png`} className="m-0" alt="" />
          </button> */}
        </div>
      </div>
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
          rowSelection={rowSelection}
          rowClassName={() => "rowClassName1"}
          columns={columns}
          dataSource={dataSearch}
          rowKey={"id_hash"}
          scroll={{ x: true }}
        />
      </ConfigProvider>
      {openTournamentModal && (
        <AdminCreateTournamentModal modal={handleTournamenteModal} />
      )}
    </div>
  )
}

export default ArchivedTournament
