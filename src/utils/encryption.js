// 加密注册的密码
const crypto = require('crypto');

const md5password = (password) => {
    const md5 = crypto.createHash('md5');   // 返回一个md5对象，用这个对象对密码加密
    const result = md5.update(password).digest('hex');      // 加密并转为16进制字符串
    return result;
}  

module.exports = md5password;