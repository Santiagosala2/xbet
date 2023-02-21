const apiEndpoint = "https://countriesnow.space/api/v0.1/countries/cities";

const search = <T>(data: T, callback: (res: any) => void) => {
    return fetch(`${apiEndpoint}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).
        then(res => res.json()).
        then((res) => {
            callback(res);
        })
}


const services = {
    search,

}

const location = {
    services
}

export default location;
