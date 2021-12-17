const {
    NAME_OR_PASSWORD_IS_REQUIRED,
    USER_ALREADY_EXISTS,
    USER_DOES_NOT_EXSITS,
    PASSWORD_IS_INCORRENT,
    UNAUTHORIZATION,
    UNPERMISSION,
} = require('../constants/error_types')

const errorhandler = (err, ctx) => {    // 处理错误信息的中间件
    let status, message;
    switch(err.message) {
        case NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400;
            message = '用户名或密码为空~';
            break;
        case USER_ALREADY_EXISTS:
            status = 409;
            message = '用户已存在~';
            break;
        case USER_DOES_NOT_EXSITS:
            status = 400;
            message = '用户不存在~'
            break;
        case PASSWORD_IS_INCORRENT:
            status = 400;
            message = '密码错误~'
            break;
        case UNAUTHORIZATION:
            status = 401;
            message = '请求未授权，无效的token~'
            break;
        case UNPERMISSION:
            status = 401;
            message = '请求未授权，不具备权限~'
            break;
        default:
            status = 404;
            message = 'NOT FOUND~';
    }
    // console.log(err.message);
    ctx.status = status;
    ctx.body = message;
}

module.exports = errorhandler;