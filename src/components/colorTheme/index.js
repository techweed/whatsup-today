import React from "react";
import "./styles.css";

const ColorTheme = ({ setTheme }) => (
  <div class="swatch">
    <div
      id="switch-1"
      style={{ backgroundColor: "#8ea4ff" }}
      onClick={() => setTheme("#8ea4ff")}
    ></div>
    <div
      id="switch-2"
      style={{ backgroundColor: "#2099f3" }}
      onClick={() => setTheme("#2099f3")}
    ></div>
    <div
      id="switch-3"
      style={{ backgroundColor: "#cc0000" }}
      onClick={() => setTheme("#cc0000")}
    ></div>
    <div
      id="switch-4"
      style={{ backgroundColor: "#eb21d0" }}
      onClick={() => setTheme("#eb21d0")}
    ></div>
    <div
      id="switch-5"
      style={{ backgroundColor: "#ffa500" }}
      onClick={() => setTheme("#ffa500")}
    ></div>
    <div
      id="switch-6"
      style={{ backgroundColor: "#774bb1" }}
      onClick={() => setTheme("#774bb1")}
    ></div>
  </div>
);
export default ColorTheme;
