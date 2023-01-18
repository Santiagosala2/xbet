import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import https from 'https'


export async function getUserData(req:any) {
    let response = await axios.get('https://localhost:7234/api/user', {
        headers:{
            ...req.headers
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    })
    console.log(response.data)
    return response.data

}


export async function getFriends(req:any) {
    let response = await axios.get('https://localhost:7234/api/user/friends', {
        headers:{
            ...req.headers
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    })
    return response.data
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>) {

    
    const jsonData = await getUserData(req)
    res.status(200).json(jsonData)
}