import { AuthClient } from "@dfinity/auth-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { canisterId, createActor } from "../../../declarations/kitchen";
import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE } from "../../../declarations/kitchen/kitchen.did";
import { useAppDispatch } from "../redux/hooks";
import { updateAuth } from "../redux/slice/authClient";

const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  login: any;
  loginNFID: any;
  logout: any;
  authClient: any;
  identity: any;
  principal: any;
  whoamiActor: ActorSubclass<_SERVICE> | undefined;
}>({
  isAuthenticated: false,
  login: undefined,
  loginNFID: undefined,
  logout: undefined,
  authClient: undefined,
  identity: undefined,
  principal: undefined,
  whoamiActor: undefined,
});
const APPLICATION_NAME = "GameBloc";
const APPLICATION_LOGO_URL = "https://i.postimg.cc/zBMQpTJn/Asset-51.png";

//127.0.0.1:4943/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai

const AUTH_PATH =
  "/authenticate/?applicationName=" +
  APPLICATION_NAME +
  "&applicationLogo=" +
  APPLICATION_LOGO_URL +
  "#authorize";

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
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://nfid.one" + AUTH_PATH
        : "https://nfid.one" + AUTH_PATH,
  },
};

/**
 *
 * @param options - Options for the AuthClient
 * @param {AuthClientCreateOptions} options.createOptions - Options for the AuthClient.create() method
 * @param {AuthClientLoginOptions} options.loginOptions - Options for the AuthClient.login() method
 * @returns
 */
export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const dispatch = useAppDispatch();
  const [whoamiActor, setWhoamiActor] = useState<ActorSubclass<_SERVICE>>();

  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create(options.createOptions).then(async (client) => {
      updateClient(client);
    });
  }, []);

  const login = () => {
    authClient.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
      },
    });
  };

  const loginNFID = () => {
    authClient.login({
      ...options.loginNFID,
      onSuccess: () => {
        updateClient(authClient);
      },
    });
  };

  async function updateClient(client) {
    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);

    const identity = client.getIdentity();
    setIdentity(identity);
    console.log("identity", identity);
    const principal = identity.getPrincipal();
    setPrincipal(principal);
    console.log("Principal", principal.toString());
    setAuthClient(client);

    const actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    dispatch(
      updateAuth({
        type: "authenticationClient/updateAuth",
        payload: actor,
      })
    );
    console.log("Actor....", actor);
    setWhoamiActor(actor);
  }

  async function logout() {
    await authClient?.logout();
    await updateClient(authClient);
  }

  return {
    isAuthenticated,
    login,
    loginNFID,
    logout,
    authClient,
    identity,
    principal,
    whoamiActor,
  };
};

/**
 * @type {React.FC}
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
