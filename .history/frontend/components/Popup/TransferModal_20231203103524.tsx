import React, { useState } from "react"
import styled from "styled-components"
import { RiCloseFill } from "react-icons/ri"
import { Text } from "../../styles/commonStyles/Text"
import { Button } from "../../styles/commonStyles/Button.styled"
import ClipLoader from "react-spinners/ClipLoader"
import { Container } from "../../styles/commonStyles/Container.styles"
import { InputField } from "../../styles/commonStyles/InputField"

type model = {
  addPayment: (money: any, address: string) => void
  modal: (isOpen: boolean) => void
  loading: boolean
}

const TransferModal = ({ addPayment, modal, loading }: model) => {
  const [color, setColor] = useState("#fff")
  const [recipientAddress, setRecipientAddress] = useState<string>("")
  const [amount, setAmount] = useState<number>(0)
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  }

  const onInputChange = (e: any) => {
    e.preventDefault()
    const Input = e.target.value
    setRecipientAddress(Input)
  }

  const onAmountChange = (e: any) => {
    e.preventDefault()
    const Input = e.target.value
    setAmount(Input)
  }

  return (
    <Wrapper aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <Container0>
        <Container2>
          <Container3>
            <Container4>
              <Modal>
                <Close onClick={() => modal(false)} />

                <Container display="flex" flexDirection="column">
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
                      placeholder="Input Recipient Address"
                      noneBorder="none"
                      placeHolderColor="#fff"
                      smfontSize=".9rem"
                      color="#fff"
                      onChange={onInputChange}
                      value={recipientAddress}
                    />
                  </Container>
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
                      placeholder="Input Amount In ICP"
                      noneBorder="none"
                      placeHolderColor="#fff"
                      smfontSize=".9rem"
                      color="#fff"
                      onChange={onAmountChange}
                      value={amount}
                    />
                  </Container>
                </Container>

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
                    addPayment(amount, recipientAddress)
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
      </Container0>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  z-index: 10;
`

const Container0 = styled.div`
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

export default TransferModal
