const service = require('../services/file.service')

class FileController {
    async saveAvatarInfo(ctx, next) {
        // 获取头像的信息
        const {mimetype, size, filename} = ctx.req.file
        const {id} = ctx.user;  // 当前登录用户的id

        // 将图片信息保存到数据库中
        const result = await service.createAvatar(filename, size, mimetype, id);
        ctx.body = result;

    }
    async savePictureInfo(ctx, next) {
        // 获取图片信息
        const files = ctx.req.files
        // 获取user_id
        const {id} = ctx.user;
        // 获取momentId
        const {momentId} = ctx.query;
        console.log(files)
        // 将所有图片信息保存在数据库中
        for(let file of files) {
            const {mimetype, size, filename} = file;
            // console.log(111);
            await service.createFile(filename, size, mimetype, id, momentId);
        }
        ctx.body = '图片上传成功~';
    }
}

module.exports = new FileController();