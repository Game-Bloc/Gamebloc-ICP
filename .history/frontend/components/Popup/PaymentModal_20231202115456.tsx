import React, { useState } from "react"
import styled from "styled-components"
import { RiCloseFill } from "react-icons/ri"
import { Text } from "../../styles/commonStyles/Text"
import { Button } from "../../styles/commonStyles/Button.styled"
import ClipLoader from "react-spinners/ClipLoader"

type model = {
  addPayment: (money: any) => void
  modal: (isOpen: boolean) => void
  amount: any
  loading: any
}

const PaymentModal = ({ addPayment, modal, amount, loading }: model) => {
  const [color, setColor] = useState("#fff")
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  }

  return (
    <Wrapper aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <Container>
        <Container2>
          <Container3>
            <Container4>
              <Modal>
                <Close onClick={() => modal(false)} />
                <Text
                  textAlign="center"
                  fontWeight={500}
                  fontsize="1.1rem"
                  mdfontSize=".8rem"
                  margin="4rem 0 2rem 0"
                >
                  Proceed to make a payment of {amount} ICP to join this
                  Tournament
                </Text>
                <Button
                  margin="0 0 1rem 0"
                  backgroundColor="#F6B8FC"
                  borderRadius="10px 10px 10px 10px"
                  padding="0.4rem 1.2rem 0.5rem 1.2rem"
                  justifyContent="center"
                  display="flex"
                  alignItems="center"
                  height="fit-content"
                  width="80%"
                  cursor="pointer"
                  onClick={() => {
                    addPayment(amount)
                  }}
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
                    "Proceed"
                  )}
                </Button>
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
  justify-content: center;
  align-items: center;
  h3 {
    color: white;
  }
`

// const Button = styled.div`
//   background-color: #f6b8fcb5;
//   border-radius: 9999px;
//   padding: 1rem 2rem;
//   color: #000000;
//   font-size: 16px;
//   border: none;
//   margin: 1rem 0rem;
//   cursor: pointer;

//   &:hover {
//     scale: 1.03;
//     background-color: #f6b8fc;
//   }
// `;

const Close = styled(RiCloseFill)`
  position: absolute;
  color: white;
  right: 1rem;
  font-size: 2rem;
  top: 1rem;
  cursor: pointer;
`

export default PaymentModal
