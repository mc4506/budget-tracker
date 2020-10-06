const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const config = {
    mode: "production",
    entry: {
        index: "./index.js",
        db: "./db.js"
    },
    output: {
        path: __dirname + "/dist",
        filename:"[name].bundle.js"
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.html$/i,
            use: ['html-loader'] 
          }
        ],
    },
    plugins: [
        new WebpackPwaManifest({
            name: "Budget Tracker",
            short_name: "Budget Tracker",
            description: "An application that tracks your budgets online and offline",
            background_color: "#ffffff",
            theme_color: "#ffffff",
            start_url: "/",
            display: "standalone",
            icons: [ {
                src: path.resolve('icons/icon-192x192.png'),
                sizes: [72, 192, 512],
                destination: path.join('assets', 'icons')
            }]

        }),
        new HtmlWebpackPlugin({
            title: 'Budget Tracker',
            template: 'index.html'
        }),
        new CleanWebpackPlugin(),
    ]

}

module.exports = config;