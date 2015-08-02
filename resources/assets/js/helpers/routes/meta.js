var R = require("ramda");

/**
 * @todo deixar mais bonito e purpurinado
 * @param icon
 * @param name
 * @param description
 * @returns {*}
 */
module.exports = function meta(icon, name, description) {
  if (R.is(Object, name)) {
    var values = R.values(name);
    return {icon, name: values[0], description: values[0]}
  } else if (arguments.length == 3) {
    return {icon, name, description}
  } else {
    return {}
  }
};