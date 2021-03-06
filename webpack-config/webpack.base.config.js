const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, "../src"),
    dist: path.join(__dirname, "../dist"),
    assets: "assets/"
};

const PAGES_DIR = `${PATHS.src}/pages/`
// const PAGES_Folders = fs.readdirSync(PAGES_DIR);
// const PAGES = [];
// PAGES_Folders.forEach((folder) => {
//     PAGES.push({
//         folder: folder,
//         file: fs.readdirSync(`${PATHS.src}/pages/${folder}`).find(fileName => fileName.endsWith('.pug'))
//     });
// })

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: `${PATHS.src}/js`
    },
    output: {
        filename: `[name].[hash].js`,
        path: PATHS.dist,
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendors",
                    test: /node_modules/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                // JavaScript
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/"
            },
            {
                // Fonts
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            },
            {
                // images / icons
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            },
            {
                // scss
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: { path: `./postcss.config.js` }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                // css
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: { path: `./postcss.config.js` }
                        }
                    }
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `[name].[hash].css`
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/${PATHS.assets}images`, to: `${PATHS.assets}images` },
            { from: `${PATHS.src}/static`, to: "" }
        ]),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.pug`,
            filename: './index.html',
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/main/main.pug`,
            filename: './main.html',
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/ui-kit/colors-and-types/colors-types.pug`,
            filename: './colors-types.html',
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/ui-kit/headers-and-footers/headers-footers.pug`,
            filename: './headers-footers.html',
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/ui-kit/cards/cards.pug`,
            filename: './cards.html',
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/ui-kit/form-elements/form-elements.pug`,
            filename: './form-elements.html',
        }),
        // ...PAGES.map(page => new HtmlWebpackPlugin({
        //     template: `${PAGES_DIR}/${page.folder}/${page.file}`,
        //     filename: `./${page.file.replace(/\.pug/,'.html')}`
        // }))
    ]
};
