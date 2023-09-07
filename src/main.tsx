import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "styles/index.css"; // empty
import "antd/dist/antd.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

window.removeLoading();
