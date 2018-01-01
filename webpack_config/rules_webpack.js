const extractTextPlugin = require("extract-text-webpack-plugin");
const modulerules = {};
modulerules.rules = [{
        test: /\.css$/,
        use: extractTextPlugin.extract({
            fallback: "style-loader",
            use: [
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'postcss-loader'
            ]
        })
    }, {
        test: /\.(png|jpg|gif)/,
        use: [{
            loader: "url-loader",
            options: {
                limit: 500000,
                outputPath: 'images/'
            }
        }]
    },
    {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
    },
    {
        test: /\.styl$/,
        use: extractTextPlugin.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "stylus-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
        })
    },
    {
        test: /\.(jsx|js)$/,
        use: {
            loader: 'babel-loader'
        },
        exclude: /node_modules/
    }
];
module.exports = modulerules;