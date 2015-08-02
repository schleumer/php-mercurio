module.exports = {
  dot2regexp (str) {
    return new RegExp('^' + str.replace('.', '\\.').replace('*', '.*') + '$', 'g');
  }
};