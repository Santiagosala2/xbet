"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var useBetField = function (initialOpenModal) {
    var _a = react_1.useState(initialOpenModal), openModal = _a[0], setOpenModal = _a[1];
    var _b = react_1.useState(""), fieldSelected = _b[0], setFieldSelected = _b[1];
    var _c = react_1.useState({}), selectedValues = _c[0], setSelectedValues = _c[1];
    function wrapperSetOpenModal(fieldName) {
        setFieldSelected(fieldName);
        setOpenModal(true);
    }
    function handleSelectedValues(field, value) {
        var _a;
        var selectedValue = (_a = {}, _a[field] = value, _a);
        setSelectedValues(function (selectedValues) { return (__assign(__assign({}, selectedValues), selectedValue)); });
    }
    return [openModal, setOpenModal, fieldSelected, setFieldSelected, wrapperSetOpenModal, selectedValues, handleSelectedValues];
};
exports["default"] = useBetField;
