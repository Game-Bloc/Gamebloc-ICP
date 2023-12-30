import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./Auth/use-auth-client";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Router>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </Router>
);
