
const Router = require('koa-router')
const {
    avatarHandle,
    pictureHandle,
} = require('../middleware/file.middleware')

const {
    verifyAuth,
} = require('../middleware/auth.middleware')
const {
    saveAvatarInfo,
    savePictureInfo,
} = require('../controller/file.controller')
const {
    pictureResize,
} = require('../middleware/file.middleware')
const fileRouter = new Router({prefix: '/upload'});

fileRouter.post('/avatar', verifyAuth, avatarHandle, saveAvatarInfo)    // 上传头像接口

// 上传动态配图接口
// 传参形式 /upload/picture?momentId=1
fileRouter.post('/picture', verifyAuth, pictureHandle, pictureResize, savePictureInfo)

module.exports = fileRouter;