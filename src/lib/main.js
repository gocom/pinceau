(function ()
{
    'use strict';

    var module =
    {
        winUtils: require('sdk/deprecated/window-utils'),
        style: require('sdk/stylesheet/style'),
        content: require('sdk/content/mod'),
        self: require('sdk/self')
    };

    var style = module.style.Style({
        uri: module.self.data.url('skin/browser.css')
    });

    /**
     * Track and attach to windows.
     */

    var delegate =
    {
        onTrack: function (window)
        {
            module.content.attachTo(style, window);
        },
        onUntrack: function (window)
        {
            module.content.detachFrom(style, window);
        }
    };

    var tracker = new module.winUtils.WindowTracker(delegate);
})();
