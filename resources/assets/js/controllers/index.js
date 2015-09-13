/**
 * index dos modulos que contêm controllers,
 * para facilitar a importação e melhorar
 * a legibilidade do projeto como um todo
 * por isso é melhor chamar /
 * como home e não como index.
 * @module controllers
 */
module.exports = {
  home: require('./home'),
  customers: require('./customers'),
  jobOrders: require('./jobOrders'),
  jobs: require('./jobs'),
  payables: require('./payables'),
  receivables: require('./receivables'),
  auth: require('./auth'),
  logout: require('./logout'),
  reports: require('./reports'),
  users: require('./users'),
  payableTypes: require('./payableTypes'),
  company: require('./company'),
  contact: require('./contact')
};