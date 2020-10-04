const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
    mode: "development",
    entry: "./index.js",
    output: {
        path: __dirname + "/dist",
        filename:"bundle.js"
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
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

        })
    ]

}

module.exports = config;