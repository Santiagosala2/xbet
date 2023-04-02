
const apiEndpoint = "https://localhost:7234";

const addHeaders = (method: "GET" | "POST", credentials: boolean, body?: any) => {
    let object: any = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    if (credentials) {
        object = {
            ...object,
            credentials: "include"
        }
    }

    if (body !== null) {
        object = {
            ...object,
            body: JSON.stringify(body)
        }
    }

    return object
}

const resolver = (prom: Promise<Response>, callback: (res: any) => void) =>
    prom.then(res => res.text())       
        .then(res => res !== "{}" && res !== "" ?  JSON.parse(res): null)
        .then((res) => callback(res));

const login = <T>(data: T, callback: (res: any) => void) => resolver(fetch(`${apiEndpoint}/api/login`, addHeaders("POST", true, data)), callback)

const register = <T>(data: T, callback: (res: any) => void) => resolver(fetch(`${apiEndpoint}/api/register`, addHeaders("POST", false, data)), callback)

const logout = (callback: () => void) => resolver(fetch(`/api/logout`, addHeaders("POST", false)), callback)

const deposit = <T>(data: T, callback: (res: any) => void) => resolver(fetch(`${apiEndpoint}/api/user/deposit`, addHeaders("POST", true, data)), callback)

const searchUsers = (value: string, callback: (res: any) => void) => resolver(fetch(`${apiEndpoint}/api/search/user?value=${value}`, addHeaders("GET", true)), callback)

const addFriend = <T>(data: T, callback: (res: any) => void) => resolver(fetch(`${apiEndpoint}/api/user/addFriend`, addHeaders("POST", true, data)), callback)

const acceptRequest = <T>(data: T, callback: (res: any) => void) => resolver(fetch(`${apiEndpoint}/api/user/acceptRequest`, addHeaders("POST", true, data)), callback)

const rejectRequest = <T>(data: T, callback: (res: any) => void) => resolver(fetch(`${apiEndpoint}/api/user/rejectRequest`, addHeaders("POST", true, data)), callback)

const createBet = <T>(data: T, callback: (res: any) => void) => resolver(fetch(`${apiEndpoint}/api/user/bets`, addHeaders("POST", true, data)), callback)

const acceptBet = <T>(betId: string ,data: T , callback: (res: any) => void) => resolver(fetch(`${apiEndpoint}/api/user/bet/${betId}/accept`, addHeaders("POST", true, data)), callback )

const rejectBet = <T>(betId: string , callback: (res: any) => void) => resolver(fetch(`${apiEndpoint}/api/user/bet/${betId}/reject`, addHeaders("POST", true)), callback )

const services = {
    login,
    register,
    logout,
    deposit,
    searchUsers,
    addFriend,
    acceptRequest,
    rejectRequest,
    createBet,
    acceptBet,
    rejectBet 
}

const user = {
    services
}

export default user;
