import React, { useState } from "react";
import { TestCodImg } from "../../data/Index";
import { Container } from "../../styles/commonStyles/Container.styles";
import { FlexLayout } from "../../styles/commonStyles/FlexLayout";
import { Img } from "../../styles/commonStyles/Img";
import { Text } from "../../styles/commonStyles/Text";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import { Eye } from "../../styles/icon/Icons";
import SoonPopUP from "../Popup/SoonPopUp";

const GamingHub = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Container margin="3rem 0 0 0">
      <Text fontWeight={700}>Gaming Hub</Text>

      <Wrapper margin="2rem 0 0 0">
        <FlexLayout>
          {TestCodImg.map((data, index) => (
            <Container
              width="14.375rem"
              height="16rem"
              backgroundColor="#01070E"
              cursor="pointer"
              onClick={() => setOpenModal(true)}
              key={index}
            >
              <Img
                src={data.img}
                alt="img"
                width="14.375rem"
                height="11.25rem"
                borderRadius="8px"
                borderColor="rgba(255, 255, 255, 0.2)"
                borderStyle="solid"
                borderWidth="1px"
              />

              <Text
                color="#fff"
                fontWeight={600}
                fontsize="1rem"
                margin="1.5rem 0 0 0"
              >
                The Masked Man
              </Text>

              <Wrapper
                display="flex"
                flexDirection="row"
                margin="0.5rem 0 0 0"
                alignItems="center"
              >
                <Eye />
                <Text fontWeight={400} fontsize="0.625rem" margin="0 0 0 .5rem">
                  2000
                </Text>
              </Wrapper>
            </Container>
          ))}
        </FlexLayout>
      </Wrapper>
      {openModal && <SoonPopUP modal={setOpenModal} />}
    </Container>
  );
};
export default GamingHub;
