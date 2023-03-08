"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var router_1 = require("next/router");
var react_1 = require("react");
var user_1 = require("../../services/user");
var NavBar = function (_a) {
    var userBalance = _a.userBalance;
    var router = router_1.useRouter();
    var _b = react_1.useState('font-semibold'), userBalanceClassName = _b[0], setUserBalanceClassName = _b[1];
    var handleLogOut = function () {
        user_1["default"].services.logout(function () { return router.push('/login'); });
    };
    react_1.useEffect(function () {
        setUserBalanceClassName('font-semibold animate-pulse text-green-500');
        var timer = setTimeout(function () {
            setUserBalanceClassName('font-semibold');
        }, 2000);
        return function () { return clearTimeout(timer); };
    }, [userBalance]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "static top-0 left-0 right-0 bg-slate-900 text-white" },
            react_1["default"].createElement("div", { className: "flex justify-center items-center p-2" },
                react_1["default"].createElement("div", { className: "basis-4/5 font-semibold cursor-pointer", onClick: function () { return router.push('/dashboard'); } }, "BetMate"),
                react_1["default"].createElement("div", { className: "basis-1/5" },
                    react_1["default"].createElement("div", { className: 'flex justify-center items-center my-0 -mx-4' },
                        react_1["default"].createElement("div", { className: userBalanceClassName }, "$" + userBalance),
                        react_1["default"].createElement(NavBarIcons, { marginXY: 'my-0 mx-1', src: '/walletIcon.svg', name: 'Wallet', menuAttached: false, onClick: function () { return router.push('/dashboard/wallet'); } }),
                        react_1["default"].createElement(NavBarIcons, { marginXY: 'my-0 mx-1', src: '/friendsIcon.svg', name: 'Wallet', menuAttached: false, onClick: function () { return router.push('/dashboard/friends'); } }),
                        react_1["default"].createElement(NavBarIcons, { marginXY: 'my-0 mx-4', src: '/profileIcon.svg', name: 'Profile', menuAttached: true, menu: [
                                { key: "Profile" },
                                { key: "Friends", onClick: function () { return router.push('/dashboard/friends'); } },
                                { key: "Log out", onClick: handleLogOut }
                            ] })))))));
};
var NavBarIcons = function (_a) {
    var src = _a.src, name = _a.name, menuAttached = _a.menuAttached, menu = _a.menu, onClick = _a.onClick, marginXY = _a.marginXY;
    var _b = react_1.useState(true), isMenuClosed = _b[0], setIsMenuClosed = _b[1];
    var menuRef = react_1.useRef(null);
    react_1.useEffect(function () {
        // Bind the event listener
        document.addEventListener("click", handleCloseMenu, true);
        return function () {
            // Unbind the event listener on clean up
            document.removeEventListener("click", handleCloseMenu, true);
        };
    }, []);
    var handleCloseMenu = function (event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuClosed(true);
        }
    };
    var handleOpenMenu = function (click) {
        setIsMenuClosed(false);
        if (click) {
            click();
        }
        ;
    };
    return (react_1["default"].createElement("div", { className: marginXY },
        react_1["default"].createElement("button", { className: 'hover:bg-slate-700 hover:rounded-full p-2 relative', onClick: function () { return handleOpenMenu(onClick); } },
            react_1["default"].createElement(image_1["default"], { className: "inline-block h-7 w-7 ", src: src, alt: name, width: 80, height: 80 }),
            menuAttached && menu && !isMenuClosed && react_1["default"].createElement("div", { ref: menuRef, className: 'absolute left-0 right-0 mx-auto text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-20 dark:bg-gray-700 my-2' },
                react_1["default"].createElement("ul", null, menu.map(function (menuItem) { return react_1["default"].createElement("li", { key: menuItem.key, onClick: menuItem.onClick },
                    react_1["default"].createElement("a", { className: 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white' }, menuItem.key)); }))))));
};
exports["default"] = NavBar;
