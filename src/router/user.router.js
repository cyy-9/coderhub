const Router = require('koa-router')

const {
    create,
    avatar,
} = require('../controller/user.controller')
const {
    verifyUser,
    handlePassword,
} = require('../middleware/user.middleware')

const userRouter = new Router({prefix: '/users'})

// 用户注册接口，verifyUser中间件用于校验，handlePassword中间件用于密码加密
userRouter.post('/', verifyUser, handlePassword, create) 

userRouter.get('/:userId/avatar', avatar)  // 获取用户头像接口

module.exports = userRouter;