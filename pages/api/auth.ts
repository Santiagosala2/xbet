// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import https from 'https'

type Data = {
  result: boolean
}


export async function authCheck(req:any) {
  if (req.headers.cookie) {
    let response = await axios.post('https://localhost:7234/api/verify',undefined,{
      headers: {
        cookie: req.headers.cookie
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })
    if (response.data === true) {
       return {result:true}; 
    }    
  }
  return {result:false}

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const authCheckResponse = await authCheck(req);
  return res.status(authCheckResponse.result ? 200 : 401).json(authCheckResponse);
}
