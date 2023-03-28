"use strict";
exports.__esModule = true;
var BetField = function (_a) {
    var name = _a.name, emoji = _a.emoji, value = _a.value, btnOnClick = _a.btnOnClick, btnResetSelectedValueClick = _a.btnResetSelectedValueClick;
    var renderSelectedValue = (value != "" && value);
    return (React.createElement("div", null,
        React.createElement("label", { className: "block text-sm font-semibold leading-6 text-gray-900 mb-2" }, name),
        React.createElement("div", { className: "flex-auto  border rounded-md  border-slate-300 p-1 " }, !renderSelectedValue ?
            React.createElement("button", { type: "button", onClick: btnOnClick ? function () { return btnOnClick(name); } : btnOnClick, className: "text-slate-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-1 hover:text-white border-gray-600 hover:bg-slate-900 hover:border-gray-600" },
                "Add ",
                emoji)
            :
                React.createElement("div", { className: "text-slate-900 bg-white border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-1  border-gray-600 w-fit" },
                    value,
                    React.createElement("button", { type: "button", onClick: function () { return btnResetSelectedValueClick(name, ""); }, className: "text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center", "data-modal-hide": "defaultModal" },
                        React.createElement("svg", { "aria-hidden": "true", className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                            React.createElement("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" })))))));
};
exports["default"] = BetField;
