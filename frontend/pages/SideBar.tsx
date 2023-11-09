import React, { useState } from "react";
import { Text } from "../styles/commonStyles/Text";
import { Wrapper } from "../styles/commonStyles/Wrapper";
import { CustomContainer } from "../styles/custom/CustomContainer";
import {
  OverViewIcon,
  TournamentIcon,
  GameIcon,
  Friends,
  NewsIcon,
} from "../styles/icon/Icons";

import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "../styles/commonStyles/Container.styles";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
const SideBar = () => {
  const navigate = useNavigate();
  const [toggleOverview, setToggleOverview] = useState<boolean>(false);
  const [toggleTournament, setToggleTournament] = useState<boolean>(false);

  // submenu keys of first level

  const items: MenuItem[] = [
    getItem(
      <CustomContainer
        display="flex"
        flexDirection="row"
        alignItems="center"
        mdjustifycontent="center"
        height="fit-content"
        width="100%"
        margin="1rem"
        mdmargin="0 0 0 3rem"
        cursor="pointer"
        onClick={() => navigate("/home")}
      >
        <Text
          className="text"
          color="#F6B8FC"
          fontWeight={600}
          fontsize=".8rem"
          mddisplay="none"
        >
          Overview
        </Text>
      </CustomContainer>,

      "sub1",

      <OverViewIcon className="icon" color="#F6B8FC" />
    ),
    getItem(
      <CustomContainer
        display="flex"
        flexDirection="row"
        alignItems="center"
        mdjustifycontent="center"
        height="fit-content"
        width="100%"
        margin="1rem"
        mdmargin="0 0 0 3rem"
        cursor="pointer"
      >
        <Text
          className="text"
          color="#F6B8FC"
          fontWeight={600}
          fontsize=".8rem"
          mddisplay="none"
        >
          Tournament
        </Text>
      </CustomContainer>,
      "sub2",

      <TournamentIcon className="icon" color="#F6B8FC" />,

      [
        getItem(
          <Text
            hovercolor="#F6B8FC"
            color="#c3c2c2"
            fontWeight={600}
            fontsize=".8rem"
            onClick={() => navigate("/active-tournament")}
          >
            Active Tournament
          </Text>,
          "5"
        ),
        getItem(
          <Text
            hovercolor="#F6B8FC"
            color="#c3c2c2"
            fontWeight={600}
            fontsize=".8rem"
            onClick={() => navigate("/active-tournament")}
          >
            CrowFunded
          </Text>,
          "6"
        ),
      ]
    ),
    // getItem(
    //   <CustomContainer
    //     display="flex"
    //     flexDirection="row"
    //     alignItems="center"
    //     mdjustifycontent="center"
    //     height="fit-content"
    //     width="100%"
    //     margin="1rem"
    //     mdmargin="0 0 0 3rem"
    //     cursor="pointer"
    //     onClick={() =>
    //       navigate(
    //         "/b3d7c2d4-58d4-4d40-b143-f15f344ee9a9/e06revg77353098e36/make-admin"
    //       )
    //     }
    //   >
    //     <Text
    //       className="text"
    //       color="#F6B8FC"
    //       fontWeight={600}
    //       fontsize=".8rem"
    //       mddisplay="none"
    //     >
    //       Admin
    //     </Text>
    //   </CustomContainer>,

    //   "sub3",

    //   <TournamentIcon className="icon" color="#F6B8FC" />
    // ),
  ];

  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Wrapper
      position="fixed"
      backgroundColor="#01070E"
      left="0px"
      height="100vh"
      width="17%"
      top="6.2rem"
      borderRight="1px solid #F6B8FC"
      display="flex"
      flexDirection="column"
      xmdisplay="none"
    >
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          height: "100vh",
          marginTop: "3rem",
          backgroundColor: " #01070E",
        }}
        items={items}
      />
    </Wrapper>
  );
};

export default SideBar;

// <Wrapper mddisplay="none">

//         {" "}
//         <br />
//         <br />

// </Wrapper>

// <CustomContainer
//   display="flex"
//   flexDirection="row"
//   alignItems="center"
//   mdjustifycontent="center"
//   height="fit-content"
//   width="100%"
//   margin="1rem"
//   cursor="pointer"
//   maxdisplay="none"
//   onClick={() => setToggleTournament(!toggleTournament)}
// >
//   <Wrapper
//     padding=".4rem .5rem"
//     className="wrapper"
//     borderRadius="8px"
//     margin="0 1rem 0 0"
//   >
//     <TournamentIcon className="icon" />
//   </Wrapper>
//   <NavBarLink3
//     to="/error-page"
//     className={({ isActive, isPending }) =>
//       isPending ? "pending" : isActive ? "active" : ""
//     }
//   >
//     Tournament
//   </NavBarLink3>
//   {toggleTournament && (
//     <Container
//       position="absolute"
//       backgroundColor="#01070E"
//       width="100%"
//       top="15%"
//       right="0rem"
//       borderStyle="solid"
//       borderWidth="1px"
//       borderColor="#2a2a2a"
//       zIndex="10000"
//       padding=".6rem"
//       borderRadius="10px"
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       maxdisplay="none"
//       flexDirection="column"
//     >
//       <Text
//         hovercolor="#F6B8FC"
//         color="#fff"
//         fontWeight={600}
//         fontsize=".8rem"
//         backgroundColor="#01070E"
//         onClick={() => navigate("/active-tournament")}
//       >
//         Active Tournament
//       </Text>
//       <Text
//         hovercolor="#F6B8FC"
//         margin="1rem 0 0 0"
//         color="#fff"
//         fontWeight={600}
//         fontsize=".8rem"
//         backgroundColor="#01070E"
//         onClick={() => navigate("")}
//       >
//         Crowdfunded
//       </Text>
//     </Container>
//   )}
// </CustomContainer>

// <CustomContainer
//   display="flex"
//   flexDirection="row"
//   alignItems="center"
//   mdjustifycontent="center"
//   height="fit-content"
//   width="100%"
//   margin="1rem"
//   cursor="pointer"
// >
//   <Wrapper
//     padding=".4rem .5rem"
//     className="wrapper"
//     borderRadius="8px"
//     margin="0 1rem 0 0"
//   >
//     <GameIcon className="icon" />
//   </Wrapper>
//   <NavBarLink3
//     to="/error-page"
//     className={({ isActive, isPending }) =>
//       isPending ? "pending" : isActive ? "active" : ""
//     }
//   >
//     Game
//   </NavBarLink3>
// </CustomContainer>

// <CustomContainer
//   display="flex"
//   flexDirection="row"
//   alignItems="center"
//   mdjustifycontent="center"
//   height="fit-content"
//   width="100%"
//   margin="1rem"
//   cursor="pointer"
// >
//   <Wrapper
//     padding=".4rem .5rem"
//     className="wrapper"
//     borderRadius="8px"
//     margin="0 1rem 0 0"
//   >
//     <Friends className="icon" />
//   </Wrapper>
//   <Text
//     className="text"
//     color="#fff"
//     fontWeight={600}
//     fontsize=".8rem"
//     mddisplay="none"
//   >
//     Friends
//   </Text>
// </CustomContainer>

// <CustomContainer
//   display="flex"
//   flexDirection="row"
//   alignItems="center"
//   mdjustifycontent="center"
//   height="fit-content"
//   width="100%"
//   margin="1rem"
//   cursor="pointer"
// >
//   <Wrapper
//     padding=".4rem .5rem"
//     className="wrapper"
//     borderRadius="8px"
//     margin="0 1rem 0 0"
//   >
//     <NewsIcon className="icon" />
//   </Wrapper>
//   <Text
//     className="text"
//     color="#fff"
//     fontWeight={600}
//     fontsize=".8rem"
//     mddisplay="none"
//   >
//     News
//   </Text>
// </CustomContainer>

const NavBarLink = styled(NavLink)`
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  color: #fff;
  &:hover {
    color: #f6b8fc;
  }
  &.active {
    color: #f6b8fc;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

const MenuOption2 = styled(NavLink)`
  font-size: 0.7rem;
  font-weight: 600;
  text-decoration: none;
  color: #fff;
  margin: 1rem 0rem 1rem 3.5rem;
  &:hover {
    color: #f6b8fc;
  }
  &.active {
    color: #f6b8fc;
  }
`;
const NavBarLink3 = styled(NavLink)`
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  color: #fff;
  &:hover {
    color: #f6b8fc;
  }
  &.active {
    color: #f6b8fc;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;
const MenuOption1 = styled(NavLink)`
  font-size: 0.7rem;
  font-weight: 600;
  text-decoration: none;
  color: #fff;
  margin: 1rem 0 1rem 3.5rem;
  &:hover {
    color: #f6b8fc;
  }
  &.active {
    color: #f6b8fc;
  }
`;
