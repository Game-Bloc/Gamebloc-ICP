import { AuthClient } from "@dfinity/auth-client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { canisterId, createActor, kitchen } from "../../../declarations/kitchen"
import {
  canisterId as canisterId2,
  createActor as createActor2,
  game_bloc_backend,
} from "../../../declarations/game_bloc_backend"
import {
  canisterId as ledgerId,
  createActor as createLedgerActor,
} from "../../../declarations/icp_ledger"
import { ActorSubclass, SignIdentity } from "@dfinity/agent"
import { _SERVICE, AppMessage } from "../../../declarations/kitchen/kitchen.did"
import { _SERVICE as _SERVICE2 } from "../../../declarations/game_bloc_backend/game_bloc_backend.did"
import { _SERVICE as _SERVICE3 } from "../../../declarations/icp_ledger/icp_ledger.did"
import { _SERVICE as _SERVICE4 } from "../../../declarations/icp_index/icp_index.did"
import {
  gatewayUrl,
  icUrl,
  localGatewayUrl,
  localICUrl,
} from "../components/utils/ws"
import { useAppDispatch } from "../redux/hooks"
import { updateAuth } from "../redux/slice/authClient"
import IcWebSocket from "ic-websocket-js"
import {
  canisterId as indexId,
  createActor as createIndexActor,
} from "../../../declarations/icp_index"
import { useNavigate } from "react-router-dom"

import {
  clearAuthClientStorage,
  deriveKeysFromSeedPhrase,
  createIdentityFromKeyPair,
  validateAndFixSeedPhrase,
  generateSeedPhrase,
} from "../Utils/CryptoUtils"
import MetaMaskService from "../services/MetaMaskService"

const AuthContext = React.createContext<{
  isAuthenticated: boolean
  notAuthenticated: boolean
  login: any
  loginNFID: any
  loginWithMetaMask: any
  logout: any
  authClient: any
  identity: any
  principal: any
  ws: IcWebSocket<_SERVICE, AppMessage> | null
  whoamiActor: ActorSubclass<_SERVICE> | null
  whoamiActor2: ActorSubclass<_SERVICE2> | null
  ledgerActor: ActorSubclass<_SERVICE3> | null
  indexActor: ActorSubclass<_SERVICE4> | null
}>({
  isAuthenticated: false,
  notAuthenticated: true,
  login: null,
  loginNFID: null,
  loginWithMetaMask: null,
  logout: null,
  authClient: null,
  identity: null,
  principal: null,
  ws: null,
  whoamiActor: null,
  whoamiActor2: null,
  ledgerActor: null,
  indexActor: null,
})
const network = process.env.DFX_NETWORK || "local"
const APPLICATION_NAME = "GameBloc"
const APPLICATION_LOGO_URL = "https://i.postimg.cc/zBMQpTJn/Asset-51.png"

//127.0.0.1:4943/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai

const AUTH_PATH =
  "/authenticate/?applicationName=" +
  APPLICATION_NAME +
  "&applicationLogo=" +
  APPLICATION_LOGO_URL +
  "#authorize"

const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app"
        : process.env.LOCAL_II_CANISTER,
  },
  loginNFID: {
    windowOpenerFeatures:
      `left=${window.screen.width / 2 - 525 / 2}, ` +
      `top=${window.screen.height / 2 - 705 / 2},` +
      `toolbar=0,location=0,menubar=0,width=525,height=705`,
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://nfid.one" + AUTH_PATH
        : "https://nfid.one" + AUTH_PATH,
  },
}

/**
 *
 * @param options - Options for the AuthClient
 * @param {AuthClientCreateOptions} options.createOptions - Options for the AuthClient.create() method
 * @param {AuthClientLoginOptions} options.loginOptions - Options for the AuthClient.login() method
 * @returns
 */
export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [notAuthenticated, setNotAuthenticated] = useState(true)
  const [authClient, setAuthClient] = useState(null)
  const [identity, setIdentity] = useState(null)
  const [principal, setPrincipal] = useState(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [ws, setWs] = useState<IcWebSocket<_SERVICE, AppMessage> | null>(null)
  const [whoamiActor, setWhoamiActor] = useState<ActorSubclass<_SERVICE>>()
  const [whoamiActor2, setWhoamiActor2] = useState<ActorSubclass<_SERVICE2>>()
  const [ledgerActor, setLedgerAcor] = useState<ActorSubclass<_SERVICE3>>()
  const [indexActor, setIndexAcor] = useState<ActorSubclass<_SERVICE4>>()

  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create().then((client) => {
      setAuthClient(client)
    })
  }, [])

  const login = () => {
    authClient.login({
      ...options.loginOptions,
      derivationOrigin:
        process.env.DFX_NETWORK === "ic"
          ? "https://gamebloc.app"
          : "http://localhost:8080",
      maxTimeToLive: BigInt(744) * BigInt(3_600_000_000_000),
      onSuccess: () => {
        updateClient(authClient)
        navigate("/dashboard")
      },
    })
  }

  const loginNFID = () => {
    authClient.login({
      ...options.loginNFID,
      derivationOrigin:
        process.env.DFX_NETWORK === "ic"
          ? "https://gamebloc.app"
          : "http://localhost:8080",
      maxTimeToLive: BigInt(744) * BigInt(3_600_000_000_000),
      onSuccess: () => {
        updateClient(authClient)
        navigate("/dashboard")
      },
    })
  }

  const loginWithMetaMask = async () => {
    try {
      // Unique message for signature to create deterministic seed
      const uniqueMessage =
        "Sign this message to log in with your Ethereum wallet"

      console.log("Requesting MetaMask signature...")
      const signature = await MetaMaskService.signMessage(uniqueMessage)
      console.log("MetaMask Signature received")

      if (!signature) {
        throw new Error("Failed to sign with MetaMask.")
      }

      // Generate seed phrase from signature
      console.log("Generating seed phrase from signature...")
      const seedPhrase = await generateSeedPhrase(signature)

      // Wait for this to fully complete before continuing
      console.log("Initializing login flow with seed phrase...")
      // await this.handleLoginFlow(seedPhrase, { source: 'metamask', retry: true });
      // Validate and potentially fix the seed phrase
      const validSeedPhrase = validateAndFixSeedPhrase(seedPhrase)
      console.log(`Processing login with seed phrase `)
      // Derive keys and create identity
      const keyPair = deriveKeysFromSeedPhrase(validSeedPhrase)
      const identity = createIdentityFromKeyPair(keyPair)
      console.log("Creating identity from key pair...")
      setIdentity(identity)
      setIsAuthenticated(true)
      const principal = identity.getPrincipal()
      setPrincipal(principal)
      console.log("Principal:", principal.toString())
      const actor = createActor(canisterId, {
        agentOptions: {
          identity,
        },
      })
      const actor2 = createActor2(canisterId2, {
        agentOptions: {
          identity,
        },
      })
      const actor3 = createLedgerActor(ledgerId, {
        agentOptions: {
          identity,
        },
      })
      const actor4 = createIndexActor(indexId, {
        agentOptions: {
          identity,
        },
      })
      setWhoamiActor(actor)
      setWhoamiActor2(actor2)
      setLedgerAcor(actor3)
      setIndexAcor(actor4)
      console.log("Actors created successfully")

      return navigate("/dashboard")
    } catch (error) {
      console.error("MetaMask login error:", error)
      throw new Error(`MetaMask login failed: ${error.message}`)
    }
  }

  async function updateClient(client) {
    try {
      const isAuthenticated = await client.isAuthenticated()
      setIsAuthenticated(isAuthenticated)
      if (isAuthenticated == false) {
        setNotAuthenticated(false)
      }

      const identity = client.getIdentity()
      setIdentity(identity)
      const principal = identity.getPrincipal()

      setPrincipal(principal)
      // console.log("Principal", principal)
      setAuthClient(client)

      const actor = createActor(canisterId, {
        agentOptions: {
          identity,
        },
      })
      // console.log("kitchen backend", canisterId)

      const actor2 = createActor2(canisterId2, {
        agentOptions: {
          identity,
        },
      })
      // console.log("Gbc backend", canisterId2)

      const actor3 = createLedgerActor(ledgerId, {
        agentOptions: {
          identity,
        },
      })
      // console.log("ledger backend", ledgerId)

      const actor4 = createIndexActor(indexId, {
        agentOptions: {
          identity,
        },
      })
      // console.log("index backend", indexId)
      // console.log("Actor", actor2)
      setWhoamiActor(actor)
      setWhoamiActor2(actor2)
      setLedgerAcor(actor3)
      setIndexAcor(actor4)

      const _ws = new IcWebSocket(
        network === "local" ? localGatewayUrl : gatewayUrl,
        undefined,
        {
          canisterId: canisterId,
          canisterActor: kitchen,
          identity: identity as SignIdentity,
          networkUrl: network === "local" ? localICUrl : icUrl,
        },
      )

      _ws.onopen = () => {
        console.log(
          "WebSocket state:",
          ws.readyState,
          "is open:",
          ws.readyState === ws.OPEN,
        )
      }

      // console.log("web socket status", _ws)

      setWs(_ws)
    } catch (err) {
      console.log("Error on auth:", err)
    }
  }

  // async function logout() {
  //   await authClient?.logout()
  //   setIsAuthenticated(false)
  //   setIdentity(null)
  //   await updateClient(authClient)
  //   sessionStorage.setItem("userState", "false")
  // }
  async function logout() {
    try {
      // Standard AuthClient logout
      await authClient?.logout()

      // Force clear IndexedDB storage
      await clearAuthClientStorage()

      // Reset application state
      setIsAuthenticated(false)
      setIdentity(null)
      setPrincipal(null)
      // setEthAddress(null) // If using MetaMask

      // Reset actors
      setWhoamiActor(null)
      setWhoamiActor2(null)
      setLedgerAcor(null)
      setIndexAcor(null)

      // Close WebSocket connection
      ws?.close()

      // Clear session markers
      sessionStorage.removeItem("userState")
      sessionStorage.removeItem("persist:root")
      localStorage.removeItem("ic-session-key")

      console.log("Full logout completed")
    } catch (error) {
      console.error("Logout failed:", error)
      throw new Error("Failed to complete logout")
    }
  }

  return {
    isAuthenticated,
    notAuthenticated,
    login,
    loginNFID,
    loginWithMetaMask,
    logout,
    authClient,
    identity,
    principal,
    ws,
    whoamiActor,
    whoamiActor2,
    ledgerActor,
    indexActor,
  }
}

/**
 * @type {React.FC}
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuthClient()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
