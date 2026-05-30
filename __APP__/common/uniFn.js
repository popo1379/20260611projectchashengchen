var n = require("./vendor.js"), t = {
    toast: function(t) {
        n.index.showToast({
            title: t,
            duration: 3e3,
            icon: "none"
        });
    },
    loading: function(t) {
        n.index.showLoading({
            title: "加载中"
        });
    },
    confirmModal: function(t, i) {
        return new Promise(function(o, e) {
            n.index.showModal({
                title: t,
                content: i,
                success: function(n) {
                    n.confirm ? o() : n.cancel && e();
                }
            });
        });
    },
    getLocation: function() {
        return new Promise(function(t, i) {
            n.index.getLocation({
                type: "wgs84",
                success: function(n) {
                    return t([ {
                        longitude: n.longitude,
                        latitude: n.latitude
                    }, void 0 ]);
                },
                fail: function(n) {
                    return t([ void 0, n ]);
                }
            });
        });
    },
    getAuthorize: function(t) {
        return new Promise(function(i, o) {
            n.index.authorize({
                scope: t,
                success: function(n) {
                    return i([ n, void 0 ]);
                },
                fail: function(n) {
                    return i([ void 0, n ]);
                }
            });
        });
    },
    openSetting: function(t) {
        return new Promise(function(i, o) {
            n.index.openSetting({
                success: function(n) {
                    n.authSetting[t] ? i([ n, void 0 ]) : i([ void 0, n ]);
                },
                fail: function(n) {
                    return i([ void 0, n ]);
                }
            });
        });
    }
};

exports.uniFn = t;