var t = require("../../../../../common/vendor.js"), e = {
    name: "uv-status-bar",
    mixins: [ t.mpMixin, t.mixin, t.props$1 ],
    data: function() {
        return {};
    },
    computed: {
        style: function() {
            var t = {};
            return t.height = this.$uv.addUnit(this.$uv.sys().statusBarHeight, "px"), this.bgColor && (this.bgColor.indexOf("gradient") > -1 ? t.backgroundImage = this.bgColor : t.background = this.bgColor), 
            this.$uv.deepMerge(t, this.$uv.addStyle(this.customStyle));
        }
    }
}, r = t._export_sfc(e, [ [ "render", function(e, r, s, i, n, o) {
    return {
        a: t.s(o.style)
    };
} ], [ "__scopeId", "data-v-08fe2518" ] ]);

wx.createComponent(r);