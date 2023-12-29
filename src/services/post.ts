import {
    createPost,
    searchPost,
    searchAllPost,
    editPost,
    deletePost,
} from '@/dao/post'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'

export const postService = async (
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
