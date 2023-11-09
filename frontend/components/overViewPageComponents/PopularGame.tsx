import { Container } from "../../styles/commonStyles/Container.styles";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import { Text } from "../../styles/commonStyles/Text";
import { CustomButtom } from "../../styles/custom/ CustomButton";
import { LeftArrow } from "../../styles/icon/Icons";
import { RightArrow } from "../../styles/icon/Icons";
import { Button } from "../../styles/commonStyles/Button.styled";
import PopularGameCardView from "./PopularGameCardView";
import React from "react";

const PopularGame = () => {
    return(
       <Wrapper
          margin="4rem 0 0 0"
       >
           <Wrapper
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Text
                fontWeight={700}
                >
                   Popular Games
                </Text>

                <Container
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                > 

                <Wrapper
                    display="block"
                    smdisplay="none"
                >
                    <CustomButtom
                        backgroundColor="#01070E"
                        hoverBackground="#F6B8FC"
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        padding="0.5rem"
                        borderRadius="8px"
                        cursor="pointer"
                        borderWidth="1px"
                        borderColor="#F6B8FC"
                        borderStyle="solid"
                        margin="0 .5rem 0 0"
                        smdisplay="none"
                    >
                        <LeftArrow 
                            className="icon"
                        />

                    </CustomButtom>
                </Wrapper>

                <Wrapper
                     display="block"
                     smdisplay="none"
                >

                    <CustomButtom
                        backgroundColor="#01070E"
                        hoverBackground="#F6B8FC"
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        padding="0.5rem"
                        borderRadius="8px"
                        cursor="pointer"
                        borderWidth="1px"
                        borderColor="#F6B8FC"
                        borderStyle="solid"
                        margin="0 .5rem 0 1rem"
                        smdisplay="none"
                    >
                        <RightArrow 
                            className="icon"
                        />

                    </CustomButtom>
                </Wrapper>

                <Button
                 backgroundColor="#01070E"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    padding="0.5rem 1.2rem"
                    borderRadius="8px"
                    cursor="pointer"
                    borderWidth="1px"
                    borderColor="#F6B8FC"
                    borderStyle="solid"
                    textColor="#F6B8FC"
                    margin="0 2.5rem 0 1rem"
                >
                    See All
                </Button>
                 

                </Container>

            </Wrapper>

            <PopularGameCardView />
       </Wrapper>
    )
}

export default PopularGame;