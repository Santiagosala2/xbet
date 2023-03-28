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
var apiEndpoint = "https://localhost:7234";
var addHeaders = function (method, credentials, body) {
    var object = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (credentials) {
        object = __assign(__assign({}, object), { credentials: "include" });
    }
    if (body !== null) {
        object = __assign(__assign({}, object), { body: JSON.stringify(body) });
    }
    return object;
};
var resolver = function (prom, callback) {
    return prom.then(function (res) { return res.text(); })
        .then(function (res) { return res !== "{}" && res !== "" ? JSON.parse(res) : null; })
        .then(function (res) { return callback(res); });
};
var login = function (data, callback) { return resolver(fetch(apiEndpoint + "/api/login", addHeaders("POST", true, data)), callback); };
var register = function (data, callback) { return resolver(fetch(apiEndpoint + "/api/register", addHeaders("POST", false, data)), callback); };
var logout = function (callback) { return resolver(fetch("/api/logout", addHeaders("POST", false)), callback); };
var deposit = function (data, callback) { return resolver(fetch(apiEndpoint + "/api/user/deposit", addHeaders("POST", true, data)), callback); };
var searchUsers = function (value, callback) { return resolver(fetch(apiEndpoint + "/api/search/user?value=" + value, addHeaders("GET", true)), callback); };
var addFriend = function (data, callback) { return resolver(fetch(apiEndpoint + "/api/user/addFriend", addHeaders("POST", true, data)), callback); };
var acceptRequest = function (data, callback) { return resolver(fetch(apiEndpoint + "/api/user/acceptRequest", addHeaders("POST", true, data)), callback); };
var rejectRequest = function (data, callback) { return resolver(fetch(apiEndpoint + "/api/user/rejectRequest", addHeaders("POST", true, data)), callback); };
var createBet = function (data, callback) { return resolver(fetch(apiEndpoint + "/api/user/bets", addHeaders("POST", true, data)), callback); };
var services = {
    login: login,
    register: register,
    logout: logout,
    deposit: deposit,
    searchUsers: searchUsers,
    addFriend: addFriend,
    acceptRequest: acceptRequest,
    rejectRequest: rejectRequest,
    createBet: createBet
};
var user = {
    services: services
};
exports["default"] = user;
