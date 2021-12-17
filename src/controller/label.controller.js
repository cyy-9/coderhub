const service = require('../services/label.service');

class LabelController {
    async create(ctx, next) {
        const {name} = ctx.request.body;
        const result = await service.createLabel(name)
        ctx.body = result;
    }
    async list(ctx, next) {
        const result = await service.getLabels();
        ctx.body = result;
    }
}

module.exports = new LabelController();