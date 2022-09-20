import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
})

export const PORT = process.env.PORT || 3000
export const DATABASE_URL =
    process.env.DATABASE_URL || 'postgres://root:root@localhost/test_database'
export const ACCESS_SECRET = process.env.ACCESS_SECRET || 'mysuperscret'
export const ACCESS_EXPIRE = process.env.ACCESS_EXPIRE || '1200'
