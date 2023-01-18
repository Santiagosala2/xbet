import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>) {
    res.setHeader("Set-Cookie", [
        cookie.serialize(".AspNetCore.BetUserManager", "false", {
          httpOnly: true,
          secure: true,
          sameSite: true,
          maxAge: 0,
          path: "/",
        })
      ]);
    res.status(200).json(true);
}

