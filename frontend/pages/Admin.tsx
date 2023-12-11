import React, { useEffect } from "react"
import { Container } from "../styles/commonStyles/Container.styles"
import { Text } from "../styles/commonStyles/Text"
import { Wrapper } from "../styles/commonStyles/Wrapper"
import { Img } from "../styles/commonStyles/Img"
import icon1 from "../assets/images/carbon_task-complete.png"
import icon2 from "../assets/images/carbon_continue.png"
import icon3 from "../assets/images/clarity_new-solid.png"
import icon4 from "../assets/images/ic_sharp-pending-actions.png"
import AdminTabBar from "../components/adminComponents/AdminTabBar"

const Admin = () => {
  // const { fetchAllTournaments } = useGameblocFunction();
  // useEffect(() => {
  //   fetchAllTournaments();
  // }, []);

  return (
    <Container>
      <Text fontWeight={600} fontsize="2.3rem" margin="1rem" color="#F6B8FC">
        Tournaments
      </Text>

      <Wrapper display="flex" flexDirection="column" margin="2rem 1rem">
        <Text fontsize="1.2rem" fontWeight={600}>
          Overview
        </Text>
        <Wrapper
          display="grid"
          gridColumn="repeat(4, 1fr)"
          gap="1.5rem"
          margin="1.5rem 0 0 0"
        >
          <Container
            width="15rem"
            height="5rem"
            borderColor="#F6B8FC"
            borderWidth="1px"
            borderStyle="solid"
            borderRadius="12px"
            padding="1rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Wrapper display="flex" flexDirection="column">
              <Text fontsize=".8rem">Concluded Tournaments</Text>
              <Text fontsize="1rem" fontWeight={600} margin=".5rem 0 0 0">
                10
              </Text>
            </Wrapper>

            <Img src={icon1} alt="" />
          </Container>
          <Container
            width="15rem"
            height="5rem"
            borderColor="#F6B8FC"
            borderWidth="1px"
            borderStyle="solid"
            borderRadius="12px"
            padding="1rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Wrapper display="flex" flexDirection="column">
              <Text fontsize=".8rem">Ongoing Tournaments </Text>
              <Text fontsize="1rem" fontWeight={600} margin=".5rem 0 0 0">
                2
              </Text>
            </Wrapper>

            <Img src={icon2} alt="" />
          </Container>
          <Container
            width="15rem"
            height="5rem"
            borderColor="#F6B8FC"
            borderWidth="1px"
            borderStyle="solid"
            borderRadius="12px"
            padding="1rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Wrapper display="flex" flexDirection="column">
              <Text fontsize=".8rem">New Tournaments</Text>
              <Text fontsize="1rem" fontWeight={600} margin=".5rem 0 0 0">
                8
              </Text>
            </Wrapper>

            <Img src={icon3} alt="" />
          </Container>
          <Container
            width="15rem"
            height="5rem"
            borderColor="#F6B8FC"
            borderWidth="1px"
            borderStyle="solid"
            borderRadius="12px"
            padding="1rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Wrapper display="flex" flexDirection="column">
              <Text fontsize=".8rem">Pending Tournaments</Text>
              <Text fontsize="1rem" fontWeight={600} margin=".5rem 0 0 0">
                4
              </Text>
            </Wrapper>

            <Img src={icon4} alt="" />
          </Container>
        </Wrapper>

        <Wrapper margin="2rem 0 0 0">
          <Text fontsize="1.2rem" fontWeight={600}>
            Tournaments
          </Text>
          <AdminTabBar />
        </Wrapper>
      </Wrapper>
    </Container>
  )
}

export default Admin
