const rimraf = require('rimraf');
const Config = require('../config');
const WebpackDev = require('./webpack.dev.conf');
const WebpackPrd = require('./webpack.prd.conf');
const webpack = require("webpack");
let env = process.argv[2];
// 获得配置
let config = Config("production");
// 清空打包目标路径
rimraf.sync(config.assetsRoot);
// 打包dll

let pageWebPackConfig = null;
if (config.isProduction) {
    pageWebPackConfig = WebpackPrd(config);
} else {
    pageWebPackConfig = WebpackDev(config);
}
// 打包业务代码
webpack(pageWebPackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
        // 错误处理
       // console.log(err, stats.errors)
    }

});
