
// ロード時
export function onLoad() {
    window.onload = function() {
        load();
    };
}

function load() {
    hello();
}

function hello() {
    var message = "Hello World!";
    document.body.innerHTML += message;
    console.log(message);
}