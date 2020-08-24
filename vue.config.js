const path = require("path");
const resolve = (dir) => path.join(__dirname, dir); //将文件组成绝对路径

module.exports = {
    pages:{
        login: {
            entry: 'src/login/main.ts',
            template: 'public/login.html'
        },
        index: {
            entry: 'src/main.ts',
            template: 'public/index.html',
        }
    },

    lintOnSave: false,

    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
          .set('@libs', resolve('src/lib'))
          .set('@login', resolve('src/login'))
    }
}