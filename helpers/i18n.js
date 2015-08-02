import R from "ramda";

var $i18n = function $i18n(data) {
    this.get = function(str) {
        return data[str] || str;
    };
    this.all = function() {
        return R.mapObjIndexed((item, key) => {
            return item || key;
        }, R.pickAll(arguments, data));
    };
};

module.exports = function init(data) {
    return new $i18n(data);
};