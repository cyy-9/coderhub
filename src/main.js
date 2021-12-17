const app = require('./app/index')
// const connection = require('./app/database')
const config = require('./app/config')

app.listen(config.APP_PORT, () => {
    console.log(config.APP_PORT)
    console.log('服务器启动成功');
})