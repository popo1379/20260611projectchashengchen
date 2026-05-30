var e = require("../../common/vendor.js");

require("../../config/router/index.js");

var o = require("../../pinia/system.js");

Math || r();

var r = function() {
    return "./concat-modal.js";
}, n = {
    __name: "footer-button",
    props: {
        color: {
            default: "#f4e4d1"
        }
    },
    setup: function(r) {
        var n = o.useSystemStore(), t = e.index.getSystemInfoSync(), a = e.ref("ios" == t.osName && t.safeArea.bottom > 0), f = e.ref();
        return function(o, r) {
            return e.e({
                a: e.unref(n).officialAccount
            }, e.unref(n).officialAccount ? {
                b: e.t(e.unref(n).officialAccountBtn),
                c: e.o(function(e) {
                    return f.value.open();
                }),
                d: e.n(a.value ? "safe-area" : "pd-b")
            } : {}, {
                e: e.sr(f, "7bb1f820-0", {
                    k: "refConcatModal"
                })
            });
        };
    }
}, t = e._export_sfc(n, [ [ "__scopeId", "data-v-7bb1f820" ] ]);

wx.createComponent(t);