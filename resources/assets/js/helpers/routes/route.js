/**
 *
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
module.exports = function route(resolver, path, template, name, meta) {
  return {resolver, path, template, name, meta, free: false};
};