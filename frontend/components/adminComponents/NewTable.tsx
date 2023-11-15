import React, { useState } from "react";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import { Container } from "../../styles/commonStyles/Container.styles";
import icon from "../../assets/images/gamelogo.png";
import { Img } from "../../styles/commonStyles/Img";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import { Text } from "../../styles/commonStyles/Text";
import { useAppSelector } from "../../redux/hooks";
import NewModal from "../Popup/NewModal";

interface DataType {
  key: React.Key;
  username: any;
  type: any;
  game: any;
  players: any;
  prize: any;
  date: any;
}

const NewTable = () => {
  const dataState = useAppSelector((state) => state.tournamentData);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<DataType | null>(null);
  console.log("dataState", dataState);

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
        <Container key={record.key} display="flex">
          <Img src={icon} alt="" width="3rem" height="3rem" />
          <Wrapper margin="0 0 0 .5rem" display="flex" flexDirection="column">
            <Text fontsize=".8rem" fontWeight={600}>
              {record.game}
            </Text>
            <Text fontsize=".7rem">{record.username}</Text>
          </Wrapper>
        </Container>
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
        <Container>
          <Text
            onClick={() => {
              handleOpenModal(record);
            }}
            cursor="pointer"
            hovercolor="#2a80e3"
          >
            View
          </Text>
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
        </Container>
      ),
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
    <Container>
      {/* <Table
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
      )} */}
    </Container>
  );
};

export default NewTable;
