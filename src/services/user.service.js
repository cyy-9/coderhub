const connection = require('../app/database')

class UserService {
    async create(user) {    // 用于创建新用户
        // 将user存储到数据库中
        // console.log(user);
        const {name, password} = user;   // 解构出账号密码
        const statement = `insert into users (name, password) values (?, ?);`;
        const result = await connection.execute(statement, [name, password])
        return result[0];
    }
    async getUserByName(name) {     // 判断用户是否存在，用于做校验
        const statement = `select * from users where name = ?;`
        const result = await connection.execute(statement, [name])

        return result[0];   // 拿到查询的表中的数据
    }
}

module.exports = new UserService();