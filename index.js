import ReactDOM from "react-dom";
import React from "react";
import Component from "./src/client/component.js";

document.addEventListener("DOMContentLoaded", function (event) {
    var mainContainer = document.getElementById("main");
    ReactDOM.render(<Component />, mainContainer);
});