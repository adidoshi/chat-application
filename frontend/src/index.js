import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./context/ChatProvider";
import { myTheme } from "./customTheme/myTheme";

ReactDOM.render(
  <ChakraProvider>
    <BrowserRouter>
      <ChatProvider theme={myTheme}>
        <App />
      </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
