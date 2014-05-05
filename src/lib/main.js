/**
 * Pinceau - Firefox add-on
 *
 * @author  Jukka Svahn
 * @license MIT
 * @link    https://github.com/gocom/pinceau
 */

/*
 * Copyright (C) 2014 Jukka Svahn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function ()
{
    'use strict';

    var self = require('sdk/self'),
        style = require('sdk/stylesheet/style'),
        contentMod = require('sdk/content/mod'),
        winUtils = require('sdk/deprecated/window-utils'),
        browserCss,
        delegate;

    browserCss = style.Style({
        uri: self.data.url('skin/browser.css')
    });

    delegate =
    {
        onTrack: function (window)
        {
            contentMod.attachTo(browserCss, window);
        },
        onUntrack: function (window)
        {
            contentMod.detachFrom(browserCss, window);
        }
    };

    winUtils.WindowTracker(delegate);
})();
