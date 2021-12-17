const userService = require('../services/user.service')
const fileService = require('../services/file.service')
const fs = require('fs');

class UserContrlller {
    async create(ctx, next) {
        // 获取用户传递的参数
        const user = ctx.request.body;      // 经过bodyparser解析后的传参
        // 在数据库中查询数据
        const result = await userService.create(user);  // 因为是异步函数，result拿到的是service中函数返回结果

        // 返回数据
        ctx.body = result;
    }
    async avatar(ctx, next) {
        // 查找对应的头像信息
        const {userId} = ctx.params;
        const avatarInfo = await fileService.getAvatarByUserId(userId);

        // 将头像返回给前端
        ctx.response.set('content-type', avatarInfo.mimetype)
        ctx.body = fs.createReadStream(`./uploads/avatar/${avatarInfo.filename}`)
    }
}

module.exports = new UserContrlller();