import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <InjectTailwind> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </InjectTailwind> */}
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
