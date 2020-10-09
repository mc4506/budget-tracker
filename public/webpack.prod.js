const path = require('path');
const baseConfig = require('./webpack.base.js');
const { merge } = require('webpack-merge');

const config = {
    mode: "production",
    output: {
        path: path.resolve(__dirname + "/dist"),
        filename:"[name].[hash].js"
    }

}

module.exports = merge(baseConfig, config);