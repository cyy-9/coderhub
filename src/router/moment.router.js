const Router = require('koa-router')
const {
    verifyAuth, // 导入鉴权中间件
    verifyPermission,
} = require('../middleware/auth.middleware')
const {
    create,
    detail,
    list,
    update,
    remove,
    addLabels,
    fileInfo,
} = require('../controller/moment.controller')
const {
    verifyLabelExists,
} = require('../middleware/label.middleware')

const momentRouter = new Router({prefix: '/moment'});

momentRouter.post('/', verifyAuth, create);     // 发布动态接口
momentRouter.get('/:momentId', verifyAuth, detail);     // 获取动态详情
momentRouter.get('/', list);         // 查询动态列表
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)  // 修改动态接口
momentRouter.delete('/:momentId',verifyAuth, verifyPermission, remove) // 删除动态接口

// 给动态添加标签接口
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)

// 获取动态配图接口
momentRouter.get('/images/:filename', fileInfo)

module.exports = momentRouter;