"use strict";
exports.__esModule = true;
var apiEndpoint = "https://localhost:7234";
var commonHeaders = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: "include"
};
var login = function (data, callback) {
    return fetch(apiEndpoint + "/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(data)
    }).
        then(function (res) { return res.json(); }).
        then(function (res) {
        callback(res);
    });
};
var register = function (data, callback) {
    return fetch(apiEndpoint + "/api/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).
        then(function (res) { return res.json(); }).
        then(function (res) {
        callback(res);
    });
};
var logout = function (callback) {
    return fetch("/api/logout", {
        method: "POST"
    }).
        then(function (res) { return res.json(); }).
        then(function (res) {
        console.log(res);
        callback();
    });
};
var deposit = function (data, callback) {
    return fetch(apiEndpoint + "/api/user/deposit", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(data)
    }).
        then(function (res) { return res.json(); }).
        then(function (res) {
        callback(res);
    });
};
var searchUsers = function (value, callback) {
    return fetch(apiEndpoint + "/api/search/user?value=" + value, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    }).
        then(function (res) { return res.json(); }).
        then(function (res) {
        callback(res);
    });
};
var addFriend = function (data, callback) {
    return fetch(apiEndpoint + "/api/user/addFriend", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(data)
    }).
        then(function (res) {
        callback(res);
    });
};
var acceptRequest = function (data, callback) {
    return fetch(apiEndpoint + "/api/user/acceptRequest", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(data)
    }).
        then(function (res) {
        callback(res);
    });
};
var rejectRequest = function (data, callback) {
    return fetch(apiEndpoint + "/api/user/rejectRequest", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(data)
    }).
        then(function (res) {
        callback(res);
    });
};
var services = {
    login: login,
    register: register,
    logout: logout,
    deposit: deposit,
    searchUsers: searchUsers,
    addFriend: addFriend,
    acceptRequest: acceptRequest,
    rejectRequest: rejectRequest
};
var user = {
    services: services
};
exports["default"] = user;
