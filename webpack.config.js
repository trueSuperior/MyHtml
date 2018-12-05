const dev = 'development';
const pro = 'production';
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const webpack = require('webpack');

const MODE = dev;
const enabledSourceMap = (MODE === dev);

/*
    # mxGraph用の追加設定
    ES6モジュール化に対応していないのでビルド時にExport/Importの記述を追加して、
    別モジュールから呼び出せるようにしている。

    モジュール化に依存したライブラリ以下３つ
    - imports-loader
    - exports-loader
    - copy-webpack-plugin
*/
const mxGraphConf = {
    rule: {
        test: require.resolve('mxgraph/javascript/mxClient.min.js'),
        use: [
            'imports-loader?mxBasePath=>"/libs/mxGraph/src/"',
            'imports-loader?mxLoadResources=>false',
            'exports-loader?mxClient,mxGraph,mxRubberband,mxUtils,mxEvent,mxConstants,mxEdgeStyle'
        ]
    },
    plugin: {
        // リソースを公開ディレクトリに配置する
        from: path.resolve(__dirname, './node_modules/mxgraph/javascript/src'),
        to: path.resolve(__dirname, 'public/libs/mxGraph/src'),
        ignore: ['.*','js']
    }
};

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
            mxGraphConf.rule
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            mxGraphConf.plugin
        ])
    ],

    // ローカル開発用環境を立ち上げる
    devServer: {
        inline: true,
        watchContentBase: true,
        contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'src')],
        open: true
    }
};
