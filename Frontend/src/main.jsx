import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <BrowserRouter basename="/app/timer/">
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </ChakraProvider>
);
