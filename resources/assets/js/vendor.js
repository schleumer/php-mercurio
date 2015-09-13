var $ = require('jquery');
window.$ = window.jQuery = $;

var angular = require('angular');

angular.module('mercurio.vendor', []).value('vendorVersion', '$vendor-version$');