// TODO: fix with browserify-shim

var $ = require('jquery');
window.$ = window.jQuery = $;

require('bootstrap');
require('jquery-mask-plugin');
require('select2');

$.jMaskGlobals.watchInputs = false;

var moment = require("moment");
require("moment/locale/pt-br.js");
moment.locale("pt-br");