import React from "react";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import { Container } from "../../styles/commonStyles/Container.styles";
import icon from "../../assets/images/gamelogo.png";
import { Img } from "../../styles/commonStyles/Img";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import { Text } from "../../styles/commonStyles/Text";
import { useAppSelector } from "../../redux/hooks";

interface DataType {
  key: React.Key;
  username: any;
  type: any;
  game: any;
  players: any;
  prize: any;
  date: any;
}

const ConcludedTable = () => {
  const dataState = useAppSelector((state) => state.tournamentData);
  console.log("dataState", dataState);
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
    { title: ".", key: "operation", render: () => <a>View</a> },
  ];

  const data: any[] = [];

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
    <Table
      rowClassName={() => "rowClassName1"}
      columns={columns}
      dataSource={data}
    />
  );
};

export default ConcludedTable;
