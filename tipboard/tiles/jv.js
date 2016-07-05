/*jslint browser: true, devel: true*/
/*global WebSocket: false, Tipboard: false*/

function updateTileJV(tileId, data, config) {
    var tile = Tipboard.Dashboard.id2node(tileId);
    JV.setDataByKeys(tileId, data, 'all');
    var highlighterNode = $('#' + tileId + '-jv').parent();
    Tipboard.DisplayUtils.applyHighlighterConfig(
        highlighterNode, config['jv-color'], config.fading_background
    );
    Tipboard.TileDisplayDecorator.runAllDecorators(tile);
}

Tipboard.Dashboard.registerUpdateFunction('jv', updateTileJV);

JV = {
    setDataByKeys: function(tileId, data, keys) {
        Tipboard.Dashboard.setDataByKeys(tileId, data, keys);
    },
    setJVColor: function(tileId, meta) {
        // DEPRECATED function, Tipboard.DisplayUtils.applyHighlighterConfig
        var color = meta['jv-color'];
        if (typeof(color) !== 'undefined') {
            color = Tipboard.DisplayUtils.replaceFromPalette(color);
            var dst = $('#' + tileId + '-jv').parent();
            $(dst).css('background-color', color);
        }
    }
};
