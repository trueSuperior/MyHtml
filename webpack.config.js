const dev = 'development';
const pro = 'production';
const path = require('path');
// const webpack = require('webpack');

const MODE = dev;
const enabledSourceMap = (MODE === dev);

module.exports = {
    mode: MODE,
    entry: './app/src/ts/index.ts',
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: './[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
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
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    // ローカル開発用環境を立ち上げる
    devServer: {
        inline: true,
        watchContentBase: true,
        contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'src')],
        open: true
    }
};
