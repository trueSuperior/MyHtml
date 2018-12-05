
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

function hello() {
    var message = "Hello World!";
    document.body.innerHTML += message;
    console.log(message);
}

function showGlobalVariables() {
    console.log((function () {
        var propsOrig = [];
        var propsGlobal = {};
        var win = window.open();
        for (var i in win) {
            propsOrig.push(i);
        }
        win.close();
        for (var i in window) {
            if (!propsOrig.includes(i)) {
                propsGlobal[i] = window[i]
            }
        }
        return propsGlobal;
    })());
}