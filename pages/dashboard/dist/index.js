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
var user_1 = require("../api/user");
var auth_1 = require("../api/auth");
var Layout_1 = require("../../components/Layout/Layout");
var react_1 = require("react");
var Card_1 = require("../../components/Card/Card");
var router_1 = require("next/router");
var image_1 = require("next/image");
var constants_1 = require("../../constants/constants");
var user_2 = require("../../services/user");
var formatDate = function (value) {
    var d = new Date(value);
    var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    var mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    var da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return da + "/" + mo + "/" + ye;
};
var weatherPendingBetKeys = [{ key: "betID", name: "Bet Id" }, { key: "type", name: "Type" }, { key: "status", name: "Status" }, { key: "when", name: "When" }, { key: "location", name: "Location" }, { key: "climate", name: "Answer (Climate)" }, { key: "friendName", name: "Friend" }, { key: "friendClimate", name: "Friend answer (Climate)" }, { key: "wager", name: "Wager" }];
var manualPendingBetKeys = [{ key: "betID", name: "Bet Id" }, { key: "type", name: "Type" }, { key: "status", name: "Status" }, { key: "when", name: "When" }, { key: "judgeName", name: "Judge" }, { key: "friendName", name: "Friend" }, { key: "wager", name: "Wager" }];
var weatherAwaitingBetKeys = [{ key: "betID", name: "Bet Id" }, { key: "wager", name: "Wager" }, { key: "when", name: "When" }, { key: "location", name: "Location" }, { key: "friendName", name: "Friend" }];
function Dashboard(_a) {
    var data = _a.data, bets = _a.bets;
    var router = router_1.useRouter();
    var _b = react_1.useState(data.balance), initialBalance = _b[0], setInitialBalance = _b[1];
    var _c = react_1.useState(null), selectedBet = _c[0], setSelectedBet = _c[1];
    var _d = react_1.useState(false), openDetailsModal = _d[0], setOpenDetailsModal = _d[1];
    var _e = react_1.useState([]), betKeys = _e[0], setBetKeys = _e[1];
    var _f = react_1.useState(), currentBetModalState = _f[0], setCurrentBetModalState = _f[1];
    var _g = react_1.useState(null), climateAnswer = _g[0], setClimateAnswer = _g[1];
    var selectedClimateAnswerClass = "border-green-500";
    var handleOpenDetailsModal = function (bet, state) {
        setOpenDetailsModal(true);
        handleModalStateChange(state);
        if (state === "pending") {
            if (bet.type === "weather") {
                setBetKeys(weatherPendingBetKeys);
            }
            else {
                setBetKeys(manualPendingBetKeys);
            }
        }
        if (state === "awaiting") {
            if (bet.type === "weather") {
                setBetKeys(weatherAwaitingBetKeys);
            }
        }
        setSelectedBet(bet);
    };
    var handleCloseOpenDetailsModal = function () {
        setClimateAnswer(null);
        setOpenDetailsModal(false);
    };
    var handleModalStateChange = function (state) {
        if (state !== currentBetModalState) {
            setCurrentBetModalState(state);
        }
    };
    var refreshData = function () {
        router.replace(router.asPath);
    };
    var handleAcceptBet = function () {
        if (selectedBet) {
            user_2["default"].services.acceptBet(selectedBet.betID, { friendClimate: climateAnswer }, function () {
                setOpenDetailsModal(false);
                refreshData();
            });
        }
    };
    var handleRejectBet = function () {
        if (selectedBet) {
            user_2["default"].services.rejectBet(selectedBet.betID, function () {
                setOpenDetailsModal(false);
                refreshData();
            });
        }
    };
    return (React.createElement(Layout_1["default"], { userBalance: initialBalance },
        React.createElement("div", { className: 'm-7' },
            React.createElement("h5", { className: 'text-2xl text-slate-900 my-2' },
                "Welcome! ",
                data.firstName),
            React.createElement("h2", { className: "text-4xl font-bold text-slate-900 mt-6" }, "Make a bet"),
            React.createElement(Card_1["default"], { name: 'Weather', path: '/weatherIcon.svg', onClick: function () { return router.push('/dashboard/bet/weather'); } }),
            React.createElement(Card_1["default"], { name: 'Manual', path: '/manualIcon.svg', onClick: function () { return router.push('/dashboard/bet/manual'); } }),
            React.createElement("h2", { className: "text-4xl font-bold text-slate-900 mt-6" }, "Pending bets"),
            React.createElement("div", { className: 'flex' }, bets.pending.map(function (b) { return (React.createElement(Card_1["default"], { key: b.betID, name: b.betID, borderColor: b.status === "Pending - Ready" ? selectedClimateAnswerClass : '' },
                React.createElement(React.Fragment, null,
                    React.createElement(image_1["default"], { className: "w-5 h-5 mb-2 text-slate-900", src: b.type == "weather" ? "/weatherIcon.svg" : "/manualIcon.svg", alt: "", width: 40, height: 40 }),
                    React.createElement("h5", { className: "mb-2 text-sm font-semibold tracking-tight text-slate-900" },
                        "id: ",
                        b.betID),
                    React.createElement("h5", { className: "mb-2 text-sm font-semibold tracking-tight text-slate-900" }, "for:" + formatDate(b.when).trim()),
                    React.createElement("button", { type: "button", className: "mt-2 text-slate-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-1 border-gray-600 disabled:bg-slate-300", onClick: function () { return handleOpenDetailsModal(b, "pending"); } }, "Details")))); })),
            React.createElement("h2", { className: "text-4xl font-bold text-slate-900 mt-6" }, "Awaiting bets"),
            bets.awaiting.map(function (b) { return (React.createElement(Card_1["default"], { key: b.betID, name: b.betID },
                React.createElement(React.Fragment, null,
                    React.createElement(image_1["default"], { className: "w-5 h-5 mb-2 text-slate-900", src: b.type == "weather" ? "/weatherIcon.svg" : "/manualIcon.svg", alt: "", width: 40, height: 40 }),
                    React.createElement("h5", { className: "mb-2 text-1xl font-semibold tracking-tight text-slate-900" },
                        "Id: ",
                        b.betID),
                    React.createElement("h5", { className: "mb-2 text-sm font-semibold tracking-tight text-slate-900" }, "for:" + formatDate(b.when).trim()),
                    React.createElement("button", { type: "button", className: "mt-2 text-white bg-slate-900 border border-gray-300 font-medium rounded-lg text-sm px-5 py-1 border-gray-600 disabled:bg-slate-300", onClick: function () { return handleOpenDetailsModal(b, "awaiting"); } }, "Answer")))); }),
            openDetailsModal && React.createElement("div", { className: "fixed top-0 left-0 right-0 w-full h-full z-50 " },
                React.createElement("div", { className: "relative w-full h-full bg-black/[0.2]" },
                    React.createElement("div", { className: "relative p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 w-1/4 m-auto top-40" },
                        React.createElement("div", { className: "flex" },
                            React.createElement("button", { type: "button", className: "text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center", "data-modal-hide": "defaultModal", onClick: handleCloseOpenDetailsModal },
                                React.createElement("svg", { "aria-hidden": "true", className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                                    React.createElement("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" })))),
                        betKeys.map(function (k) {
                            return React.createElement("div", { key: k.key }, selectedBet[k.key] && selectedBet[k.key] !== "" && React.createElement(React.Fragment, null,
                                React.createElement("label", { className: "block text-sm font-semibold leading-6 text-gray-900 mt-2" }, k.name),
                                React.createElement("div", { key: selectedBet[k.key], className: "flex-auto  border rounded-md  border-slate-300 px-1" }, k.key === "when" ? formatDate(selectedBet[k.key]).trim() : selectedBet[k.key])));
                        }),
                        currentBetModalState === "awaiting" &&
                            React.createElement("div", { className: 'my-2' },
                                React.createElement("label", { className: "block text-sm font-semibold leading-6 text-gray-900 mt-2" }, "Climate answer"),
                                constants_1.weatherTypes.map(function (t) { return (React.createElement("div", { key: t.name, className: "w-fit p-4 bg-white border  rounded-lg shadow  inline-block my-2 mr-4 cursor-pointer " + (t.name === climateAnswer ? selectedClimateAnswerClass : 'border-slate-900'), onClick: function () { return setClimateAnswer(t.name); } }, t.name + " " + t.emoji)); }),
                                React.createElement("div", { className: 'flex justify-around' },
                                    React.createElement("button", { type: "button", className: "mt-2 text-white bg-slate-900 border border-gray-300 font-medium rounded-lg text-sm px-5 py-1 border-gray-600 disabled:bg-slate-300", disabled: climateAnswer === null, onClick: handleAcceptBet }, "Accept"),
                                    React.createElement("button", { type: "button", className: "mt-2 text-slate-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-1 border-gray-600 disabled:bg-slate-300", onClick: handleRejectBet }, "Reject")))))))));
}
function getServerSideProps(context) {
    return __awaiter(this, void 0, void 0, function () {
        var authCheckResponse, data, bets;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, auth_1.authCheck(context.req)];
                case 1:
                    authCheckResponse = _a.sent();
                    if (!authCheckResponse.result) return [3 /*break*/, 4];
                    return [4 /*yield*/, user_1.getUserData(context.req)];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, user_1.getBets(context.req)];
                case 3:
                    bets = _a.sent();
                    return [3 /*break*/, 5];
                case 4: return [2 /*return*/, {
                        redirect: {
                            permanent: false,
                            destination: "/login"
                        }
                    }];
                case 5: 
                // Pass data to the page via props
                return [2 /*return*/, { props: { data: data, bets: bets } }];
            }
        });
    });
}
exports.getServerSideProps = getServerSideProps;
exports["default"] = Dashboard;
