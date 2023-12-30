import React from "react";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import OngoingTable from "./OngoingTable";

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
      children: <div className="text-white">New</div>,
    },
    {
      key: "3",
      label: `Pending`,
      children: <div className="text-white">Pending</div>,
    },
    {
      key: "4",
      label: `Concluded`,
      children: <div className="text-white">Concluded</div>,
    },
  ];
  return (
    <div className="">
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
    </div>
  );
};

export default AdminTabBar;
