const rimraf = require('rimraf');
const Config = require('../config');
const WebpackDev = require('./webpack.dev.conf');
const webpack = require("webpack");

// 获得配置
let config = Config();
// 清空打包目标路径
rimraf.sync(config.assetsRoot);
// 打包dll


let pageWebPackConfig = WebpackDev(config);
// 打包业务代码
webpack(pageWebPackConfig).watch({
    ignored: /node_modules/,
    aggregateTimeout: 500,
    poll: 1000,
    'info-verbosity': 'verbose'
}, (err, stats) => {
    if (err || stats.hasErrors()) {
        // 错误处理
    }

});
