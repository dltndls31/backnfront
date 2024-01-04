import { loginService } from '@/services/login'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'
import { JwtPayload, verify } from 'jsonwebtoken'

export const loginController = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    const { authorization } = req.headers

    if (authorization === undefined) {
        return res.status(400).json({
            error: {
                message: '토큰이 들어오지 않았습니다.',
            },
        })
    }

    let payload
    try {
        payload = (await verify(
            authorization.replace('Bearer ', ''),
            'qwer'
        )) as JwtPayload
    } catch (error) {
        return res.status(400).json({
            error: {
                message: '비정상적인 토큰입니다.',
            },
        })
    }
    await loginService(req, res, connection, payload)
}
