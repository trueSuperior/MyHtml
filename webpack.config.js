const dev = 'development';
const pro = 'production';

const MODE = dev;
const enabledSourceMap = (MODE === dev);

module.exports = {
    entry: './src/js/index.js',
    mode: MODE,
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
        contentBase: 'src',
        open: true
    }
};
