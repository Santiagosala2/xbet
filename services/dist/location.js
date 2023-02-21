"use strict";
exports.__esModule = true;
var apiEndpoint = "https://countriesnow.space/api/v0.1/countries/cities";
var search = function (data, callback) {
    return fetch("" + apiEndpoint, {
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
var services = {
    search: search
};
var location = {
    services: services
};
exports["default"] = location;
