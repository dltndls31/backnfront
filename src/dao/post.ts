import type { Connection } from 'mysql2/promise'

interface INew {
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
}: INew) => {
    const [rows] = await connection.query(
        `INSERT INTO post (userIdx, title, content) VALUES (${userIdx}, "${title}", "${content}")`
    )
    return rows
}

interface IAll {
    connection: Connection
}

export const getAllPost = async ({ connection }: IAll) => {
    const [rows] = await connection.query(`SELECT * FROM post`)
    return rows
}

interface IEdit {
    idx: number
    title: string
    content: string
    connection: Connection
}

export const editPost = async ({ idx, title, content, connection }: IEdit) => {
    const [rows] = await connection.query(
        `UPDATE post SET title="${title}", content="${content}" WHERE idx=${idx}`
    )
    return rows
}

interface IIdx {
    idx: number
    connection: Connection
}

export const getPost = async ({ idx, connection }: IIdx) => {
    const [rows] = await connection.query(`SELECT * FROM post WHERE idx=${idx}`)
    return rows
}

export const deletePost = async ({ idx, connection }: IIdx) => {
    const [rows] = await connection.query(`DELETE FROM post WHERE idx=${idx}`)
    return rows
}
