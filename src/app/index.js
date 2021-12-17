const Koa = require('koa')      // 将创建app的代码单独放一个文件
const bodyparser = require('koa-bodyparser')
const userRouter = require('../router/user.router')
const authRouter = require('../router/auth.router')
const errorhandler = require('./error_handle')
const useRoutes = require('../router/index')

const app = new Koa();

app.use(bodyparser())

// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());
// app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());
useRoutes(app);

app.on('error', errorhandler)   // 处理所有错误信息

module.exports = app;