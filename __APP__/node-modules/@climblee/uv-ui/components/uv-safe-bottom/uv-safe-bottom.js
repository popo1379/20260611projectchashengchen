var e = require("../../../../../common/vendor.js"), t = {
    name: "uv-safe-bottom",
    mixins: [ e.mpMixin, e.mixin ],
    data: function() {
        return {
            safeAreaBottomHeight: 0,
            isNvue: !1
        };
    },
    computed: {
        style: function() {
            return this.$uv.deepMerge({}, this.$uv.addStyle(this.customStyle));
        }
    },
    mounted: function() {}
}, n = e._export_sfc(t, [ [ "render", function(t, n, o, i, s, r) {
    return {
        a: e.s(r.style),
        b: e.n(!s.isNvue && "uv-safe-area-inset-bottom")
    };
} ], [ "__scopeId", "data-v-8065622b" ] ]);

wx.createComponent(n);