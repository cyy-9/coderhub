const Router = require('koa-router')
const {
    create,
    list,
} = require('../controller/label.controller')
const {
    verifyAuth,
} = require('../middleware/auth.middleware')

const labelRouter = new Router({prefix: '/label'})

labelRouter.post('/', verifyAuth, create);  // 创建标签的接口 传参标签的名字name
labelRouter.get('/', list); // 前端获取标签接口

module.exports = labelRouter;