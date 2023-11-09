/* eslint-disable no-lone-blocks */

import { Container } from "../../styles/commonStyles/Container.styles";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "../../styles/commonStyles/Button.styled";

const Login = () => {
  const authenticateUser = async () => {
    const nnsCanisterId = "qoctq-giaaa-aaaaa-aaaea-cai";

    // Whitelist
    const whitelist = [nnsCanisterId];

    // Host
    const host = "https://mainnet.dfinity.network";

    // Callback to print sessionData
    const onConnectionUpdate = () => {
      console.log(window.ic.plug.sessionManager.sessionData);
    };

    // Make the request
    try {
      const publicKey = await window.ic.plug.requestConnect({
        whitelist,
        host,
        onConnectionUpdate,
        timeout: 50000,
      });
      console.log(`The connected user's public key is:`, publicKey);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Container
        display="flex"
        flexDirection="row"
        smjustifycontent="none"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          backgroundColor="#F6B8FC"
          smfontsize=".8rem"
          fontSize="1rem"
          width="fit-content"
          cursor="pointer"
          textColor="#01070E"
          xmdpadding=".3rem .4rem"
          padding=".8rem .6rem"
          border="none"
          borderRadius="9999px"
          smmargin=".4rem"
          margin=" 0 0 0 2rem"
          onClick={() => authenticateUser()}
        >
          Create Account
        </Button>
      </Container>
    </Wrapper>
  );
};

export default Login;
