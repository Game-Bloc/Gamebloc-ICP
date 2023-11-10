import { Container } from "../../styles/commonStyles/Container.styles"
import { Img } from "../../styles/commonStyles/Img"
import { Paragraph } from "../../styles/commonStyles/Paragraph"
import { Text } from "../../styles/commonStyles/Text"
import hexagon from "../../assets/images/hexagon.png"
import React from "react"
const TechStack = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      margin="15rem 6.25rem 1.5rem 6.25rem"
      smmargin="8rem 1rem 1.5rem 1rem"
    >
      <Container
        display="flex"
        width="100%"
        flexDirection="column"
        justifyContent="center"
        smjustifycontent=""
        alignItems="center"
      >
        <Text
          className="heading2"
          color="#F6B8FC"
          fontWeight={400}
          fontsize="3.375rem"
          smfontSize="1.5rem"
        >
          Tech Stack
        </Text>
        <Paragraph
          width="60%"
          smwidth="90%"
          color="#F8DBFB"
          textAlign="center"
          margin="1rem 0 0 0"
          smfontSize=".8rem"
          smheight="20%"
        >
          The tech stack used for developing game_bloc is mostly rust in other
          to fully utilize the Solana blockchain and the packages that it
          provides.
        </Paragraph>
      </Container>
      <Container
        display="grid"
        gridColumn="repeat(3, 1fr)"
        mdgridcolumn="repeat(2, 1fr)"
        smgridcolumn="repeat(1,1fr)"
        margin="6rem 0 0 0"
        smgap="1rem"
        mdgap="2rem"
        gap="4rem"
      >
        <Container
          display="flex"
          alignItems="center"
          justifyContent="center"
          mdalignitems="center"
          mdjustifycontent="center"
          smalignitems="center"
          smjustifycontent="center"
          flexDirection="column"
          smmargin="1rem 0"
        >
          <Img src={hexagon} alt="" width="60%" />
          <Container
            display="flex"
            flexDirection="column"
            margin="2rem 0 0 0"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="#F8DBFB" fontWeight={600}>
              Frontend
            </Text>
            <Paragraph
              textAlign="center"
              color="#F8DBFB"
              margin="1rem 0 0 0"
              smmargin="0rem"
              smfontSize=".8rem"
            >
              Typescript using the react framework and other needed libraries.
            </Paragraph>
          </Container>
        </Container>
        <Container
          display="flex"
          alignItems="center"
          justifyContent="center"
          mdalignitems="center"
          mdjustifycontent="center"
          smalignitems="center"
          smjustifycontent="center"
          flexDirection="column"
        >
          <Img src={hexagon} alt="" width="60%" />
          <Container
            display="flex"
            flexDirection="column"
            margin="2rem 0 0 0"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="#F8DBFB" fontWeight={600}>
              Backend
            </Text>
            <Paragraph
              textAlign="center"
              color="#F8DBFB"
              margin="1rem 0 0 0"
              smmargin="0rem"
              smfontSize=".8rem"
            >
              Rust and Motoko using libraries and other packages from Internet
              Computer.
            </Paragraph>
          </Container>
        </Container>
        <Container
          display="flex"
          alignItems="center"
          justifyContent="center"
          mdalignitems="center"
          mdjustifycontent="center"
          smalignitems="center"
          smjustifycontent="center"
          flexDirection="column"
        >
          <Img src={hexagon} alt="" width="60%" />
          <Container
            display="flex"
            flexDirection="column"
            margin="2rem 0 0 0"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="#F8DBFB" fontWeight={600}>
              Oracle / Game API comms
            </Text>
            <Paragraph
              textAlign="center"
              color="#F8DBFB"
              margin="1rem 0 0 0"
              smmargin="0rem"
              smfontSize=".8rem"
            >
              Python and other needed packages.
            </Paragraph>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

export default TechStack
