import React from "react";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import OngoingTable from "./OngoingTable";
import NewTable from "./NewTable";
import PendingTable from "./PendingTable";
import ConcludedTable from "./ConcludedTable";

const AdminTabBar = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Ongoing`,
      children: <OngoingTable />,
    },
    {
      key: "2",
      label: `New`,
      children: <NewTable />,
    },
    {
      key: "3",
      label: `Pending`,
      children: <PendingTable />,
    },
    {
      key: "4",
      label: `Concluded`,
      children: <ConcludedTable />,
    },
  ];

  return (
    <Wrapper margin="2rem 0 0 0">
      <ConfigProvider
        theme={{
          token: {
            colorPrimaryActive: "#F6B8FC",
            colorPrimary: "#F6B8FC",
            colorPrimaryHover: "#F6B8FC",
            colorText: "#fff",
          },
        }}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </ConfigProvider>
    </Wrapper>
  );
};

export default AdminTabBar;
