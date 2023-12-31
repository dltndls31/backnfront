import {
    createPostService,
    getPostService,
    getAllPostService,
    editPostService,
    deletePostService,
} from '@/services/post'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'

export const createPostController = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    await createPostService(req, res, connection)
}

export const getPostController = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    await getPostService(req, res, connection)
}

export const getAllPostController = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    await getAllPostService(req, res, connection)
}

export const editPostController = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    await editPostService(req, res, connection)
}

export const deletePostController = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    await deletePostService(req, res, connection)
}
