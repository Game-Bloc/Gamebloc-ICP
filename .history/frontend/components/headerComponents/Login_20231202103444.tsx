/* eslint-disable no-lone-blocks */

import { Container } from "../../styles/commonStyles/Container.styles"
import { Wrapper } from "../../styles/commonStyles/Wrapper"
import React, { useState } from "react"
import { Button } from "../../styles/commonStyles/Button.styled"
import AuthModal from "../Popup/AuthModal"

const Login = () => {
  const [modal, setModal] = useState<boolean>(false)

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
          smfontsize=".9rem"
          width="fit-content"
          cursor="pointer"
          textColor="#01070E"
          xmdpadding=".3rem .4rem"
          padding=".8rem 1rem"
          border="none"
          borderRadius="9999px"
          smmargin=".4rem"
          margin=" 0 0 0 2rem"
          fontWeight="800"
          onClick={() => setModal(true)}
        >
          Login
        </Button>
      </Container>
      {modal && <AuthModal modal={setModal} />}
    </Wrapper>
  )
}

export default Login
