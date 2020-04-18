const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        app: './index.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: './postcss.config.js' } }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: './postcss.config.js' } }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })
    ],
}