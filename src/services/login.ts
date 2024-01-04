import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'
import { getUser } from '@/dao/login'
import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { SECRET_KEY } from '@/constants/index'

export const loginService = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    const result = await getUser(req.body.email, connection)

    if (Array.isArray(result) && result.length === 0) {
        res.status(400).json({
            error: {
                message: '해당하는 유저가 없습니다.',
            },
        })
    }

    const user = (result as any)[0]
    console.log('🚀 ~ file: login.ts:25 ~ user.password:', user.password)
    console.log(
        '🚀 ~ file: login.ts:25 ~ req.body.password:',
        req.body.password
    )
    const match = await compare(req.body.password, user.password)

    if (match === false) {
        res.status(400).json({
            error: {
                message: '비밀번호가 틀립니다.',
            },
        })
    }

    const token = jwt.sign(
        {
            idx: user.idx,
            name: user.name,
            email: user.email,
            password: user.password,
        },
        SECRET_KEY
    )

    res.status(200).json({ token: token })
}
