import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import App from "./App"
import { AuthProvider } from "./use-auth-client"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
)
