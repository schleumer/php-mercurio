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
  leftNav: require('./leftNav'),
  loading: require('./loading'),
  text: require('./text'),
  numeric: require('./numeric'),
  textArea: require('./textArea'),
  error: require('./error'),
  errorBlock: require('./errorBlock'),
  form: require('./form'),
  page: require('./page'),
  pageHeader: require('./pageHeader'),
  pageContainer: require('./pageContainer'),
  pageToolbar: require('./pageToolbar'),
  listOfItems: require('./listOfItems'),
  remoteSelect: require('./remoteSelect'),
  dateTime: require('./dateTime'),
  dropdown: require('./dropdown')
};