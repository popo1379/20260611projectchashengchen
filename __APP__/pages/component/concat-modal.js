var e = require("../../common/vendor.js");

require("../../config/router/index.js");

var r = require("../../pinia/system.js");

Math || n();

var n = function() {
    return "../../components/ui-modal.js";
}, o = {
    __name: "concat-modal",
    setup: function(n, o) {
        var t = o.expose, u = r.useSystemStore(), a = e.ref();
        return t({
            open: function() {
                return a.value.open();
            }
        }), function(r, n) {
            return {
                a: e.t(e.unref(u).modalText),
                b: e.t(e.unref(u).modalText),
                c: e.unref(u).qrcode,
                d: e.o(function(e) {
                    return a.value.close();
                }),
                e: e.sr(a, "45bc23f3-0", {
                    k: "refModal"
                })
            };
        };
    }
}, t = e._export_sfc(o, [ [ "__scopeId", "data-v-45bc23f3" ] ]);

wx.createComponent(t);