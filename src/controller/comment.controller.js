const service = require('../services/comment.service')
class CommentController {
    async create(ctx, next) {
        const {momentId, content} = ctx.request.body;
        const {id} = ctx.user;

        const result = await service.create(momentId, content, id);
        ctx.body = '发布评论成功~';
    }
    async reply(ctx, next) {
        const {momentId, content, commentId} = ctx.request.body;
        const {id} = ctx.user;
        const result = await service.reply(momentId, content, commentId, id);
        ctx.body = result;
    }
    async update(ctx, next) {
        const {content} = ctx.request.body;
        const {commentId} = ctx.params;
        const result = await service.update(content, commentId);
        ctx.body = '修改成功~';
    }
    async remove(ctx, next) {
        const {commentId} = ctx.params;
        const result = await service.remove(commentId);
        ctx.body = result;
    }
    async list(ctx, next) {
        const {momentId} = ctx.query;   // 获取url后面的传参
        const result = await service.getCommentList(momentId);
        ctx.body = result;
    }
}

module.exports = new CommentController();