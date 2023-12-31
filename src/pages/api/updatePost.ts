import { editPostController } from '@/controllers/post'
import { createConnection } from '@/utils/mysql'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const connection = await createConnection()

    if (req.method === 'PUT') {
        await editPostController(req, res, connection, payload)
    } else {
        res.status(400).json({
            error: {
                message: '해당 메서드는 지원하지 않습니다.',
            },
        })
    }
}
