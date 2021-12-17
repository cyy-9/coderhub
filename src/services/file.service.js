const connection = require('../app/database')

class FileService {
    async createAvatar(filename, size, mimetype, id) {
        const statement = `insert into avatar (filename, size, mimetype, user_id) values (?, ?, ?, ?);`
        const [result] = await connection.execute(statement, [filename, size, mimetype, id])
        return result;
    }
    async getAvatarByUserId(userId) {
        const statement = `select * from avatar where user_id = ?;`;
        const [result] = await connection.execute(statement, [userId])
        return result[0];
    }
    async createFile(filename, size, mimetype, userId, momentId) {
        const statement = `insert into file (filename, size, mimetype, user_id, moment_Id) values (?, ?, ?, ?, ?);`
        const [result] = await connection.execute(statement, [filename, size, mimetype, userId, momentId])
        return result;
    }
    async getFileByFileName(filename) {
        const statement = `select * from file where filename = ?;`
        const [result] = await connection.execute(statement, [filename])
        return result[0];
    }
}

module.exports = new FileService();