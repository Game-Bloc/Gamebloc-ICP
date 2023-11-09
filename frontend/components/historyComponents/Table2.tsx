import { CTable } from "@coreui/react";
import { Container } from "../../styles/commonStyles/Container.styles";
import "./index.css";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import { Paragraph } from "../../styles/commonStyles/Paragraph";
import { RightArrow2 } from "../../styles/icon/Icons";
import React from "react";
const Table2 = () => {
  const columns = [
    {
      key: "id",
      label: "S/N",
      _props: { scope: "col", className: "custom-class2" },
    },
    {
      key: "class",
      label: "Tournament Title",
      _props: { scope: "col", className: "custom-class2" },
    },
    {
      key: "heading_1",
      label: "Participants",
      _props: { scope: "col", className: "custom-class2" },
    },
    {
      key: "heading_2",
      label: "Pool Price",
      _props: { scope: "col", className: "custom-class2" },
    },
    {
      key: "heading_3",
      label: "Entry Price",
      _props: { scope: "col", className: "custom-class2" },
    },
  ];

  const items = [
    {
      id: 1,
      class: "Call of duty mobile near death edition",
      heading_1: "7",
      heading_2: "$100",
      heading_3: "$5",
      _cellProps: {
        id: { scope: "row", className: "custom-class2" },
        class: { className: "custom-class2" },
        heading_1: { className: "custom-class2" },
        heading_2: { className: "custom-class2" },
        heading_3: { className: "custom-class2" },
      },
    },
    {
      id: 2,
      class: "Call of duty mobile near death edition",
      heading_1: "10",
      heading_2: "$157",
      heading_3: "$10",
      _cellProps: {
        id: { scope: "row", className: "custom-class2" },
        class: { className: "custom-class2" },
        heading_1: { className: "custom-class2" },
        heading_2: { className: "custom-class2" },
        heading_3: { className: "custom-class2" },
      },
    },

    {
      id: 3,
      class: "Call of duty mobile near death edition",
      heading_1: "20",
      heading_2: "$860",
      heading_3: "$12",
      _cellProps: {
        id: { scope: "row", className: "custom-class2" },
        class: { className: "custom-class2" },
        heading_1: { className: "custom-class2" },
        heading_2: { className: "custom-class2" },
        heading_3: { className: "custom-class2" },
      },
    },
  ];

  return (
    <Container margin="1rem 0 0 1rem">
      <CTable
        columns={columns}
        items={items}
        borderless
        className="custom-color"
      />
      <Wrapper
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        width="100%"
        margin="1rem 0 0 0"
      >
        <Container display="flex" flexDirection="row" margin="0 1rem 0 0">
          <Paragraph
            color="#01070E"
            margin="0 .6rem 0 0"
            fontWeight={600}
            cursor="pointer"
          >
            View All
          </Paragraph>
          <RightArrow2 color="#01070E" />
        </Container>
      </Wrapper>
    </Container>
  );
};
export default Table2;
