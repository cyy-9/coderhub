const momentService = require('../services/moment.service')
const fileService = require('../services/file.service')
const fs = require('fs')

class MomentController {
    async create(ctx, next) {
        // 获取数据user_id content
        const userid = ctx.user.id;
        const content = ctx.request.body.content;
        console.log(userid, content);

        // 将数据插入到数据库
        const result = await momentService.create(userid, content);
        ctx.body = result;
    }
    async detail(ctx, next) {
        // 获取前端传参，momentId
        // console.log(ctx.params.momentId)
        const momentId = ctx.params.momentId;

        // 根据id查询数据
        const result = await momentService.getMomentById(momentId);
        ctx.body = result;
    }
    async list(ctx, next) {
        // 分页查询，获取offset size
        const {offset, size} = ctx.query;

        // 向数据库中查询数据
        const result = await momentService.getMomentList(offset, size);

        // 向前端返回数据
        ctx.body = result;
    }
    async update(ctx, next) {
        const {momentId} = ctx.params;
        const {content} = ctx.request.body;
        // console.log(momentId, content);
        const result = await momentService.update(content, momentId)
        ctx.body = '修改成功~';
    }
    async remove(ctx, next) {
        // 获取momentId
        const {momentId} = ctx.params;

        // 删除内容
        const result = await momentService.remove(momentId);
        ctx.body = '删除成功~';
    }
    async addLabels(ctx, next) {
        // 拿到参数
        const {labels} = ctx;   // 上一个中间件添加的属性
        const {momentId} = ctx.params
        console.log(labels);
        // 遍历标签数组的所有标签
        for(let label of labels) {
            // 判断标签是否和动态已经有关系
            const isExists = await momentService.hasLabel(momentId, label.id)
            if(!isExists) {     // 如果关系表中没有，则向关系表中插入数据
                await momentService.addLabel(momentId, label.id);
            }
        }
        ctx.body = '给动态添加标签成功~';
    }
    async fileInfo(ctx, next) {
        const {filename} = ctx.params;
        // console.log(filename)
        const {type} = ctx.query;
        console.log(type)
        const fileInfo = await fileService.getFileByFileName(filename);
        ctx.response.set('content-type', fileInfo.mimetype);
        ctx.body = fs.createReadStream(`./uploads/picture/${filename + '-' + type}`)
    }
}

module.exports = new MomentController();