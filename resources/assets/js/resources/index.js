/**
 * @type {{
 *   users: (*|exports|module.exports)
 * }}
 */
module.exports = {
  users: require('./users'),
  customers: require('./customers'),
  jobs: require('./jobs'),
  jobOrders: require('./jobOrders')
};