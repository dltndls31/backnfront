import type { Connection } from 'mysql2/promise'

interface IPost {
    idx: number
    userIdx: number
    title: string
    content: string
    connection: Connection
}

export const createPost = async ({
    userIdx,
    title,
    content,
    connection,
}: IPost) => {
    const [rows, fields] = await connection.query(
        `INSERT INTO post (userIdx, title, content) VALUES (${userIdx}, "${title}", "${content}")`
    )
    return rows
}

export const searchPost = async ({ idx, connection }: IPost) => {
    const [rows, fields] = await connection.query(
        `SELECT * FROM post WHERE idx=${idx}`
    )
    return rows
}

export const searchAllPost = async ({
    idx,
    userIdx,
    title,
    content,
    connection,
}: IPost) => {
    const [rows, fields] = await connection.query(`SELECT * FROM post`)
    return rows
}

export const editPost = async ({ idx, title, content, connection }: IPost) => {
    const [rows, fields] = await connection.query(
        `UPDATE post SET title="${title}", content="${content}" WHERE idx=${idx}`
    )
    return rows
}

export const deletePost = async ({ idx, connection }: IPost) => {
    const [rows, fields] = await connection.query(
        `DELETE FROM post WHERE idx=${idx}`
    )
    return rows
}
