const dotenv = require('dotenv')
const fs = require('fs')

dotenv.config();

const PRIVATE_KEY = fs.readFileSync('src/app/key/private.key')
const PUBLIC_KEY = fs.readFileSync('src/app/key/public.key')

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
} = process.env     // 在process.env中取出APP_PORT，并将其导出

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;