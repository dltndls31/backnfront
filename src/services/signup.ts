import { createUser, getUserByEmail } from '@/dao/signup'
import { hash } from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'

export const signupService = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    const { name, email, password } = req.body
    const hashedPassword = await hash(password, 10)

    const user = await getUserByEmail({ email, connection })

    if (Array.isArray(user) && user.length >= 1) {
        return res.status(400).json({
            error: {
                message: '이미 회원가입한 유저입니다.',
            },
        })
    }

    await createUser({
        name,
        email,
        password: hashedPassword,
        connection,
    })

    return res.status(200).json({
        status: 'ok',
    })
}
