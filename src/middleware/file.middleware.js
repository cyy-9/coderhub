const Multer = require('koa-multer')
const Jimp = require('jimp')
const path = require('path')

const avatarUpload = Multer({
    dest: './uploads/avatar',   // 头像会存储到这个文件夹
})
const avatarHandle = avatarUpload.single('avatar');     // 根据前端传参的字段，最后生成头像保存的中间件
const pictureUpload = Multer({
    dest: './uploads/picture',   // 图片会存储到这个文件夹
})
const pictureHandle = pictureUpload.array('picture', 9);     // 根据前端传参的字段，最后生成图片保存的中间件，9是最大上传数量

const pictureResize = async (ctx, next) => {
    // 拿到所有图片信息
    const files = ctx.req.files;

    // 对图片进行处理
    for(let file of files) {
        const destPath = path.join(file.destination, file.filename);
        Jimp.read(file.path).then(image => {
            image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)  // 根据宽度自适应高度
            image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)  
            image.resize(320, Jimp.AUTO).write(`${destPath}-small`)  
        })
    }
    await next();
}

module.exports = {
    avatarHandle,
    pictureHandle,
    pictureResize,
}