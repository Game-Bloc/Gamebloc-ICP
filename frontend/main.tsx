import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import App from "./App"

ReactDOM.render(

    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,

  document.getElementById("root"),
)
