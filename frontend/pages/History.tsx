import { Container } from "../styles/commonStyles/Container.styles";
import { Wrapper } from "../styles/commonStyles/Wrapper";
import { Text } from "../styles/commonStyles/Text";
import { Paragraph } from "../styles/commonStyles/Paragraph";
import Table from "../components/historyComponents/Table";
import Table2 from "../components/historyComponents/Table2";
import React from "react";

const History = () => {
  return (
    <Container>
      <Wrapper
        width="fit-content"
        height="fit-content"
        margin="2rem 0rem 0rem 2rem"
        display="flex"
        flexDirection="column"
      >
        <Text
          color="#fff"
          fontWeight={700}
          fontStyle="normal"
          fontsize="2rem"
          margin="0 0 0 .5rem"
        >
          History
        </Text>

        <Paragraph
          margin=".6rem 0 1rem 2rem"
          fontStyle="normal"
          fontsize="1.2rem"
          fontWeight={600}
        >
          Tournament
        </Paragraph>
      </Wrapper>

      <Table />

      <Container
        margin="2rem"
        backgroundColor="#F6B8FC"
        padding="1rem"
        borderRadius="10px"
      >
        <Text
          margin="1.5rem"
          fontStyle="normal"
          fontsize="1.2rem"
          fontWeight={600}
          color="#01070E"
        >
          Created Tournament
        </Text>

        <Table2 />
      </Container>
    </Container>
  );
};

export default History;
