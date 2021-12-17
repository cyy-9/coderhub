const connection = require('../app/database')

class LabelService {
    async createLabel(name) {
        // console.log(name)
        const statement = `insert into label (name) values (?);`
        const [result] = await connection.execute(statement, [name])
        return result;
    }
    async getLabelByName(name) {
        const statement = `select * from label where name = ?;`;
        const [result] = await connection.execute(statement, [name])
        return result[0];    // 返回查到的结果
    }
    async getLabels() {
        const statement = `select * from label;`
        const [result] = await connection.execute(statement);
        return result;
    }
}

module.exports = new LabelService();