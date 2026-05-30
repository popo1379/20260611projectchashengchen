var e = require("../common/vendor.js");

require("../config/router/index.js"), Array || e.resolveComponent("uv-popup")(), 
Math;

var o = {
    __name: "ui-modal",
    props: {
        maskClose: {
            default: !0
        }
    },
    emits: [ "close" ],
    setup: function(o, n) {
        var r = n.expose, t = n.emit, s = e.ref(), a = function(e) {
            e.show || t("close");
        };
        return r({
            open: function() {
                e.nextTick$1(s.value.open);
            },
            close: function() {
                e.nextTick$1(s.value.close);
            }
        }), function(n, r) {
            return {
                a: e.sr(s, "ba0f4990-0", {
                    k: "refPopup"
                }),
                b: e.o(a),
                c: e.p({
                    bgColor: "transparent",
                    duration: 150,
                    mode: "center",
                    closeOnClickOverlay: o.maskClose
                })
            };
        };
    }
}, n = e._export_sfc(o, [ [ "__scopeId", "data-v-ba0f4990" ] ]);

wx.createComponent(n);