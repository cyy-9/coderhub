const service = require('../services/label.service')

const verifyLabelExists = async (ctx, next) => {
    // 在这里判断前端传参的标签是否存在于label表中，存在就不能重复添加
    const {labels} = ctx.request.body;
    
    const newLabels = [];   // 这个数组用于保存所有标签，用于后续添加到关系表
    // 判断每一个标签在laber表中是否存在
    for(let name of labels) {
        const labelResult = await service.getLabelByName(name);
        const label = {name};
        if(!labelResult) { // 如果前端传参标签不存在，添加这个标签
            // 在label中创建数据
            const result = await service.createLabel(name);
            label.id = result.insertId;
        } else {    // 如果查询结果不为空，说明有这个标签就不用新建，直接获取id
            label.id = labelResult.id;
        }
        newLabels.push(label);
    }
    // console.log(newLabels)
    ctx.labels = newLabels;
    await next();
}

module.exports = {
    verifyLabelExists,
}