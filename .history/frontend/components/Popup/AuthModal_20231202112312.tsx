import React, { useState } from "react"
import styled from "styled-components"
import { Text } from "../../styles/commonStyles/Text"
import { ConnectButton, ConnectDialog } from "@connect2ic/react"
import "@connect2ic/core/style.css"

type modal = {
  modal: any
}

const AuthModal = ({ modal }: modal) => {
  return (
    <Wrapper aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <Container>
        <Container2>
          <Container3>
            <Container4>
              <Modal>
                <Text fontWeight={500} margin="1rem 0" textAlign="center">
                  Please Authenticate with NFID, other identity provider seems
                  to be down. We are currently working to rectify this.
                </Text>
                <Container5>
                  <Button onClick={() => modal(false)}>Close</Button>
                  <ConnectButton
                    style={{
                      backgroundColor: "#F6B8FC",
                      color: "#000",
                      fontWeight: "800",
                    }}
                    dark={false}
                  />
                  <ConnectDialog />
                </Container5>
              </Modal>
            </Container4>
          </Container3>
        </Container2>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  z-index: 10;
`

const Container = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(128, 128, 128, 0.2);
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
const Container5 = styled.div`
  margin: 2rem 0 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
  }
`

const Container4 = styled.div`
  position: relative;
  background-color: white;
  width: 50%;
  border-radius: 10px;
  overflow: hidden;
`

const Modal = styled.div`
  background-color: #01070e;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  h3 {
    color: white;
  }
`

const Button = styled.div`
  background-color: #f6b8fcb5;
  border-radius: 9999px;
  padding: 0.7rem 2rem;
  color: #000000;
  font-size: 16px;
  font-weight: 800;
  border: none;
  margin: 0 1rem 0 0;
  cursor: pointer;

  &:hover {
    scale: 1.03;
    background-color: #f6b8fc;
  }
`

export default AuthModal
