
const apiEndpoint = "https://localhost:7234";

const commonHeaders = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: "include",

}

const login = <T>(data: T, callback: (res: any) => void) => {
    return fetch(`${apiEndpoint}/api/login`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(data),
        }).
        then(res => res.json()).
        then((res) => {
            callback(res);
        })
}

const register = <T>(data: T, callback: (res: any) => void) => {
    return fetch(`${apiEndpoint}/api/register`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).
        then(res => res.json()).
        then((res) => {
            callback(res);
        })
}

const logout = (callback: () => void) => {
    return fetch(`/api/logout`,
        {
            method: "POST"          
        }).
        then(res => res.json()).
        then((res) => {
            console.log(res)
            callback();
        })
}

const deposit = <T>(data: T, callback: (res: any) => void) => {
    return fetch(`${apiEndpoint}/api/user/deposit`,
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(data),
    }).
    then(res => res.json()).
    then((res) => {
        callback(res);
    })
}

const searchUsers = (value: string, callback:(res: any) => void) => {
    return fetch(`${apiEndpoint}/api/search/user?value=${value}`,
    {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include"
    }).
    then(res => res.json()).
    then((res) => {
        callback(res);
    })
}

const addFriend = <T>(data: T, callback:(res: any) => void) => {
    return fetch(`${apiEndpoint}/api/user/addFriend`,
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(data)
    }).
    then((res) => {
        callback(res);
    })
}

const acceptRequest = <T>(data: T, callback:(res: any) => void) => {
    return fetch(`${apiEndpoint}/api/user/acceptRequest`,
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(data)
    }).
    then((res) => {
        callback(res);
    })
}

const rejectRequest = <T>(data: T, callback:(res: any) => void) => {
    return fetch(`${apiEndpoint}/api/user/rejectRequest`,
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(data)
    }).
    then((res) => {
        callback(res);
    })
}



const services = {
    login,
    register,
    logout,
    deposit,
    searchUsers,
    addFriend,
    acceptRequest,
    rejectRequest
}

const user = {
    services
}

export default user;
