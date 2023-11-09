import { Container } from "../../styles/commonStyles/Container.styles";
import { Img } from "../../styles/commonStyles/Img";
import { Text } from "../../styles/commonStyles/Text";
import img1 from "../../assets/images/img2.png";
import { Paragraph } from "../../styles/commonStyles/Paragraph";
import React from "react";

const GameBloc = () => {
  return (
    <Container
      display="flex"
      flexDirection="row"
      mdflexdirection="column"
      margin="10rem 6.25rem 1.5rem 6.25rem"
      smmargin="16rem 1rem 1rem 1rem"
      justifyContent="space-between"
      alignItems="center"
    >
      <Container
        display="flex"
        smalignitems="center"
        smjustifycontent="center"
        flexDirection="column"
        width="40%"
        mdwidth="70%"
        smwidth="90%"
      >
        <Text
          className="heading2"
          color="#F6B8FC"
          fontWeight={400}
          textAlign="center"
          smfontSize="1.5rem"
          mdfontSize="2.5rem"
          fontsize="3.375rem"
        >
          Game BLOC
        </Text>
        <Paragraph
          smfontSize=".8rem"
          textAlign="center"
          smheight="20%"
          color="#F8DBFB"
          margin="1.5rem 0 0 0"
        >
          Game_bloc seeks to be the first social platform for gamers that allows
          users to host and join tournaments where they can win prizes and
          entertain themselves with games that we will be supporting.
        </Paragraph>
        <Paragraph
          smfontSize=".8rem"
          textAlign="center"
          smheight="40%"
          color="#F8DBFB"
          margin="1.5rem 0 0 0"
        >
          Also provide a game launch platform that will enable game developers
          to launch their games by hosting tournaments streams and events that
          will foster interests in their mobile or desktop game.
        </Paragraph>
      </Container>
      <Img
        src={img1}
        mdwidth="40%"
        width="40%"
        smwidth="60%"
        smheight="50%"
        smmargin="2.5rem 1rem 1rem 1rem"
        mdmargin="2rem 0 0 0"
        alt="img"
      />
    </Container>
  );
};

export default GameBloc;
