var through = require('through')
  , _ = require("lodash")
  , path = require('path')
  , unparse = require('escodegen').generate
  , falafel = require('falafel')
  , util = require('util')
  , R = require('ramda')

function i18nify(langRoot, lang, file) {
  if (!/\.js$/.test(file)) return through()

  var buffer = []

  return through(write, flush)

  function write(data) {
    buffer.push(data)
  }

  function flush() {
    var output = buffer.join('')
    try {
      output = falafel(output, function(node) {
        if (node.type === 'CallExpression' &&
          node.callee.type === 'Identifier' &&
          node.callee.name === '$i18n') {
          var parsedFileName = new Function([], 'return ' + unparse(node.arguments[0]))()
          var langFile = path.join("..", path.relative(path.join(path.dirname(file), '..'), path.join(langRoot, lang, parsedFileName)))
          var helperPath = path.join("..", path.relative(path.join(path.dirname(file), '..'), path.join(__dirname, 'i18n.js')))
          var newNode = util.format.apply(null,
            ['require(%s)(require(%s))']
            .concat(
              [helperPath, langFile].map(JSON.stringify)))
          node.update(newNode)
        }
      }).toString()
    } catch (err) {
      this.emit('error', new Error(err.toString().replace('Error: ', '') + ' (' + file + ')'))
    }

    this.queue(output)
    this.queue(null)
  }
}

module.exports = R.curry(i18nify);
