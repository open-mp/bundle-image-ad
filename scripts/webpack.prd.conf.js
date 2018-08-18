const getEntry = require("./entry.js");
const getModule = require("./webpack.module.js");
const getPlugin = require("./webpack.plugin.js");
const getResolve = require("./webpack.resolve.js");
const getExternals = require("./webpack.externals.js");

module.exports = function (config) {
    return {
        mode: "production",
        entry: getEntry(config),
        output: {
            path: config.assetsRoot,
            libraryTarget: 'amd',
            filename: '[name].js'
        },
        module: getModule(config),
        externals: getExternals(config),
        resolve: getResolve(config),
        plugins: getPlugin(config)
    };
};
