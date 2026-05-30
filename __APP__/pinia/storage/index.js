var e = require("../../common/vendor.js");

exports.storage = function(t) {
    return {
        setItem: function(t, n) {
            var r = n;
            e.index.setStorageSync(t, r);
        },
        getItem: function(t) {
            return e.index.getStorageSync(t);
        }
    };
};