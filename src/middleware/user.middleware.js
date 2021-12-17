const {
    NAME_OR_PASSWORD_IS_REQUIRED,
    USER_ALREADY_EXISTS,
} = require('../constants/error_types')
const service = require('../services/user.service')
const md5password = require('../utils/encryption')

const verifyUser = async (ctx, next) => {
    // 此处进行用户验证判断
    // 1.获取用户名和密码
    const {name, password} = ctx.request.body;

    // 2.判断用户名或密码不能为空
    if(!name || !password || name === '' || password === '') {
        const err = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', err, ctx);
    }

    // 3.判断用户是否已存在
    const result = await service.getUserByName(name);   // 得到的result是个数组，查询重复用户的结果
    if(result.length > 0) {
        const err = new Error(USER_ALREADY_EXISTS);
        return ctx.app.emit('error', err, ctx);
    }
    await next();
}   

const handlePassword = async (ctx, next) => {
    const {password} = ctx.request.body;
    ctx.request.body.password = md5password(password);
    await next();
}

module.exports = {
    verifyUser,
    handlePassword,
}