var e = require("../../@babel/runtime/helpers/objectSpread2"), t = require("../../common/vendor.js"), r = require("./intercept.js"), n = require("../env.js"), i = require("./lock.js"), o = function(o, a, u, c) {
    return new Promise(function(s, d) {
        t.index.request({
            url: n.env.host + a,
            method: o,
            data: u,
            timeout: 18e4,
            header: e({
                "content-type": "application/json",
                secret: i.lock()
            }, c),
            success: function(e) {
                200 == e.data.state ? s(e.data) : (r.intercept(e.data), d(e.data));
            },
            fail: function(e) {
                r.intercept(e.data), d(e);
            }
        });
    });
}, a = {
    get: function(e, t, r) {
        return o("GET", e, t, {});
    },
    post: function(e, t, r) {
        return o("POST", e, t, {});
    }
};

exports.http = a;