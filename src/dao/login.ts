import type { Connection } from 'mysql2/promise'

export const getUser = async (email: string, connection: Connection) => {
    const [rows] = await connection.query(
        `SELECT * FROM test_user WHERE email="${email}"`
    )

    return rows
}
