/// <reference path="../../react-app-env.d.ts" />
import styled from "styled-components"
import near_logo from "../../assets/images/near-logo.png"
import { RiCloseFill } from "react-icons/ri"
import { Text } from "../../styles/commonStyles/Text"
import { useNavigate } from "react-router-dom"
import { Container } from "../../styles/commonStyles/Container.styles"
import { InputField } from "../../styles/commonStyles/InputField"
import React, { useEffect, useState } from "react"
import { Button } from "../../styles/commonStyles/Button.styled"
import ClipLoader from "react-spinners/ClipLoader"
import { useGameBlocFunction } from "../../functions/GameblocHooks"
import { ulid } from "ulid"
import { useAppSelector } from "../../redux/hooks"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const LoginModal = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string>("")
  const [age, setAge] = useState("")
  const [joinDate, setJoinDate] = useState<string>("")
  const [color, setColor] = useState("#ffffff")
  const [idHash, setIdHash] = useState<string>("")
  const name = useAppSelector((state) => state.userProfile.username)

  const { isLoading, initilizeUser, getProfile, getAllUsers } =
    useGameBlocFunction()
  const onlineStatus = { Online: null }

  const generateId = () => {
    const date = new Date()
    let day = date.getDate()
    const id = ulid(day)
    setIdHash(id)
  }

  const onChangeUsername = (e: any) => {
    e.preventDefault()
    const userNameInput = e.target.value
    setUserName(userNameInput)
  }

  const onChangeAge = (e: any) => {
    e.preventDefault()
    const ageInput = e.target.value
    setAge(ageInput)
  }

  const getCurrentMonthAndYear = () => {
    const currentDate = new Date()
    const month = currentDate.toLocaleString("default", { month: "long" })
    const year = currentDate.getFullYear()
    const date = `${month} ${year}`
    setJoinDate(date)
  }

  useEffect(() => {
    generateId()
    getCurrentMonthAndYear()
    getAllUsers()
  }, [])

  useEffect(() => {
    getProfile(name)
  }, [name])

  // const value = {
  //   age: +age,
  //   idHash: idHash,
  //   status: null,
  //   username: userName,
  //   date: joinDate,
  // }
  return (
    <Wrapper aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <Container0>
        <Container2>
          <Container3>
            <Container4>
              <Modal>
                <Text
                  color="#F6B8FC"
                  fontWeight={800}
                  fontsize="1.5rem"
                  margin="1rem 0"
                >
                  Create Profile
                </Text>
                <Container
                  borderColor="#F6B8FC"
                  backgroundColor="#f6b8fc7a"
                  borderWidth="1px"
                  borderStyle="solid"
                  borderRadius="8px"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  padding="0rem 0rem 0rem .2rem"
                >
                  <InputField
                    type="name"
                    noneBorder="none"
                    color="#fff"
                    placeHolderColor="#ffffff"
                    placeholder="Input username"
                    width="20rem"
                    smWidth="15rem"
                    onChange={onChangeUsername}
                    value={userName}
                  />
                </Container>

                <Container
                  borderColor="#F6B8FC"
                  backgroundColor="#f6b8fc7a"
                  borderWidth="1px"
                  borderStyle="solid"
                  borderRadius="8px"
                  display="flex"
                  margin="1rem 0"
                  flexDirection="row"
                  alignItems="center"
                  padding="0rem 0rem 0rem .2rem"
                >
                  <InputField
                    type="text"
                    noneBorder="none"
                    color="#fff"
                    placeHolderColor="#ffffff"
                    placeholder="Input age"
                    width="20rem"
                    smWidth="15rem"
                    value={age}
                    onChange={onChangeAge}
                  />
                </Container>
                <Button
                  backgroundColor="#F6B8FC"
                  smfontsize=".8rem"
                  width="12rem"
                  cursor="pointer"
                  textColor="#01070E"
                  xmdpadding=".3rem .4rem"
                  padding=".8rem .3rem"
                  border="none"
                  borderRadius="12px"
                  smmargin=".4rem"
                  margin=" 0 0 0 2rem"
                  xmdmargin=".6rem 0 0 0"
                  onClick={() => {
                    initilizeUser(
                      +age,
                      idHash,
                      onlineStatus,
                      userName,
                      joinDate,
                      0,
                      false,
                      0,
                      "Your Profile has been created",
                      "Error creating profile",
                      "/home",
                    )
                    // console.log(value)
                    setTimeout(() => {
                      console.log("Timer started")
                      getProfile(name)
                      console.log("Called")
                    }, 5000)
                  }}
                >
                  {isLoading ? (
                    <ClipLoader
                      color={color}
                      loading={isLoading}
                      cssOverride={override}
                      size={10}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Modal>
            </Container4>
          </Container3>
        </Container2>
      </Container0>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  z-index: 10;
`

// const Img = styled.div`
//  img{
//   margin: 0 16px 8px 0;
//   @media (max-width: 400px){
//     width: 90px;
//     height: 40px;
//     }
//  }
//  `;

const Logo = styled.img`
  width: 25px;
  height: 25px;
`

const Container0 = styled.div`
  position: fixed;
  inset: 0;
  background-color: transparent;
`

const Container2 = styled.div`
  position: fixed;
  z-index: 10;
  inset: 0;
  overflow-y: auto;
`

const Container3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`

const Container4 = styled.div`
  position: relative;
  background-color: white;
  width: 50%;
  border-radius: 10px;
  overflow: hidden;
  @media screen and (max-width: 600px) {
    width: 90%;
  }
`

const Modal = styled.div`
  position: relative;
  background-color: #01070e;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    color: white;
    margin: 1rem 0;
  }
`

// const Button = styled.div`
//   background-color: #07192d;
//   border-radius: 8px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem 2rem;
//   color: white;
//   font-size: 16px;
//   border: none;
//   width: 80%;
//   margin: 1rem;
//   cursor: pointer;

//   &:hover {
//     scale: 1.03;
//     background-color: #0d2746;
//   }
// `;

const Close = styled(RiCloseFill)`
  position: absolute;
  color: white;
  left: 1rem;
  top: 1rem;
  cursor: pointer;
`

export default LoginModal
