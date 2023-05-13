import { StrictMode } from "react";
import ReactDOM from "react-dom";
import React, { Component } from 'react';
// import "./../node_modules/cal-heatmap/dist"
import App from "./App";



const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);


// render(<Application />, document.getElementById('root'));