const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: "production",
    output: {
        publicPath: "https://radik-hayriyan.github.io/fsd-task-2/"
    },
    plugins: []
});

module.exports = new Promise((resolve) => {
    resolve(buildWebpackConfig);
});