var n = require("./vendor.js"), t = {
    copy: function(t) {
        return new Promise(function(r, e) {
            n.index.setClipboardData({
                data: t,
                success: function() {
                    r();
                },
                fail: function(n) {
                    e(n);
                }
            });
        });
    },
    cacheFunc: function(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500, r = null, e = "";
        return function() {
            for (var i = arguments.length, u = new Array(i), o = 0; o < i; o++) u[o] = arguments[o];
            var c = JSON.stringify(u);
            return c == e && r || (r = n.apply(void 0, u), setTimeout(function() {
                r = null;
            }, t)), e = c, r;
        };
    }
};

exports.utils = t;