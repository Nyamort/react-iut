const path = require('path');
const webpack = require('webpack');

const watchOptions = {
    ignored: ['node_modules/**']
}

if (process.env.WATCH_MOD == "poll") {
    watchOptions.poll = 1000
}

module.exports = {
    entry: './mount.js',
    devtool: 'source-map',
    mode: 'development',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                        }
                    },
                    {
                        loader: 'css-loader',
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'SUBJECT': JSON.stringify(process.env.SUBJECT),
        }),
        new webpack.ProvidePlugin({
            React: "react",
            react: "react",
            "window.react": "react",
            "window.React": "react"
        })
    ],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'components'),
            '@api': path.resolve(__dirname, 'api'),
            '@utils': path.resolve(__dirname, 'utils'),
            '@pages': path.resolve(__dirname, 'pages'),
            '@css': path.resolve(__dirname, 'css'),
            '@assets': path.resolve(__dirname, 'assets'),
        },
    },
    devServer: {
        port: 5000,
        host: '0.0.0.0',
        allowedHosts: 'all',
        client: {
            webSocketURL: `ws://0.0.0.0:${process.env.PROJET_PROXY_HTTP_PORT}/ws`,
        },
    },
    watch: true,
    watchOptions
}