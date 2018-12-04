module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { url: false } },
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
