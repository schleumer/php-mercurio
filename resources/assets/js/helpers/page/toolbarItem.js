var str = $i18n('templates');

module.exports = function ToolbarItem(title, type, icon, path, data) {
  return { title: str.get(title), type: type || 'default', icon, path, data };
};