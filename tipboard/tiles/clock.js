/*jslint browser: true, devel: true*/
/*global WebSocket: false, Tipboard: false*/

function updateTileClock(tileId, data, config) {
    var tile = Tipboard.Dashboard.id2node(tileId);
    Clock.setDataByKeys(tileId, data, 'all');
    var highlighterNode = $('#' + tileId + '-clock').parent();
    Tipboard.DisplayUtils.applyHighlighterConfig(
        highlighterNode, config['clock-color'], config.fading_background
    );
    Tipboard.TileDisplayDecorator.runAllDecorators(tile);
    window.setTimeout(updateClockTime, 1000, tileId, data, config);
}

function updateClockTime(tileId, data, config) {
	window.setTimeout(updateClockTime, 1000, tileId, data, config);
    var clock_node = $('#' + tileId + '-clock');
    var d = new Date();
    if (d.getHours() < 10 ) { h = "0" + d.getHours(); } else { h = d.getHours(); }
    if (d.getMinutes() < 10 ) { m = "0" + d.getMinutes(); } else { m = d.getMinutes(); }
    if (d.getSeconds() < 10 ) { s = "0" + d.getSeconds(); } else { s = d.getSeconds(); }
    timenow = h + ":" + m;
    clock_node.text(timenow);
};

Tipboard.Dashboard.registerUpdateFunction('clock', updateTileClock);

Clock = {
    setDataByKeys: function(tileId, data, keys) {
        Tipboard.Dashboard.setDataByKeys(tileId, data, keys);
    }
};
