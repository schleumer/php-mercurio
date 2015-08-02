/***
 * @type {{
 *   meta: (*|exports|module.exports),
 *   route: (*|exports|module.exports),
 *   freeRoute: (*|exports|module.exports)
 * }}
 */
module.exports = {
  meta: require('./meta'),
  route: require('./route'),
  freeRoute: require('./freeRoute')
};