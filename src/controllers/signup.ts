import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'
import { signupService } from '@/services/signup'

export const signupController = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    const { name, email, password } = req.body

    if (name === undefined || email === undefined || password === undefined) {
        return res.status(400).json({
            error: {
                message: `필요한 정보가 들어오지 않았습니다.
                필요 데이터 : name, email, password`,
            },
        })
    }

    if (name === '' || email === '' || password === '') {
        return res.status(400).json({
            error: {
                message: `데이터를 입력해야 합니다.
            필요 데이터 : name, email, password`,
            },
        })
    }

    await signupService(req, res, connection)
}
