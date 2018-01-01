const path = require("path");
const glob = require('glob');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const htmlPlugin = require("html-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const webpack = require('webpack');
const entry = require("./webpack_config/entry_webpack.js")
const modulerules = require("./webpack_config/rules_webpack.js")
const copyWebpackPlugin = require("copy-webpack-plugin");
if (process.env.type == "build") {
    var website = {
        publicPath: "http://localhost:1717/"
    }
} else {
    var website = {
        publicPath: "http://192.168.31.248:1717/"
    }
}
module.exports = {
    devtool: 'eval-source-map',
    entry: {
        entry: entry.path,
        jquery: 'jquery'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: website.publicPath
    },
    module: {
        rules: modulerules.rules
    },
    plugins: [
        new copyWebpackPlugin([{
            from: __dirname + '/src/public',
            to: './public'
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            //name对应入口文件中的名字，我们起的是jQuery
            name: 'jquery',
            //把文件打包到哪里，是一个路径
            filename: "assets/js/jquery.min.js",
            //最小打包的文件模块数，这里直接写2就好
            minChunks: 2
        }),
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        // new UglifyJsPlugin()
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: "./src/index.html"
        }),
        new extractTextPlugin("css/index.css"),
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        host: "192.168.31.248",
        compress: true,
        port: 1717
    },
    watchOptions: {
        //检测修改的时间，以毫秒为单位
        poll: 1000,
        //防止重复保存而发生重复编译错误。这里设置的500是半秒内重复保存，不进行打包操作
        aggregateTimeout: 500,
        //不监听的目录
        ignored: /node_modules/
    }
}