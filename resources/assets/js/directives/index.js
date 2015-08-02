/**
 * @module directives
 * @type {{
 *   leftNav: (*|exports|module.exports),
 *   loading: (*|exports|module.exports),
 *   text: (*|exports|module.exports),
 *   error: (*|exports|module.exports)
 * }}
 */
module.exports = {
  leftNav: require('./left-nav'),
  loading: require('./loading'),
  text: require('./text'),
  error: require('./error'),
  errorBlock: require('./errorBlock'),
  form: require('./form')
};