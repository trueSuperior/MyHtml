const dev = 'development';
const pro = 'production';
const path = require('path');
const webpack = require('webpack');

const MODE = dev;
const enabledSourceMap = (MODE === dev);

 module.exports = {
    mode: MODE,
    entry: './app/src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'public/'),
        publicPath: path.resolve(__dirname, 'public/'),
        filename: './[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { 
                            url: false,
                            minimize: true, 
                            sourceMap: enabledSourceMap
                        }
                    },
                ],
            },
        ]
    },

    // ローカル開発用環境を立ち上げる
    // 実行時にブラウザが自動的に localhost を開く
    devServer: {
        inline: true,
        watchContentBase: true,
        contentBase: path.resolve(__dirname, 'public'),
        open: true
    }
};
