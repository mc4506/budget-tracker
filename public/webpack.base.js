const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

const config = {
    entry: {
        index: "./index.js",
        db: "./db.js",
    },
    optimization: {
      chunkIds: "named",
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: "initial",
            minChunks: 2,
            maxInitialRequests: 5, // The default limit is too small to showcase the effect
            minSize: 0 // This is example is too small to create commons chunks
          },
          vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            priority: 10,
            enforce: true
          }
        }
      }
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
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
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
        new WorkboxPlugin.GenerateSW()
    ]

}

module.exports = config;