import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import logo from "./background.jpg"

const container = document.getElementById("root");
const App = () => (<div className="app">
    <h1>V2 Hola React :)</h1>
    <img src = {logo} />
</div>);

ReactDOM.render(<App />, container);