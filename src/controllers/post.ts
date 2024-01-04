import {
    createPostService,
    getPostService,
    getAllPostService,
    editPostService,
    deletePostService,
} from '@/services/post'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'
import { JwtPayload, verify } from 'jsonwebtoken'

export const createPostController = async (
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
    await createPostService(req, res, connection, payload)
}

export const getPostController = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    await getPostService(req, res, connection)
}

export const getAllPostController = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    await getAllPostService(req, res, connection)
}

export const editPostController = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection,
    payload: JwtPayload
) => {
    await editPostService(req, res, connection, payload)
}

export const deletePostController = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    await deletePostService(req, res, connection)
}
