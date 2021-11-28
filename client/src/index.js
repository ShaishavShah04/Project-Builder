import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Grommet } from "grommet";
import App from "./App";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px"
    },
  },
};

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <Grommet theme={theme}>
      <App />
    </Grommet>
  </StrictMode>,
  rootElement
);
