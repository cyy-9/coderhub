const fs = require('fs')

const useRoutes = (app) => {
    fs.readdirSync(__dirname).forEach((file) => {   // 遍历router文件夹下所有的文件
        if(file === 'index.js') return;
        const router = require(`./${file}`);
        app.use(router.routes());
        app.use(router.allowedMethods());
    })
}

module.exports = useRoutes;