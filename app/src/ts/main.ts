
// ロード時
export function onLoad() {
    window.onload = function() {
        load();
    };
}

function load() {
    hello();
    showGlobalVariables();
}

/**
 * Hello World!
 */
function hello() {
    var message = "Hello World!";
    document.body.innerHTML += message;
    console.log(message);
}

/**
 * デバッグ用。グローバル変数をコンソールに出力する。
 */
function showGlobalVariables() {
    console.log((function () {
        let propsOrig: string[] = [];
        let propsGlobal = {};
        let win = window.open();
        for (var i in win) {
            propsOrig.push(i);
        }
        win.close();
        for (var i in window) {
            if (propsOrig.indexOf(i) === -1) {
                propsGlobal[i] = window[i]
            }
        }
        return propsGlobal;
    })());
}