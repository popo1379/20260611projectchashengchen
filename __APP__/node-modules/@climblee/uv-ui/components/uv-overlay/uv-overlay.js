var t = require("../../../../../common/vendor.js"), e = {
    name: "uv-overlay",
    emits: [ "click" ],
    mixins: [ t.mpMixin, t.mixin, t.props$4 ],
    watch: {
        show: function(t) {}
    },
    computed: {
        overlayStyle: function() {
            var t = {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: this.zIndex,
                bottom: 0,
                "background-color": "rgba(0, 0, 0, ".concat(this.opacity, ")")
            };
            return this.$uv.deepMerge(t, this.$uv.addStyle(this.customStyle));
        }
    },
    methods: {
        clickHandler: function() {
            this.$emit("click");
        },
        clear: function() {}
    }
};

Array || t.resolveComponent("uv-transition")(), Math;

var o = t._export_sfc(e, [ [ "render", function(e, o, r, i, n, c) {
    return {
        a: t.o(c.clickHandler),
        b: t.o(c.clear),
        c: t.p({
            show: e.show,
            mode: "fade",
            "custom-class": "uv-overlay",
            duration: e.duration,
            "custom-style": c.overlayStyle
        })
    };
} ], [ "__scopeId", "data-v-19c33124" ] ]);

wx.createComponent(o);