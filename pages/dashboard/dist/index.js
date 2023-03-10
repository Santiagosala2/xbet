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
function Dashboard(_a) {
    var data = _a.data;
    var router = router_1.useRouter();
    var _b = react_1.useState(data.balance), initialBalance = _b[0], setInitialBalance = _b[1];
    return (React.createElement(Layout_1["default"], { userBalance: initialBalance },
        React.createElement("div", { className: 'm-7' },
            React.createElement("h5", { className: 'text-2xl text-slate-900 my-2' },
                "Welcome! ",
                data.firstName),
            React.createElement("h2", { className: "text-4xl font-bold text-slate-900 mt-14" }, "Make a bet"),
            React.createElement(Card_1["default"], { name: 'Weather', path: '/weatherIcon.svg', onClick: function () { return router.push('/dashboard/bet/weather'); } }),
            React.createElement(Card_1["default"], { name: 'Manual', path: '/manualIcon.svg', onClick: function () { return router.push('/dashboard/bet/manual'); } }),
            React.createElement("h2", { className: "text-4xl font-bold text-slate-900 mt-14" }, "Pending bets"))));
}
function getServerSideProps(context) {
    return __awaiter(this, void 0, void 0, function () {
        var authCheckResponse, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, auth_1.authCheck(context.req)];
                case 1:
                    authCheckResponse = _a.sent();
                    if (!authCheckResponse.result) return [3 /*break*/, 3];
                    return [4 /*yield*/, user_1.getUserData(context.req)];
                case 2:
                    data = _a.sent();
                    return [3 /*break*/, 4];
                case 3: return [2 /*return*/, {
                        redirect: {
                            permanent: false,
                            destination: "/login"
                        }
                    }];
                case 4: 
                // Pass data to the page via props
                return [2 /*return*/, { props: { data: data } }];
            }
        });
    });
}
exports.getServerSideProps = getServerSideProps;
exports["default"] = Dashboard;
