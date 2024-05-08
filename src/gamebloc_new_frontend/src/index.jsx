import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css"
import { Provider } from "react-redux"
import store from "./redux/store"
import { AuthProvider } from "./Auth/use-auth-client"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

const container = document.getElementById("app")
const root = createRoot(container)
let persistor = persistStore(store)

root.render(
  <Router>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </Router>,
)
