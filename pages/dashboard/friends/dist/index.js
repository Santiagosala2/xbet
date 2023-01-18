"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getServerSideProps = void 0;
var react_1 = require("react");
var Layout_1 = require("../../../components/Layout/Layout");
var user_1 = require("../../../services/user");
var auth_1 = require("../../api/auth");
var user_2 = require("../../api/user");
var image_1 = require("next/image");
var SuccessAlert_1 = require("../../../components/SuccessAlert/SuccessAlert");
function Friends(_a) {
    var data = _a.data, friends = _a.friends;
    var _b = react_1.useState([]), users = _b[0], setUsers = _b[1];
    var _c = react_1.useState(""), searchValue = _c[0], setSearchValue = _c[1];
    var _d = react_1.useState(false), showAlert = _d[0], setShowAlert = _d[1];
    var handleChange = function (e) {
        if (e.target.value.length > 0) {
            return user_1["default"].services.searchUsers(e.target.value, function (res) {
                setUsers(res);
                setSearchValue(e.target.value);
            });
        }
        setUsers([]);
    };
    var handleAddFriend = function (fromEmail) {
        var addFriendObj = {
            fromEmail: data.email,
            toEmail: fromEmail
        };
        user_1["default"].services.addFriend(addFriendObj, function (res) {
            user_1["default"].services.searchUsers(searchValue, function (res) {
                setShowAlert(true);
                setTimer(setShowAlert);
                return setUsers(res);
            });
        });
    };
    var handleAcceptRequest = function (friendshipId) {
        user_1["default"].services.acceptRequest({ friendshipId: friendshipId }, function (res) {
            user_1["default"].services.searchUsers(searchValue, function (res) {
                setShowAlert(true);
                setTimer(setShowAlert);
                return setUsers(res);
            });
        });
    };
    var handleRejectRequest = function (friendshipId) {
        user_1["default"].services.rejectRequest({ friendshipId: friendshipId }, function (res) {
            user_1["default"].services.searchUsers(searchValue, function (res) {
                setShowAlert(true);
                setTimer(setShowAlert);
                setUsers(res);
            });
        });
    };
    var setTimer = function (setter) {
        var timer = setTimeout(function () {
            setter(false);
        }, 3000);
        return function () { return clearTimeout(timer); };
    };
    return (React.createElement(Layout_1["default"], { userBalance: data.balance },
        React.createElement("div", { className: 'flex items-center justify-center my-5' },
            React.createElement("div", { className: "max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700" },
                React.createElement("label", { className: "block text-sm font-semibold leading-6 text-gray-900 mb-2" }, "Friends"),
                React.createElement("div", { className: "flex gap-4 flex-wrap mb-4" }, friends.map(function (f) { return (React.createElement("div", { key: f.email, className: "w-16 h-16 rounded border border-gray-900" },
                    React.createElement("div", { className: "h-full w-full flex justify-center items-center" },
                        React.createElement("p", { className: "text-sm" }, f.firstName)))); })),
                React.createElement("label", { className: "block text-sm font-semibold leading-6 text-gray-900 mb-2" }, "Find Friends"),
                React.createElement("div", { className: "flex-auto  border rounded-md  border-slate-300 px-1" },
                    React.createElement(image_1["default"], { className: "inline-block h-4 w-4 m-1", src: "/searchIcon.svg", alt: "search icon", width: 10, height: 10 }),
                    React.createElement("input", { type: "text", "aria-label": "Find Friends", className: "inline-block appearance-none text-slate-900 focus:outline-none text-sm", onChange: function (e) { return handleChange(e); } })),
                React.createElement("div", { className: "flow-root" },
                    React.createElement("ul", { role: "list", className: "divide-y divide-gray-200 dark:divide-gray-700" }, users.map(function (u) {
                        return (React.createElement("li", { className: "py-3 sm:py-4", key: u.email },
                            React.createElement("div", { className: "flex items-center space-x-4" },
                                React.createElement("div", { className: "flex-shrink-0" }),
                                React.createElement("div", { className: "flex-1 min-w-0" },
                                    React.createElement("p", { className: "text-sm font-medium text-gray-900 truncate" }, u.firstName),
                                    React.createElement("p", { className: "text-sm text-gray-500 truncate dark:text-gray-400" }, u.email)),
                                React.createElement("div", { className: "inline-flex items-center text-base font-semibold text-gray-900 " },
                                    (u.type == "Request" || u.type == "None") &&
                                        React.createElement("button", { type: "button", className: "rounded-lg font-sans text-sm font-semibold py-2 px-2 bg-slate-900 text-white hover:bg-slate-700 my-3 disabled:bg-slate-300", disabled: u.type == "Request", onClick: function () { return handleAddFriend(u.email); } }, (u.type == "Request") ? "Sent" : "Add"),
                                    u.type == "Friend" &&
                                        React.createElement("p", null, "Friend"),
                                    u.type == "Pending" &&
                                        React.createElement("div", { className: "flex" },
                                            React.createElement("button", { type: "button", className: "rounded-lg font-sans text-sm font-semibold py-2 px-2 bg-slate-900 text-white hover:bg-slate-700 my-3 disabled:bg-slate-300", onClick: function () { return handleAcceptRequest(u.friendshipId); } }, "Accept"),
                                            React.createElement("button", { type: "button", className: "rounded-lg font-sans text-sm font-semibold py-2 px-2 bg-white text-black hover:border-1.5 hover:border-black my-3 disabled:bg-slate-300", onClick: function () { return handleRejectRequest(u.friendshipId); } }, "Reject"))))));
                    }))))),
        showAlert &&
            React.createElement(SuccessAlert_1["default"], { message: "Done" })));
}
function getServerSideProps(context) {
    return __awaiter(this, void 0, void 0, function () {
        var authCheckResponse, data, friends;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, auth_1.authCheck(context.req)];
                case 1:
                    authCheckResponse = _a.sent();
                    if (!authCheckResponse.result) return [3 /*break*/, 4];
                    return [4 /*yield*/, user_2.getUserData(context.req)];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, user_2.getFriends(context.req)];
                case 3:
                    friends = _a.sent();
                    return [3 /*break*/, 5];
                case 4: return [2 /*return*/, {
                        redirect: {
                            permanent: false,
                            destination: "/login"
                        }
                    }];
                case 5: 
                // Pass data to the page via props
                return [2 /*return*/, { props: { data: data, friends: friends } }];
            }
        });
    });
}
exports.getServerSideProps = getServerSideProps;
exports["default"] = Friends;
