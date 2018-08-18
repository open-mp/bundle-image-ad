const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(config){
  return {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        // style-loader creates style nodes from JS strings (在html中插入style标签注入样式)
        // css-loader translates CSS into CommonJS (css文本转成js模块)
        // sass-loader compiles Sass to CSS
        use: [ MiniCssExtractPlugin.loader, "css-loader","sass-loader" ]
      },
      {
        test: /\.p?css$/,
        use: [ MiniCssExtractPlugin.loader, "css-loader", "postcss-loader" ]
      }
    ]
  }
}