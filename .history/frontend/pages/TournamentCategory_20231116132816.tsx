import { Container } from "../styles/commonStyles/Container.styles"
import { Wrapper } from "../styles/commonStyles/Wrapper"
import { LeftArrow2 } from "../styles/icon/Icons"
import { Text } from "../styles/commonStyles/Text"
import { Img } from "../styles/commonStyles/Img"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import React from "react"
import CommonHeader from "../common/CommonHeader"
import Loader from "../components/Popup/Loader/Loader"
import SideBar from "./SideBar"

const TournamentCategory = () => {
  const data = useAppSelector((state) => state.gameCategory)
  const navigate = useNavigate()
  return (
    <>
      <CommonHeader />
      <Container display="flex" flexDirection="row">
        <SideBar />
        <Wrapper
          xmdmargin="7rem 1rem 0 1rem"
          xmdwidth="100%"
          width="79%"
          margin="7rem 0 0 19%"
        >
          <Container
            smmargin="0"
            margin="1rem"
            display="flex"
            flexDirection="column"
          >
            <Wrapper
              display="flex"
              flexDirection="row"
              alignItems="center"
              cursor="pointer"
              margin="1rem 0 0 0"
              xmdmargin="0"
              width="fit-content"
              onClick={() => navigate(-1)}
            >
              <LeftArrow2 />
              <Text
                color="#F8DBFB"
                fontWeight={600}
                fontStyle="normal"
                margin="0 0 0 .5rem"
              >
                Go Back
              </Text>
            </Wrapper>

            <Text
              color="#fff"
              fontWeight={700}
              fontStyle="normal"
              fontsize="1.5rem"
              smfontSize="1.2rem"
              margin="2rem  3rem 1rem 2.5rem"
              smmargin="2rem .8rem"
              smtextAlign="center"
            >
              Choose a category
            </Text>

            <Wrapper
              display="grid"
              gridColumn="repeat(2, 1fr)"
              smgridcolumn="repeat(1, 1fr)"
              margin="1rem 2.5rem"
              smalignitems="center"
              smjustifycontent="center"
              xmdmargin="0"
              smmargin="1rem 0"
              gap="1rem"
            >
              {data.TournamentData.map((category) => (
                <Link
                  to={`/tournament-category/${category.id}`}
                  key={category.id}
                >
                  <Container
                    borderRadius="10px"
                    width="100%"
                    position="relative"
                    cursor="pointer"
                  >
                    <Img
                      src={category.background}
                      alt=""
                      borderWidth="1px"
                      borderColor="rgba(255, 255, 255, 0.2)"
                      borderStyle="solid"
                      borderRadius="10px"
                      opacity=".6"
                      width="95%"
                      smwidth="100%"
                    />
                    <Text
                      color="#fff"
                      fontWeight={700}
                      fontStyle="normal"
                      fontsize="1.3rem"
                      position="absolute"
                      top="1.1rem"
                      left="1rem"
                    >
                      {category.title}
                    </Text>
                  </Container>
                </Link>
              ))}
            </Wrapper>
          </Container>
        </Wrapper>
      </Container>
    </>
  )
}
export default TournamentCategory
