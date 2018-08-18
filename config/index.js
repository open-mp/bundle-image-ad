'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

module.exports = function (env) {
    let assetsRoot = path.resolve(__dirname, '../dist');
    let isProduction = env == 'production';
    let config = {
        assetsRoot,
        isProduction
    };
    return config;
};
