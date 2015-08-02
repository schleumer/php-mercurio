/**
 * @param resolver
 * @param path
 * @param template
 * @param name
 * @param meta
 * @returns {{
 *   resolver: function,
 *   path: string,
 *   template: string,
 *   name: string,
 *   meta: *,
 *   free: boolean
 * }}
 */
module.exports = function freeRoute(resolver, path, template, name, meta) {
  return {resolver, path, template, name, meta, free: true};
};