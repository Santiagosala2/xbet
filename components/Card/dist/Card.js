"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var Card = function (_a) {
    var name = _a.name, path = _a.path, onClick = _a.onClick, children = _a.children;
    return (React.createElement("div", { className: "w-36 p-6 bg-white border border-slate-900 rounded-lg shadow  inline-block my-6 mr-6 cursor-pointer", onClick: onClick },
        path && React.createElement(image_1["default"], { className: "w-10 h-10 mb-2 text-slate-900", src: path, alt: name, width: 80, height: 80 }),
        path && React.createElement("a", { href: "#" },
            React.createElement("h5", { className: "mb-2 text-2xl font-semibold tracking-tight text-slate-900" }, name)),
        children && children));
};
exports["default"] = Card;
