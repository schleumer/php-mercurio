// TODO: fix with browserify-shim

var $ = require('jquery');
window.$ = window.jQuery = $;

require('bootstrap');
require('jquery-mask-plugin');
require('select2');
require('eonasdan-bootstrap-datetimepicker');
require('jquery.inputmask');
require('jquery.inputmask/dist/inputmask/jquery.inputmask.extensions.js');
require('jquery.inputmask/dist/inputmask/jquery.inputmask.date.extensions.js');
require('jquery.inputmask/dist/inputmask/jquery.inputmask.numeric.extensions.js');
require('jquery.inputmask/dist/inputmask/jquery.inputmask.phone.extensions.js');
require('jquery.inputmask/dist/inputmask/jquery.inputmask.regex.extensions.js');

$.jMaskGlobals.watchInputs = false;

var moment = require("moment");
require("moment/locale/pt-br.js");
moment.locale("pt-br");