/**
 * index dos modulos que contêm controllers,
 * para facilitar a importação e melhorar
 * a legibilidade do projeto como um todo
 * por isso é melhor chamar /
 * como home e não como index.
 * @module controllers
 * @type {{
 *   home: (*[]|exports|module.exports),
 *   customers: (*[]|exports|module.exports),
 *   jobOrders: (*[]|exports|module.exports),
 *   jobs: (*[]|exports|module.exports),
 *   payables: (*[]|exports|module.exports),
 *   receivables: (*[]|exports|module.exports)
 *   auth: (*[]|exports|module.exports)
 * }}
 */
module.exports = {
  home: require('./home'),
  customers: require('./customers'),
  jobOrders: require('./jobOrders'),
  jobs: require('./jobs'),
  payables: require('./payables'),
  receivables: require('./receivables'),
  auth: require('./auth'),
  logout: require('./logout')
};