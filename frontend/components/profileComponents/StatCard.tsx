import React from "react";
import { Img } from "../../styles/commonStyles/Img";
import { Container } from "../../styles/commonStyles/Container.styles";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import { Text } from "../../styles/commonStyles/Text";

interface Props {
  Rank: string;
  Pic: any;
}

const StatCard = ({ Rank, Pic }: Props) => {
  return (
    <Container
      display="flex"
      borderColor="#ffffff3c"
      borderStyle="solid"
      borderWidth="1px"
      padding=".4rem 1rem"
      //   width="12rem"
      borderRadius="8px"
      justifyContent="space-between"
      alignItems="center"
    >
      <Wrapper
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Img
          src={Pic}
          alt=""
          smwidth="2.2rem"
          smheight="2.2rem"
          width="2.5rem"
          height="2.5rem"
        />
        <Text
          smfontSize=".7rem"
          fontsize=".8rem"
          fontWeight={600}
          margin="0 0 0 .3rem"
        >
          {Rank}
        </Text>
      </Wrapper>

      <Text smfontSize=".7rem" fontsize=".9rem" fontWeight={600}>
        0
      </Text>
    </Container>
  );
};

export default StatCard;
