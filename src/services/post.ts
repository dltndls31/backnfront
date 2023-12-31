import {
    createPost,
    getPost,
    getAllPost,
    editPost,
    deletePost,
} from '@/dao/post'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'

export const createPostService = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    const { userIdx, title, content } = req.body

    const post = await createPost({ userIdx, title, content, connection })

    return res.status(200).json({
        status: '게시글이 성공적으로 등록되었습니다.',
    })
}

export const getPostService = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    const { idx } = req.body

    const post = await getPost({ idx, connection })

    return res.status(200).json({
        status: '게시글이 성공적으로 조회되었습니다.',
    })
}

export const getAllPostService = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    const { idx, userIdx, title, content, createdAt, updatedAt } = req.body

    const post = await getAllPost({
        idx,
        userIdx,
        title,
        content,
        createdAt,
        updatedAt,
        connection,
    })

    return res.status(200).json({
        status: '모든 게시글이 성공적으로 조회되었습니다.',
    })
}

export const editPostService = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    const { idx, title, content } = req.body

    const post = await editPost({ idx, title, content, connection })

    return res.status(200).json({
        status: '게시글이 성공적으로 수정되었습니다.',
    })
}

export const deletePostService = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    const { idx } = req.body

    const post = await deletePost({ idx, connection })

    return res.status(200).json({
        status: '게시글이 성공적으로 삭제되었습니다.',
    })
}
