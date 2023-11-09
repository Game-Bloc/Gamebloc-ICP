import { CTable } from "@coreui/react";
import { Container } from "../../styles/commonStyles/Container.styles";
import "./index.css";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import { Paragraph } from "../../styles/commonStyles/Paragraph";
import { RightArrow2 } from "../../styles/icon/Icons";
import React from "react";
const Table = () => {
  const columns = [
    {
      key: "id",
      label: "S/N",
      _props: { scope: "col", className: "custom-class" },
    },
    {
      key: "class",
      label: "Tournament Title",
      _props: { scope: "col", className: "custom-class" },
    },
    {
      key: "heading_1",
      label: "Participants",
      _props: { scope: "col", className: "custom-class" },
    },
    {
      key: "heading_2",
      label: "Price",
      _props: { scope: "col", className: "custom-class" },
    },
    {
      key: "heading_3",
      label: "Position",
      _props: { scope: "col", className: "custom-class" },
    },
  ];

  const items = [
    {
      id: 1,
      class: "Call of duty mobile near death edition",
      heading_1: "7",
      heading_2: "$100",
      heading_3: "4th",
      _cellProps: {
        id: { scope: "row", className: "custom-class" },
        class: { className: "custom-class" },
        heading_1: { className: "custom-class" },
        heading_2: { className: "custom-class" },
        heading_3: { className: "custom-class" },
      },
    },
    {
      id: 2,
      class: "Call of duty mobile near death edition",
      heading_1: "10",
      heading_2: "$157",
      heading_3: "6th",
      _cellProps: {
        id: { scope: "row", className: "custom-class" },
        class: { className: "custom-class" },
        heading_1: { className: "custom-class" },
        heading_2: { className: "custom-class" },
        heading_3: { className: "custom-class" },
      },
    },

    {
      id: 3,
      class: "Call of duty mobile near death edition",
      heading_1: "20",
      heading_2: "$860",
      heading_3: "3rd",
      _cellProps: {
        id: { scope: "row", className: "custom-class" },
        class: { className: "custom-class" },
        heading_1: { className: "custom-class" },
        heading_2: { className: "custom-class" },
        heading_3: { className: "custom-class" },
      },
    },
  ];

  return (
    <Container margin="0 0 0 3.5rem">
      <CTable columns={columns} items={items} borderless />
      <Wrapper
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        width="100%"
        margin="1rem 0 0 0"
      >
        <Container display="flex" flexDirection="row" margin="0 4rem 0 0">
          <Paragraph
            color="#F6B8FC"
            margin="0 .4rem 0 0"
            cursor="pointer"
            fontWeight={600}
          >
            View All
          </Paragraph>
          <RightArrow2 color="#F6B8FC" />
        </Container>
      </Wrapper>
    </Container>
  );
};
export default Table;
