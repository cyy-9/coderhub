const connection = require('../app/database')

class AuthService {
    async checkResource(tableName, id, userId) {
        const statment = `select * from ${tableName} where id = ? and user_id = ?;`
        const [result] = await connection.execute(statment, [id, userId])
        // console.log(result)
        return result.length !== 0;
    }
}

module.exports = new AuthService();