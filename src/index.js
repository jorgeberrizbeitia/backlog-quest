import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // to use routes, params and redirect
import { AuthProvider } from "./lib/Auth"; // Context for passing auth information
import App from "./App";
require('dotenv').config();

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
