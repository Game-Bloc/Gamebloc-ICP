import { Container } from "../styles/commonStyles/Container.styles"
import { Wrapper } from "../styles/commonStyles/Wrapper"
import { LeftArrow2 } from "../styles/icon/Icons"
import { Text } from "../styles/commonStyles/Text"
import { Img } from "../styles/commonStyles/Img"
import background from "../assets/images/cyberpunk.avif"
import { Button } from "../styles/commonStyles/Button.styled"
import { Paragraph } from "../styles/commonStyles/Paragraph"
import { InputField } from "../styles/commonStyles/InputField"
import { useNavigate } from "react-router-dom"
import { ulid } from "ulid"
import ClipLoader from "react-spinners/ClipLoader"
import { useEffect, useState } from "react"
import React from "react"
// import { useGameblocFunction } from "../functions/GameblocHook";
import { TextAreaField } from "../styles/commonStyles/TextArea"
import { Select, DatePicker, TimePicker } from "antd"
import type { DatePickerProps } from "antd"
import type { RangePickerProps } from "antd/es/date-picker"
import dayjs from "dayjs"
import type { Dayjs } from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { useAppSelector } from "../redux/hooks"
import PaymentModal from "../components/Popup/PaymentModal"
import { useGameBlocFunction } from "../functions/GameblocHooks"
import CommonHeader from "../common/CommonHeader"
import Loader from "../components/Popup/Loader/Loader"
import SideBar from "./SideBar"

const CreateTournament = () => {
  const navigate = useNavigate()
  dayjs.extend(customParseFormat)
  // const [tournamentID, setTournamentID] = useState<number>(0);
  const [color, setColor] = useState("#ffffff")
  const [poolPrize, setPoolPrize] = useState("")
  const [entryPrice, setEntryPrize] = useState("")
  const [noOfUsers, setNoOfUsers] = useState<number>(0)
  const [tournamentType, setTournamentType] = useState<string>("")
  const [variantType, setVariantType] = useState(null)
  const [gameName, setGameName] = useState<string>("")
  const [noOfWinners, setNoOfWinners] = useState<number>(0)
  const [tourType, setTourType] = useState<string>("")
  const [tournamentRules, setTournamentRules] = useState<string>("")
  const [initialTime, setInitialTime] = useState<string>("")
  const [initialDate, setInitialDate] = useState<string>("")
  const [startingDate, setStartingDate] = useState<string>("")
  const [tournamentID, setTournamentID] = useState<string>("")
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { isLoading, createTournament } = useGameBlocFunction()
  const name = useAppSelector((state) => state.userProfile.username)

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  }

  const generateULID = () => {
    const date = new Date()
    let day = date.getDate()
    const id = ulid(day)
    setTournamentID(id)
    console.log("ulid:", id)
  }

  // const generateID = () => {
  //   const max = 9;
  //   const id = Math.floor(Math.random() * (max + 1));
  //   setTournamentID(id);
  //   // console.log("two id", tournamentID);
  // };

  useEffect(() => {
    generateULID()

    const getTimeDate = () => {
      const value = initialTime.concat(" ", initialDate)
      setStartingDate(value)
    }
    if (tournamentType === "Crowdfunded") {
      setTourType("Crowdfunded")
      setVariantType({ Crowdfunded: null })
    } else if (tournamentType === "Prepaid") {
      setTourType("Prepaid")
      setVariantType({ Prepaid: null })
    } else {
      setTourType("Crowdfunded")
    }
    getTimeDate()
  }, [
    tournamentType,
    initialDate,
    initialTime,
    startingDate,
    // getTournamentCount,
  ])

  // useEffect(() => {
  //   updateTournamentCountValue(tournamentID);
  // }, []);

  useEffect(() => {
    if (close) {
      setOpenModal(false)
    }
  }, [close])

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  const filterOption1 = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day")
  }

  const onTimeChange = (time: Dayjs | null, timeString: string) => {
    const value = timeString
    setInitialTime(value)
  }

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    const value = dateString
    setInitialDate(value)
  }

  const getTimeDate = () => {
    const value = initialTime.concat(" ", initialDate)
    setStartingDate(value)
    console.log("starting:", startingDate)
  }

  const onPriceChange = (e: any) => {
    e.preventDefault()
    const priceinput = e.target.value
    setPoolPrize(priceinput)
    setEntryPrize("")
  }
  const onEntryChange = (e: any) => {
    e.preventDefault()
    const entryInput = e.target.value
    setEntryPrize(entryInput)
    setPoolPrize("")
  }

  const onRuleChange = (e: any) => {
    e.preventDefault()
    const rules = e.target.value
    setTournamentRules(rules)
  }
  const onUserChange = (e: any) => {
    e.preventDefault()
    const userNumberInput = e.target.value
    setNoOfUsers(+userNumberInput)
  }

  const onGameChange = (e: any) => {
    e.preventDefault()
    const gameInput = e.target.value
    setGameName(gameInput)
  }

  const handleTournamentTypeChange = (value: string) => {
    setTournamentType(value)
  }

  const handleWinnersChange = (value: string) => {
    setNoOfWinners(+value)
  }

  const testFunction = () => {
    console.log("Participants", noOfUsers)
    console.log("Winners", noOfWinners)
    console.log("game", gameName)
    console.log("Tournament ID", tournamentID)
    console.log("tournament Rules", tournamentRules)
    console.log("tournament type", tournamentType)
    console.log("Starting Date", startingDate)
    console.log("Entry price", +entryPrice)
    console.log("Total price", +poolPrize)
    console.log("Game", gameName)
  }

  const makePayment = (money: any) => {
    // transferSOL(
    //   money,
    //   "Payment successful. Close this modal to proceed to create tournament",
    //   "Payment Failed",
    //   ""
    // );
  }

  const addTournament = () => {
    createTournament(
      1,
      tournamentID,
      { AcceptingPlayers: null },
      name,
      gameName,
      [],
      [],
      +poolPrize,
      tournamentRules,
      startingDate,
      noOfUsers,
      noOfWinners,
      variantType,
      +entryPrice,
      "You have successfully created a Tournament",
      "Try again something went wrong",
      "/",
    )
  }

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
          <Container margin="1rem" smmargin="1rem 0">
            <Wrapper
              display="flex"
              flexDirection="row"
              alignItems="center"
              cursor="pointer"
              margin="1rem 0 0 0"
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

            <Wrapper
              display="grid"
              gridColumn="repeat( auto-fit, minmax(16rem, 1fr) )"
              mdgridcolumn="repeat(1, 1fr)"
              gap="1rem"
              margin="1.5rem 0 0 0"
            >
              <Container display="flex" flexDirection="column">
                <Img
                  src={background}
                  alt=""
                  width="100%"
                  borderWidth="1px"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  borderStyle="solid"
                  borderRadius="10px"
                />

                <Container
                  margin="1rem 0 0 0"
                  borderWidth="1px"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  borderStyle="solid"
                  borderRadius="10px"
                  width="100%"
                >
                  <Container
                    smdisplay="grid"
                    smgridcolumn="repeat(1, 1fr)"
                    smgap="1rem"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    padding=".8rem"
                  >
                    <Text
                      fontsize="1.5rem"
                      smfontSize=".8rem"
                      fontWeight={600}
                      color="#ffffff"
                    >
                      Host your Tournament
                    </Text>

                    <Wrapper display="flex" flexDirection="row">
                      <Button
                        backgroundColor="#FEE4E2"
                        cursor="pointer"
                        justifyContent="center"
                        alignItems="center"
                        padding="0.3rem 1.2rem 0.4rem 1.2rem"
                        smpadding="0.2rem 1rem 0.4rem 1rem"
                        border="none"
                        borderRadius="4.5rem"
                      >
                        <Text
                          color="#D92D20"
                          fontStyle="normal"
                          fontsize=".8rem"
                          smfontSize=".6rem"
                          fontWeight={600}
                          cursor="pointer"
                        >
                          Action
                        </Text>
                      </Button>
                      <Button
                        backgroundColor="#FFD98F"
                        cursor="pointer"
                        justifyContent="center"
                        alignItems="center"
                        padding="0.3rem 1.2rem 0.4rem 1.2rem"
                        smpadding="0.2rem 1rem 0.4rem 1rem"
                        border="none"
                        borderRadius="4.5rem"
                        margin="0 0 0 1rem"
                      >
                        <Text
                          color="#B88217"
                          fontStyle="normal"
                          fontsize=".8rem"
                          smfontSize=".6rem"
                          fontWeight={600}
                          cursor="pointer"
                        >
                          Adventure
                        </Text>
                      </Button>
                      <Button
                        backgroundColor="#D1FADF"
                        cursor="pointer"
                        justifyContent="center"
                        alignItems="center"
                        padding="0.3rem 1.2rem 0.4rem 1.2rem"
                        smpadding="0.2rem 1rem 0.4rem 1rem"
                        border="none"
                        borderRadius="4.5rem"
                        margin="0 0 0 1rem"
                      >
                        <Text
                          color="#039855"
                          fontStyle="normal"
                          fontsize=".8rem"
                          smfontSize=".6rem"
                          fontWeight={600}
                          cursor="pointer"
                        >
                          Shooting
                        </Text>
                      </Button>
                    </Wrapper>
                  </Container>

                  <Wrapper
                    borderBottom="1px solid rgba(255, 255, 255, 0.2)"
                    width="100%"
                    margin=".5rem 0"
                  />

                  <Wrapper padding="1rem" display="flex" flexDirection="column">
                    <Text
                      fontsize="1.2rem"
                      smfontSize=".9rem"
                      fontWeight={600}
                      color="#ffffff"
                    >
                      Information
                    </Text>

                    <Paragraph margin="1rem 0 0 0" smfontSize=".7rem">
                      As a registered user, you have the power to create your
                      own tournaments. Specify the game, tournament format,
                      entry fees (for crowdfunded tournaments), and prize pool
                      (for prepaid tournaments). Set the rules and guidelines,
                      and watch as gamers from all over sign up for your event.
                      Browse through the list of upcoming tournaments. Join your
                      preferred tournament by paying the entry fee or confirming
                      your participation. Get ready to compete and showcase your
                      gaming skills. If you're a winner, your prizes will be
                      awarded based on the tournament's rules. Receive your
                      rewards and bask in the glory of your victory.
                    </Paragraph>
                  </Wrapper>
                </Container>
              </Container>

              <Container
                padding="0 0 2rem 0"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.2)"
                borderStyle="solid"
                borderRadius="10px"
                height="fit-content"
              >
                <Wrapper
                  margin="1.5rem 2rem"
                  width="fit-content"
                  height="fit-content"
                >
                  <Text fontsize="1.2rem" fontWeight={600} color="#ffffff">
                    Create Tournament Details
                  </Text>
                </Wrapper>

                <Wrapper
                  borderBottom="1px solid rgba(255, 255, 255, 0.2)"
                  width="100%"
                  margin="2.5rem 0 1rem 0"
                />

                <Container
                  display="flex"
                  flexDirection="column"
                  padding="1rem 2rem 2rem 2rem"
                >
                  <Wrapper
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    smalignitems="unset"
                    smjustifycontent="unset"
                    smflexdirection="column"
                    margin="0 0 1rem 0"
                  >
                    <Container display="flex" flexDirection="column">
                      <Text
                        margin=" 0 0 1rem 0"
                        fontsize="1rem"
                        smfontSize=".7rem"
                        fontWeight={400}
                        fontStyle="normal"
                      >
                        Select Tournament Type
                      </Text>

                      <Select
                        placeholder="Tournament Type"
                        optionFilterProp="children"
                        onChange={handleTournamentTypeChange}
                        filterOption={filterOption1}
                        options={[
                          {
                            value: "Crowdfunded",
                            label: "Crowdfunded",
                          },
                          {
                            value: "Prepaid",
                            label: "Prepaid",
                          },
                        ]}
                      />
                    </Container>

                    <Container
                      display="flex"
                      flexDirection="column"
                      margin="1rem 0 0 0 "
                    >
                      <Text
                        margin=" 0 0 1rem 0"
                        fontsize="1rem"
                        fontWeight={400}
                        smfontSize=".7rem"
                        fontStyle="normal"
                      >
                        Select Number of Winners
                      </Text>

                      <Select
                        placeholder="Select number of Winners"
                        optionFilterProp="children"
                        onChange={handleWinnersChange}
                        filterOption={filterOption}
                        options={[
                          {
                            value: "1",
                            label: "1",
                          },
                          {
                            value: "2",
                            label: "2",
                          },
                          {
                            value: "3",
                            label: "3",
                          },
                        ]}
                      />
                    </Container>
                  </Wrapper>

                  <Wrapper
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    margin="1rem 0"
                  >
                    <Container
                      display="flex"
                      flexDirection="column"
                      margin="0 .5rem 0 0"
                    >
                      <Text
                        margin=" 0 0 1rem 0"
                        fontsize="1rem"
                        fontWeight={400}
                        smfontSize=".7rem"
                        fontStyle="normal"
                      >
                        Tournament Time
                      </Text>
                      <TimePicker
                        use12Hours
                        format="h:mm a"
                        onChange={onTimeChange}
                      />
                    </Container>

                    <Container
                      display="flex"
                      flexDirection="column"
                      margin="0 .5rem 0 0"
                    >
                      <Text
                        margin=" 0 0 1rem 0"
                        fontsize="1rem"
                        smfontSize=".7rem"
                        fontWeight={400}
                        fontStyle="normal"
                      >
                        Tournament Date
                      </Text>
                      <DatePicker
                        disabledDate={disabledDate}
                        onChange={onDateChange}
                      />
                    </Container>
                  </Wrapper>

                  <Wrapper
                    display="flex"
                    flexDirection="column"
                    margin="0 0 1rem 0"
                  >
                    <Text
                      fontsize="1rem"
                      smfontSize=".7rem"
                      fontWeight={400}
                      fontStyle="normal"
                    >
                      Game Name
                    </Text>
                    <Container
                      margin="1rem 0"
                      borderColor="#fff"
                      borderStyle="solid"
                      borderWidth="1px"
                      borderRadius="8px"
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      padding="0rem 2rem 0rem .3rem"
                    >
                      <InputField
                        type="text"
                        placeholder="Input the name of tournament game"
                        noneBorder="none"
                        placeHolderColor="#fff"
                        smfontSize=".9rem"
                        color="#fff"
                        onChange={onGameChange}
                        value={gameName}
                      />
                    </Container>
                  </Wrapper>

                  <Wrapper
                    display="flex"
                    flexDirection="column"
                    margin="0 0 1rem 0"
                  >
                    <Text
                      fontsize="1rem"
                      smfontSize=".7rem"
                      fontWeight={400}
                      fontStyle="normal"
                    >
                      {tourType === "Prepaid"
                        ? "Total Pool Price (ICP)"
                        : "Tournament Entry Price (ICP)"}
                    </Text>
                    <Container
                      margin="1rem 0"
                      borderColor="#fff"
                      borderStyle="solid"
                      borderWidth="1px"
                      borderRadius="8px"
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      padding="0rem 2rem 0rem .3rem"
                    >
                      <InputField
                        type="text"
                        placeholder={
                          tourType === "Prepaid"
                            ? "Input Pool Price in ICP"
                            : "Input entry price in ICP"
                        }
                        smfontSize=".9rem"
                        noneBorder="none"
                        placeHolderColor="#fff"
                        color="#fff"
                        onChange={
                          tourType === "Prepaid"
                            ? onPriceChange
                            : tourType === "Crowdfunded"
                            ? onEntryChange
                            : onEntryChange
                        }
                        value={tourType === "Prepaid" ? poolPrize : entryPrice}
                      />
                    </Container>
                  </Wrapper>

                  <Wrapper
                    display="flex"
                    flexDirection="column"
                    margin="0 0 1rem 0"
                  >
                    <Text
                      fontsize="1rem"
                      smfontSize=".7rem"
                      fontWeight={400}
                      fontStyle="normal"
                    >
                      Number of Participant
                    </Text>
                    <Container
                      margin="1rem 0"
                      borderColor="#fff"
                      borderStyle="solid"
                      borderWidth="1px"
                      borderRadius="8px"
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      padding="0rem 2rem 0rem .3rem"
                    >
                      <InputField
                        type="text"
                        placeholder="Input amount of users"
                        noneBorder="none"
                        placeHolderColor="#fff"
                        smfontSize=".9rem"
                        color="#fff"
                        onChange={onUserChange}
                        value={noOfUsers}
                      />
                    </Container>
                  </Wrapper>

                  <Wrapper
                    display="flex"
                    flexDirection="column"
                    margin="0 0 1rem 0"
                  >
                    <Text
                      fontsize="1rem"
                      smfontSize=".7rem"
                      fontWeight={400}
                      fontStyle="normal"
                    >
                      Describe Tournament Rules/Guidelines
                    </Text>
                    <Container
                      margin="1rem 0"
                      borderColor="#fff"
                      borderStyle="solid"
                      borderWidth="1px"
                      borderRadius="8px"
                      display="flex"
                      height="fit-content"
                      flexDirection="row"
                      alignItems="center"
                      padding=".3rem"
                    >
                      <TextAreaField
                        rows={7}
                        cols={40}
                        placeholder="Enter Rules/Guidelines"
                        smfontSize=".9rem"
                        noneBorder="none"
                        padding="0 0 .5rem .3rem"
                        placeHolderColor="#fff"
                        color="#fff"
                        height="6rem"
                        value={tournamentRules}
                        onChange={onRuleChange}
                      />
                    </Container>
                  </Wrapper>
                </Container>
                <Wrapper
                  margin="0 2rem"
                  onClick={() => {
                    testFunction()
                    addTournament()
                  }}
                >
                  <button className="glowing-btn">
                    {isLoading ? (
                      <ClipLoader
                        color={color}
                        loading={isLoading}
                        cssOverride={override}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      <span className="glowing-txt">
                        C<span className="faulty-letter">r</span>eate Tournament
                      </span>
                    )}
                  </button>
                </Wrapper>

                {/* {tournamentType === "Prepaid" && !confirmPayment ? (
            <Wrapper margin="0 2rem">
              <Button
                backgroundColor="#F6B8FC"
                borderRadius="10px 10px 10px 10px"
                padding="0.4rem 1.2rem 0.5rem 1.2rem"
                justifyContent="center"
                display="flex"
                alignItems="center"
                height="fit-content"
                width="100%"
                cursor="pointer"
                onClick={() => setOpenModal(true)}
              >
                Make Payment
              </Button>
            </Wrapper>
          ) : (
            <Wrapper
              margin="0 2rem"
              onClick={() => {
                testFunction();
                createTournament();
              }}
            >
              <button className="glowing-btn">
                {loading ? (
                  <ClipLoader
                    color={color}
                    loading={loading}
                    cssOverride={override}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <span className="glowing-txt">
                    C<span className="faulty-letter">l</span>ick me
                  </span>
                )}
              </button>
            </Wrapper>
          )} */}
              </Container>
            </Wrapper>
            {/* {openModal && (
        <PaymentModal
          modal={setOpenModal}
          amount={poolPrize}
          addPayment={makePayment}
          loading={loading}
        />
      )} */}
          </Container>
        </Wrapper>
      </Container>
    </>
  )
}

export default CreateTournament
