import { Container } from "../styles/commonStyles/Container.styles";
import { Wrapper } from "../styles/commonStyles/Wrapper";
import { Text } from "../styles/commonStyles/Text";
import img from "../assets/images/group.png";
import { Img } from "../styles/commonStyles/Img";
import { Paragraph } from "../styles/commonStyles/Paragraph";
import React from "react";

const NewsPage = () => {
  return (
    <Container>
      <Wrapper
        width="fit-content"
        height="fit-content"
        margin="2rem 0rem 0rem 2rem"
      >
        <Text
          color="#fff"
          fontWeight={700}
          fontStyle="normal"
          fontsize="2rem"
          margin="0 0 0 .5rem"
        >
          News
        </Text>
      </Wrapper>

      <Container
        display="grid"
        gridColumn="repeat(3, 1fr)"
        gap="1rem"
        margin="1rem 0 1rem 2rem"
      >
        <Wrapper height="fit-content">
          <Img src={img} alt="" />

          <Wrapper display="flex" flexDirection="column" margin="1rem 0 0 0">
            <Text
              fontWeight={600}
              fontsize="1.2rem"
              fontStyle="normal"
              width="95%"
            >
              How Modern Technology Affects Gamers In The 21st Century
            </Text>
            <Wrapper
              display="flex"
              flexDirection="row"
              alignItems="center"
              margin="1rem 0 0 0"
            >
              <Paragraph fontStyle="normal" fontWeight={400} fontsize=".875rem">
                Jan 21
              </Paragraph>

              <Wrapper
                backgroundColor="#fff"
                width=".5rem"
                height=".5rem"
                borderRadius="9999px"
                margin="0 .8rem"
              />

              <Paragraph fontStyle="normal" fontWeight={400} fontsize=".875rem">
                5 Mins read
              </Paragraph>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Container>
    </Container>
  );
};

export default NewsPage;
