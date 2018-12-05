import {mxClient, mxGraph, mxRubberband, mxUtils, mxEvent, mxConstants, mxEdgeStyle} from 'mxgraph/javascript/mxClient.min.js'

// ロード時
export function onLoad() {
    window.onload = function() {
        load();
    };
}

function load() {
    // console.log(mxGraph);
    if (!mxClient.isBrowserSupported()) {
        mxUtils.error('Browser is not supported!', 200, false);
        return;
    }

    initGraph(document.getElementById('graphContainer'));

    showGlobalVariables();
}
/**
 * 引数の要素にグラフを描画する
 * @param  {} container グラフを描画するDOM要素
 */
function initGraph(container) {
    var graph = new mxGraph(container);
    var model = graph.getModel();
    var parent = graph.getDefaultParent();

    var vertexStyle = graph.getStylesheet().getDefaultVertexStyle();
    vertexStyle[mxConstants.ROUNDED] = true;

    var edgeStyle = graph.getStylesheet().getDefaultEdgeStyle();
    edgeStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;

    model.beginUpdate();
    try {
        var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30, 'rounded;strokeColor=red;fillColor=white');
        var v2 = graph.insertVertex(parent, null, 'World', 200, 150, 80, 30);
        var e1 = graph.insertEdge(parent, null, '', v1, v2);
    } finally {
        model.endUpdate();
    }
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