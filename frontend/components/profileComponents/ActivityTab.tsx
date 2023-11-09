import React from "react";
import { Container } from "../../styles/commonStyles/Container.styles";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import { Text } from "../../styles/commonStyles/Text";
import StatCard from "./StatCard";
import legendary from "../../assets/images/gold-medal.png";
import gold from "../../assets/images/star.png";
import plat from "../../assets/images/silver-medal.png";

const ActivityTab = () => {
  return (
    <Container display="flex" flexDirection="column">
      <Wrapper display="flex" flexDirection="column">
        <Text fontsize="1.2rem" fontWeight={700}>
          Personal Best
        </Text>
        <Wrapper
          display="grid"
          margin="1rem"
          gap="1rem"
          gridColumn="repeat(4, 1fr)"
          smgridcolumn="repeat(2, 1fr)"
        >
          <StatCard Rank={"Legendary"} Pic={legendary} />
          <StatCard Rank={"Platinum"} Pic={plat} />
          <StatCard Rank={"Gold"} Pic={gold} />
        </Wrapper>
      </Wrapper>
    </Container>
  );
};

export default ActivityTab;
