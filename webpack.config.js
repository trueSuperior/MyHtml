const dev = 'development';
const pro = 'production';
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const webpack = require('webpack');

const MODE = dev;
const enabledSourceMap = (MODE === dev);

/*
    mxGraphのnpmパッケージにインポートできない致命的なバグがあった。
    この問題に関してのIssueは上がっているが現状管理者からは無視され続けている模様。
    しかしこちらとしてはできる限りパッケージ管理にnpm経由のスタイルをとりたい。
    ビルド時に外部からExport/Importの記述を追加して、別モジュールからmxGraphを呼び出せるようにしている。
    おかげで開発に必要な依存ライブラリが増加した。
    - imports-loader
    - exports-loader
    - copy-webpack-plugin

    参考にしたGithub Issue
    https://github.com/jgraph/mxgraph/issues/169
*/
const mxGraphConf = {
    rule: {
        test: require.resolve('mxgraph/javascript/mxClient.min.js'),
        use: [
            'imports-loader?mxBasePath=>"/libs/mxGraph/src/"',
            'imports-loader?mxLoadResources=>false',
            'exports-loader?mxClient,mxGraph,mxRubberband,mxUtils,mxEvent'
        ]
    },
    plugin: {
        // node_moduleのアセットを公開ディレクトリに配置する
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
