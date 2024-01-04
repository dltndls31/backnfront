import {
    createPost,
    getPost,
    getAllPost,
    editPost,
    deletePost,
} from '@/dao/post'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'
import { JwtPayload } from 'jsonwebtoken'

export const createPostService = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection,
    payload: JwtPayload
) => {
    const { title, content } = req.body

    const post = await createPost({
        userIdx: payload.idx,
        title,
        content,
        connection,
    })

    return res.status(200).json({
        status: '게시글이 등록되었습니다.',
    })
}

export const getPostService = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    const { idx } = req.body

    const post: any = await getPost({ idx, connection })

    return res.status(200).json({
        post: post[0],
    })
}

export const getAllPostService = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    const post = await getAllPost({
        connection,
    })

    return res.status(200).json({
        post: post,
    })
}

export const editPostService = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection,
    payload: JwtPayload
) => {
    const { idx, title, content } = req.body

    const post: any = await getPost({ idx, connection })

    if (post[0].userIdx !== payload.idx) {
        res.status(400).json({
            error: {
                message: '자신의 글만 수정할 수 있습니다.',
            },
        })
    }

    await editPost({ idx, title, content, connection })

    return res.status(200).json({
        status: '게시글이 수정되었습니다.',
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
        status: '게시글이 삭제되었습니다.',
    })
}
