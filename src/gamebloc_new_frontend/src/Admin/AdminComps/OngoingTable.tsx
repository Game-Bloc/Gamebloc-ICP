import React, { useState } from "react";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import NewModal from "../../components/Modals/Newmodal";

interface DataType {
  key: React.Key;
  username: any;
  type: any;
  game: any;
  players: any;
  prize: any;
  date: any;
}

const OngoingTable = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<DataType | null>(null);
  //   const dataState = useAppSelector((state) => state.tournamentData);
  //   console.log("dataState", dataState);

  const handleOpenModal = (record: DataType) => {
    setSelectedRow(record);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setOpenModal(false);
  };

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
        <div>
          <p
            onClick={() => {
              handleOpenModal(record);
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
  ];

  const data: any[] = [
    {
      key: 1,
      username: "Deonorla",
      type: "CrowdFunded",
      game: "Call of DUty",
      players: 34,
      prize: "$2",
      date: "20.Feb.2024",
    },
    {
      key: 1,
      username: "DFinisher",
      type: "CrowdFunded",
      game: "Spider",
      players: 94,
      prize: "$5",
      date: "2.Feb.2024",
    },
  ];
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
    <div>
      <Table
        rowClassName={() => "rowClassName1"}
        columns={columns}
        dataSource={data}
      />
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
  );
};

export default OngoingTable;
