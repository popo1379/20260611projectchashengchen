var t = require("../../../../../@babel/runtime/helpers/typeof"), e = require("../../../../../common/vendor.js"), n = {
    name: "uv-subsection",
    mixins: [ e.mpMixin, e.mixin, e.props$3 ],
    data: function() {
        return {
            itemRect: {
                width: 0,
                height: 0
            }
        };
    },
    watch: {
        list: {
            deep: !0,
            handler: function() {
                this.init();
            }
        },
        current: {
            immediate: !0,
            handler: function(t) {}
        }
    },
    computed: {
        wrapperStyle: function() {
            var t = {};
            return "button" === this.mode && (t.backgroundColor = this.bgColor), t;
        },
        barStyle: function() {
            var t = {};
            return t.width = "".concat(this.itemRect.width, "px"), t.height = "".concat(this.itemRect.height, "px"), 
            t.transform = "translateX(".concat(this.current * this.itemRect.width, "px)"), "subsection" === this.mode && (t.backgroundColor = this.activeColor), 
            this.$uv.deepMerge(t, this.$uv.addStyle(this.customItemStyle));
        },
        itemStyle: function(t) {
            var e = this;
            return function(t) {
                var n = {};
                return "subsection" === e.mode && (n.borderColor = e.activeColor, n.borderWidth = "1px", 
                n.borderStyle = "solid"), n;
            };
        },
        textStyle: function(t) {
            var e = this;
            return function(t) {
                var n = {};
                return n.fontWeight = e.bold && e.current === t ? "bold" : "normal", n.fontSize = e.$uv.addUnit(e.fontSize), 
                "subsection" === e.mode ? n.color = e.current === t ? "#fff" : e.inactiveColor : n.color = e.current === t ? e.activeColor : e.inactiveColor, 
                n;
            };
        }
    },
    mounted: function() {
        this.init();
    },
    methods: {
        init: function() {
            var t = this;
            this.$uv.sleep().then(function() {
                return t.getRect();
            });
        },
        getText: function(e) {
            return "object" == t(e) ? e[this.keyName] : e;
        },
        getRect: function() {
            var t = this;
            this.$uvGetRect(".uv-subsection__item--0").then(function(e) {
                t.itemRect = e;
            });
        },
        clickHandler: function(t) {
            this.$emit("change", t);
        }
    }
}, i = e._export_sfc(n, [ [ "render", function(t, n, i, o, r, c) {
    return {
        a: e.s(c.barStyle),
        b: e.n("button" === t.mode && "uv-subsection--button__bar"),
        c: e.n(0 === t.current && "subsection" === t.mode && "uv-subsection__bar--first"),
        d: e.n(t.current > 0 && t.current < t.list.length - 1 && "subsection" === t.mode && "uv-subsection__bar--center"),
        e: e.n(t.current === t.list.length - 1 && "subsection" === t.mode && "uv-subsection__bar--last"),
        f: e.f(t.list, function(n, i, o) {
            return {
                a: e.t(c.getText(n)),
                b: e.s(c.textStyle(i)),
                c: e.n("uv-subsection__item--".concat(i)),
                d: e.n(i < t.list.length - 1 && "uv-subsection__item--no-border-right"),
                e: e.n(0 === i && "uv-subsection__item--first"),
                f: e.n(i === t.list.length - 1 && "uv-subsection__item--last"),
                g: "uv-subsection__item--".concat(i),
                h: e.s(c.itemStyle(i)),
                i: e.o(function(t) {
                    return c.clickHandler(i);
                }, i),
                j: i
            };
        }),
        g: e.n("uv-subsection--".concat(t.mode)),
        h: e.s(t.$uv.addStyle(t.customStyle)),
        i: e.s(c.wrapperStyle)
    };
} ], [ "__scopeId", "data-v-3c8f05d4" ] ]);

wx.createComponent(i);