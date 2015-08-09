// apesar de facilitar as coisas isso é intendível de não
// ser uma boa pratica, não reproduzam isso em casa,
// crianças

var R = require('ramda');

// <editor-fold desc=" -- [spoiler]Gambiarra[/spoiler]">
var files = R.merge(require('lang/**/*.js', {
  mode: 'hash',
  ext: true,
  resolve: []
}), require('templates/**/*.html', {
  mode: 'hash',
  ext: true,
  resolve: []
}));
// </editor-fold>

/**
 * Workaround para carregar alguns arquivos dinamicamente
 * @type {{get: Function}}
 */
module.exports = {
  get: function (file) {
    return files[file];
  }
};
