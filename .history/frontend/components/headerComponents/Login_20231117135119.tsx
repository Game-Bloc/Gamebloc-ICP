/* eslint-disable no-lone-blocks */

import { Container } from "../../styles/commonStyles/Container.styles"
import { Wrapper } from "../../styles/commonStyles/Wrapper"
import React from "react"
import { Button } from "../../styles/commonStyles/Button.styled"
import "@connect2ic/core/style.css"

const Login = () => {
  return (
    <Wrapper>
      <Container
        display="flex"
        flexDirection="row"
        smjustifycontent="none"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* <ConnectButton
          style={{
            backgroundColor: "#F6B8FC",
            color: "#000",
            fontWeight: "800",
          }}
          dark={false}
        />
      <ConnectDialog /> */}
        <Button
          backgroundColor="#F6B8FC"
          smfontsize=".8rem"
          width="fit-content"
          cursor="pointer"
          textColor="#01070E"
          xmdpadding=".3rem .4rem"
          padding=".8rem .6rem"
          border="none"
          borderRadius="9999px"
          smmargin=".4rem"
          margin=" 0 0 0 2rem"
        >
          Create Account
        </Button>
      </Container>
    </Wrapper>
  )
}

export default Login
