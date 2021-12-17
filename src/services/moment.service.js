const connection = require('../app/database')

class MomentService {
    async create(userid, content) {     // 插入动态到数据库
        const statment = `insert into moment (content, user_id) values (?, ?);`
        const [result] = await connection.execute(statment, [content, userid]);
        return result;
    }
    async getMomentById(momentId) {
        const statment = `select 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        json_object('id', u.id, 'name', u.name) user,
        json_arrayagg(
            json_object('id', l.id, 'name', l.name)
        ) labels,
        (select json_arrayagg(concat('http://localhost:8000/moment/images/', file.filename))
            from file where m.id = file.moment_id) images
        from moment m
        left join users u on m.user_id = u.id
        left join moment_label ml on m.id = ml.moment_id
        left join label l on ml.label_id = l.id
        where m.id = ?;`;
        const [result] = await connection.execute(statment, [momentId]);
        return result[0];
    }
    async getMomentList(offset, size) {
        const statment = `select 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        json_object('id', u.id, 'name', u.name) user,
        (select count(*) from comment where comment.moment_id = m.id) commentCount,
        (select count(*) from moment_label ml where ml.moment_id = m.id) labelCount
        from moment m
        left join users u on m.user_id = u.id
        limit ?, ?;`
        const [result] = await connection.execute(statment, [offset, size]);
        return result;
    }
    async update(content, momentId) {
        const statement = `update moment set content = ? where id = ?`;
        const [result] = await connection.execute(statement, [content, momentId]);
        return result;
    }
    async remove(momentId) {
        const statement = `delete from moment where id = ?`;
        const [result] = await connection.execute(statement, [momentId]);
        console.log(result)
        // return result;
    }
    async hasLabel(momentId, labelId) {
        const statement = `select * from moment_label where moment_id = ? and label_id = ?;`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result[0] ? true : false;
    }
    async addLabel(momentId, labelId) {
        const statement = `insert into moment_label (moment_id, label_id) values (?, ?);`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result;
    }
}

module.exports = new MomentService();