"use strict";
exports.__esModule = true;
var NavBar_1 = require("../NavBar/NavBar");
function Layout(_a) {
    var children = _a.children, userBalance = _a.userBalance;
    return (React.createElement(React.Fragment, null,
        React.createElement(NavBar_1["default"], { userBalance: userBalance }),
        React.createElement("main", null, children)));
}
exports["default"] = Layout;
