"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var SearchBar = function (_a) {
    var inputName = _a.inputName, onChange = _a.onChange, placeHolder = _a.placeHolder;
    return (React.createElement("div", { className: "flex-auto  border rounded-md  border-slate-300 px-1" },
        React.createElement(image_1["default"], { className: "inline-block h-4 w-4 m-1", src: "/searchIcon.svg", alt: "search icon", width: 10, height: 10 }),
        React.createElement("input", { type: "text", "aria-label": inputName, className: "inline-block appearance-none text-slate-900 focus:outline-none text-sm", onChange: onChange, placeholder: placeHolder })));
};
exports["default"] = SearchBar;
