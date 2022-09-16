import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css"; // primeflex css
import "primeflex/primeflex.min.css"; // primeflex css
import "./utils/styles/index.css";
import "./utils/styles/components.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
