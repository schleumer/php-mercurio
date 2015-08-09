// TODO: fix with browserify-shim

var $ = require('jquery');
window.$ = window.jQuery = $;

require('bootstrap');
require('jquery-mask-plugin');

$.jMaskGlobals.watchInputs = false;