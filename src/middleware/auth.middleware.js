const jwt = require('jsonwebtoken')
const {
    NAME_OR_PASSWORD_IS_REQUIRED,
    USER_DOES_NOT_EXSITS,
    PASSWORD_IS_INCORRENT,
    UNAUTHORIZATION,
    UNPERMISSION,
} = require('../constants/error_types')     // 导入错误信息
const userService = require('../services/user.service')
const authService = require('../services/auth.service')
const md5Password = require('../utils/encryption')
const {PUBLIC_KEY} = require('../app/config')

const verifyLogin = async (ctx, next) => {
    // 获取用户名 密码
    const {name, password} = ctx.request.body

    // 判断用户名密码是否为空
    if(!name || !password || name === '' || password === '') {
        const err = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', err, ctx);
    }
    // 判断用户是否存在
    const result = await userService.getUserByName(name);   // 得到的result是个数组，查询重复用户的结果
    const user = result[0];
    if(!user) {     // 如果用户不存在
        const err = new Error(USER_DOES_NOT_EXSITS);
        return ctx.app.emit('error', err, ctx);
    }
    // 判断密码是否正确(加密)
    if(md5Password(password) !== user.password) {
        const err = new Error(PASSWORD_IS_INCORRENT);
        return ctx.app.emit('error', err, ctx);
    }
    ctx.user = user;    // 后续login中间件中会使用用户输入的user

    await next();
}

const verifyAuth = async (ctx, next) => {   // 验证是否带有token
    try {
        // 在这里编写用户权限验证相关
        // 获取token
        const authorization = ctx.headers.authorization;
        // console.log(authorization)
        if(!authorization) {    // 判断是否有这个字段，如果没有说明没有token
            throw new Error(UNAUTHORIZATION);
        }
        const token = authorization.replace('Bearer ', '');
        // console.log(authorization)

        // 验证token
    
        const result = jwt.verify(token, PUBLIC_KEY, {  // 验证失败说明token不正确，会自动抛出错误
            algorithms: ['RS256']
        })
        ctx.user = result;  // token不正确保存错误信息；token正确保存登录用户信息
        // token验证成功调用下一个中间件
        await next();
    } catch (err) {
        const error = new Error(UNAUTHORIZATION);
        ctx.app.emit('error', error, ctx);
    }
    
}

const verifyPermission = async (ctx, next) => {    // 验证是否能修改动态
    // 获取参数
    const {id} = ctx.user;  // 上面鉴权中间件中保存的user属性，拿到用户id
    const [resourceKey] = Object.keys(ctx.params)   // 将此中间件封装成通用的中间件，根据传参提取表名
    const tableName = resourceKey.replace('Id', '');
    const resourceId = ctx.params[resourceKey]

    // 查询是否具备权限，将动态的user_id和id做对比
    const isPermission = await authService.checkResource(tableName, resourceId, id);
    console.log(isPermission)
    if(!isPermission) {
        const error = new Error(UNPERMISSION);
        ctx.app.emit('error', error, ctx);
    } else {
        await next();
    }
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission,
}