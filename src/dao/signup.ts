import type { Connection } from 'mysql2/promise'

interface IGetUserByEmail {
    email: string
    connection: Connection
}

export const getUserByEmail = async ({
    email,
    connection,
}: IGetUserByEmail) => {
    const [rows] = await connection.query(
        `SELECT * FROM test_user WHERE email="${email}"`
    )
    return rows
}

interface ICreateUser {
    name: string
    email: string
    password: string
    connection: Connection
}

export const createUser = async ({
    name,
    email,
    password,
    connection,
}: ICreateUser) => {
    const [rows] = await connection.query(
        `INSERT INTO test_user (name,email,password) VALUES ("${name}", "${email}", "${password}")`
    )
    return rows
}
