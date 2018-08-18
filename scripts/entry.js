const glob = require("glob");
const path = require('path');

/**
 * 页面存放在src/pages目录中，页面入口文件为 entry.
 * @param {*} globs
 */
function getEntries(config) {
  // 返回内容 文件名 -> 文件路径
  let entries = {
    "mp-editor-plugin": "./src/mp-editor-plugin/index.js"
  };

  return entries;
}

module.exports = getEntries;

