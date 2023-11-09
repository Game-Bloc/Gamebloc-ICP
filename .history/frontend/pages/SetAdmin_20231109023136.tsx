import React, { useState } from "react";
import { Wrapper } from "../styles/commonStyles/Wrapper";
import { Container } from "../styles/commonStyles/Container.styles";
import { Text } from "../styles/commonStyles/Text";
import { InputField } from "../styles/commonStyles/InputField";
import { Button } from "../styles/commonStyles/Button.styled";
import ClipLoader from "react-spinners/ClipLoader";
import { useGameblocFunction } from "../functions/GameblocHook";

const SetAdmin = () => {
  const {
    loading,
    addAdminFunction,
    checkAdmin,
    checkAdminState,
    updating,
    removeAdminAddress,
  } = useGameblocFunction();
  const [address, setAddress] = useState<string>("");
  const [rAddress, setRaddress] = useState<string>("");
  const [color, setColor] = useState("#fff");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  };

  const onInputChange = (e: any) => {
    e.preventDefault();
    const addressInput = e.target.value;
    setAddress(addressInput);
  };
  const onAdminChange = (e: any) => {
    e.preventDefault();
    const Input = e.target.value;
    setRaddress(Input);
  };

  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Wrapper
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        margin="0 0 .4rem 0"
      >
        <Text
          fontsize="1rem"
          smfontSize=".7rem"
          fontWeight={400}
          fontStyle="normal"
        >
          Set Admin
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
            placeholder="Input Address"
            noneBorder="none"
            placeHolderColor="#fff"
            smfontSize=".9rem"
            color="#fff"
            onChange={onInputChange}
            value={address}
          />
        </Container>
      </Wrapper>

      <Wrapper
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Wrapper margin=".4rem 2rem">
          <Button
            backgroundColor="#F6B8FC"
            borderRadius="10px 10px 10px 10px"
            padding="0.4rem 1.2rem 0.5rem 1.2rem"
            justifyContent="center"
            display="flex"
            alignItems="center"
            height="fit-content"
            width="100%"
            onClick={() =>
              // console.log("add", address)
              addAdminFunction(
                address,
                "This address has been made an admin",
                "Error can't set this address as an admin",
                ""
              )
            }
          >
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
              "Make Admin"
            )}
          </Button>
        </Wrapper>
        <Wrapper margin=".4rem 2rem">
          <Button
            backgroundColor="#F6B8FC"
            borderRadius="10px 10px 10px 10px"
            padding="0.4rem 1.2rem 0.5rem 1.2rem"
            justifyContent="center"
            display="flex"
            alignItems="center"
            height="fit-content"
            width="100%"
            onClick={() =>
              checkAdmin(
                address,
                "This address is an admin",
                " this address is not an admin",
                ""
              )
            }
          >
            {checkAdminState ? (
              <ClipLoader
                color={color}
                loading={checkAdminState}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "check Admin"
            )}
          </Button>
        </Wrapper>
      </Wrapper>

      <Wrapper
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        margin="2rem 0 .2rem 0"
      >
        <Text
          fontsize="1rem"
          smfontSize=".7rem"
          fontWeight={400}
          fontStyle="normal"
        >
          Remove Admin
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
            placeholder="Input Address"
            noneBorder="none"
            placeHolderColor="#fff"
            smfontSize=".9rem"
            color="#fff"
            onChange={onAdminChange}
            value={rAddress}
          />
        </Container>
      </Wrapper>
      <Wrapper margin=".4rem 2rem">
        <Button
          backgroundColor="#F6B8FC"
          borderRadius="10px 10px 10px 10px"
          padding="0.4rem 1.2rem 0.5rem 1.2rem"
          justifyContent="center"
          display="flex"
          alignItems="center"
          height="fit-content"
          width="100%"
          onClick={() =>
            removeAdminAddress(
              rAddress,
              "This address has been canceled as an admin",
              "Something went wrong",
              ""
            )
          }
        >
          {updating ? (
            <ClipLoader
              color={color}
              loading={updating}
              cssOverride={override}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Remove Admin"
          )}
        </Button>
      </Wrapper>
    </Container>
  );
};

export default SetAdmin;
