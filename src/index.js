/*golbal chrome*/
import React from "react";
import ReactDOM from "react-dom";
import Popup from "./popup";
import { ConfigProvider } from "antd";

ReactDOM.render(
  <ConfigProvider>
    <Popup />
  </ConfigProvider>,
  document.getElementById("root")
);
