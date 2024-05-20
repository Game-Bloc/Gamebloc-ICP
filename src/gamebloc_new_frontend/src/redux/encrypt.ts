import CryptoJS from "crypto-js"
import { createTransform } from "redux-persist"

const ENCRYPTION_KEY = "gamerState"

const encryptState = (state) => {
  const encryptedState = CryptoJS.AES.encrypt(
    JSON.stringify(state),
    ENCRYPTION_KEY,
  ).toString()
  return encryptedState
}

const decryptState = (encryptedState) => {
  const decryptedState = CryptoJS.AES.decrypt(
    encryptedState,
    ENCRYPTION_KEY,
  ).toString(CryptoJS.enc.Utf8)
  return JSON.parse(decryptedState)
}

export const encryptTransform = createTransform(
  (inboundState, key) => {
    return encryptState(inboundState)
  },
  (outboundState, key) => {
    return decryptState(outboundState)
  },
)
