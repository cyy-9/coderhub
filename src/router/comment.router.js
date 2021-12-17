const Router = require('koa-router')
const {
    verifyAuth,
    verifyPermission,
} = require('../middleware/auth.middleware')
const {
    create,
    reply,
    update,
    remove,
    list,
} = require('../controller/comment.controller')

const commentRouter = new Router({prefix: '/comment'});

commentRouter.post('/', verifyAuth, create);    // 发布评论接口(回复动态)
commentRouter.post('/reply', verifyAuth, reply) // 回复评论接口(回复评论)
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update);   // 修改评论接口
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove);  // 删除评论接口

commentRouter.get('/', list);   // 获取某个动态的评论列表 传参动态id

module.exports = commentRouter