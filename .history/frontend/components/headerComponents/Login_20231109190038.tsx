/* eslint-disable no-lone-blocks */

import { Container } from "../../styles/commonStyles/Container.styles"
import { Wrapper } from "../../styles/commonStyles/Wrapper"
import React from "react"
import { Button } from "../../styles/commonStyles/Button.styled"
import { ConnectButton, ConnectDialog } from "@connect2ic/react"
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
        <ConnectButton
          style={{ backgroundColor: "#F6B8FC", color: "#000" }}
          dark={false}
        />
      </Container>
      <ConnectDialog />
    </Wrapper>
  )
}

export default Login
