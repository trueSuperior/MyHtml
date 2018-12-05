const dev = 'development';
const pro = 'production';
const path = require('path');
// const webpack = require('webpack');

const MODE = dev;
const enabledSourceMap = (MODE === dev);

module.exports = {
    mode: MODE,
    entry: './app/src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'public/'),
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
    devServer: {
        inline: true,
        watchContentBase: true,
        contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'src')],
        open: true
    }
};
