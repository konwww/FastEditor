import * as React from "react";
import * as ReactDOM from "react-dom";

import {Hello, Qe} from "./components/main";
import {QEditor} from "./ts/QEditor";

ReactDOM.render(
    <div id="qe"> </div>,
    document.getElementById("example")
);
const fe = new QEditor("qe", {
    "width": "700px"
    , "height": "500px"
    , "border": "solid #ccc 2px"
})
