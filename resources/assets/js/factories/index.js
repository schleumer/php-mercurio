/**
 * @namespace factories
 * @module factories
 * @type {{
 *   auth: (*|exports|module.exports),
 *   loading: (*|exports|module.exports),
 *   chaos: (*|exports|module.exports)
 * }}
 */
module.exports =  {
  auth: require("./auth"),
  loading: require("./loading"),
  chaos: require('./chaos')
};