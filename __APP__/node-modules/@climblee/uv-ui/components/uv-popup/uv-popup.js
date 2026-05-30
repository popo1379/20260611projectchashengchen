var t, o, e = require("../../../../../@babel/runtime/helpers/objectSpread2"), i = require("../../../../../common/vendor.js"), s = {
    name: "uv-popup",
    components: {},
    mixins: [ i.mpMixin, i.mixin ],
    emits: [ "change", "maskClick" ],
    props: e({
        mode: {
            type: String,
            default: "center"
        },
        duration: {
            type: [ String, Number ],
            default: 300
        },
        zIndex: {
            type: [ String, Number ],
            default: 10075
        },
        bgColor: {
            type: String,
            default: "#ffffff"
        },
        safeArea: {
            type: Boolean,
            default: !0
        },
        overlay: {
            type: Boolean,
            default: !0
        },
        closeOnClickOverlay: {
            type: Boolean,
            default: !0
        },
        overlayOpacity: {
            type: [ Number, String ],
            default: .4
        },
        overlayStyle: {
            type: [ Object, String ],
            default: ""
        },
        safeAreaInsetBottom: {
            type: Boolean,
            default: !0
        },
        safeAreaInsetTop: {
            type: Boolean,
            default: !1
        },
        closeable: {
            type: Boolean,
            default: !1
        },
        closeIconPos: {
            type: String,
            default: "top-right"
        },
        zoom: {
            type: Boolean,
            default: !0
        },
        round: {
            type: [ Number, String ],
            default: 0
        }
    }, null == (o = null == (t = i.index.$uv) ? void 0 : t.props) ? void 0 : o.popup),
    watch: {
        type: {
            handler: function(t) {
                this.config[t] && this[this.config[t]](!0);
            },
            immediate: !0
        },
        isDesktop: {
            handler: function(t) {
                this.config[t] && this[this.config[this.mode]](!0);
            },
            immediate: !0
        },
        showPopup: function(t) {}
    },
    data: function() {
        return {
            ani: [],
            showPopup: !1,
            showTrans: !1,
            popupWidth: 0,
            popupHeight: 0,
            config: {
                top: "top",
                bottom: "bottom",
                center: "center",
                left: "left",
                right: "right",
                message: "top",
                dialog: "center",
                share: "bottom"
            },
            transitionStyle: {
                position: "fixed",
                left: 0,
                right: 0
            },
            maskShow: !0,
            mkclick: !0,
            popupClass: this.isDesktop ? "fixforpc-top" : "top",
            direction: ""
        };
    },
    computed: {
        isDesktop: function() {
            return this.popupWidth >= 500 && this.popupHeight >= 500;
        },
        bg: function() {
            return "" === this.bgColor || "none" === this.bgColor || this.$uv.getPx(this.round) > 0 ? "transparent" : this.bgColor;
        },
        contentStyle: function() {
            var t = {};
            if (this.bgColor && (t.backgroundColor = this.bg), this.round) {
                var o = this.$uv.addUnit(this.round), e = this.direction ? this.direction : this.mode;
                t.backgroundColor = this.bgColor, "top" === e ? (t.borderBottomLeftRadius = o, t.borderBottomRightRadius = o) : "bottom" === e ? (t.borderTopLeftRadius = o, 
                t.borderTopRightRadius = o) : "center" === e && (t.borderRadius = o);
            }
            return this.$uv.deepMerge(t, this.$uv.addStyle(this.customStyle));
        }
    },
    unmounted: function() {
        this.setH5Visible();
    },
    created: function() {
        this.messageChild = null, this.clearPropagation = !1;
    },
    methods: {
        setH5Visible: function() {},
        closeMask: function() {
            this.maskShow = !1;
        },
        clear: function(t) {
            t.stopPropagation(), this.clearPropagation = !0;
        },
        open: function(t) {
            if (!this.showPopup) return t && -1 !== [ "top", "center", "bottom", "left", "right", "message", "dialog", "share" ].indexOf(t) ? this.direction = t : t = this.mode, 
            this.config[t] ? (this[this.config[t]](), void this.$emit("change", {
                show: !0,
                type: t
            })) : this.$uv.error("缺少类型：".concat(t));
        },
        close: function(t) {
            var o = this;
            this.showTrans = !1, this.$emit("change", {
                show: !1,
                type: this.mode
            }), clearTimeout(this.timer), this.timer = setTimeout(function() {
                o.showPopup = !1;
            }, 300);
        },
        touchstart: function() {
            this.clearPropagation = !1;
        },
        onTap: function() {
            this.clearPropagation ? this.clearPropagation = !1 : (this.$emit("maskClick"), this.closeOnClickOverlay && this.close());
        },
        top: function(t) {
            var o = this;
            this.popupClass = this.isDesktop ? "fixforpc-top" : "top", this.ani = [ "slide-top" ], 
            this.transitionStyle = {
                position: "fixed",
                zIndex: this.zIndex,
                left: 0,
                right: 0,
                backgroundColor: this.bg
            }, t || (this.showPopup = !0, this.showTrans = !0, this.$nextTick(function() {
                o.messageChild && "message" === o.mode && o.messageChild.timerClose();
            }));
        },
        bottom: function(t) {
            this.popupClass = "bottom", this.ani = [ "slide-bottom" ], this.transitionStyle = {
                position: "fixed",
                zIndex: this.zIndex,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: this.bg
            }, t || (this.showPopup = !0, this.showTrans = !0);
        },
        center: function(t) {
            this.popupClass = "center", this.ani = this.zoom ? [ "zoom-in", "fade" ] : [ "fade" ], 
            this.transitionStyle = {
                position: "fixed",
                zIndex: this.zIndex,
                display: "flex",
                flexDirection: "column",
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                justifyContent: "center",
                alignItems: "center"
            }, t || (this.showPopup = !0, this.showTrans = !0);
        },
        left: function(t) {
            this.popupClass = "left", this.ani = [ "slide-left" ], this.transitionStyle = {
                position: "fixed",
                zIndex: this.zIndex,
                left: 0,
                bottom: 0,
                top: 0,
                backgroundColor: this.bg,
                display: "flex",
                flexDirection: "column"
            }, t || (this.showPopup = !0, this.showTrans = !0);
        },
        right: function(t) {
            this.popupClass = "right", this.ani = [ "slide-right" ], this.transitionStyle = {
                position: "fixed",
                zIndex: this.zIndex,
                bottom: 0,
                right: 0,
                top: 0,
                backgroundColor: this.bg,
                display: "flex",
                flexDirection: "column"
            }, t || (this.showPopup = !0, this.showTrans = !0);
        }
    }
};

Array || (i.resolveComponent("uv-overlay") + i.resolveComponent("uv-status-bar") + i.resolveComponent("uv-safe-bottom") + i.resolveComponent("uv-icon") + i.resolveComponent("uv-transition"))(), 
Math || (function() {
    return "../uv-overlay/uv-overlay.js";
} + function() {
    return "../uv-status-bar/uv-status-bar.js";
} + function() {
    return "../uv-safe-bottom/uv-safe-bottom.js";
} + function() {
    return "../uv-icon/uv-icon.js";
} + function() {
    return "../uv-transition/uv-transition.js";
})();

var n = i._export_sfc(s, [ [ "render", function(t, o, e, s, n, r) {
    return i.e({
        a: n.showPopup
    }, n.showPopup ? i.e({
        b: n.maskShow && e.overlay
    }, n.maskShow && e.overlay ? {
        c: i.o(r.onTap),
        d: i.p({
            show: n.showTrans,
            duration: e.duration,
            "custom-style": e.overlayStyle,
            opacity: e.overlayOpacity,
            zIndex: e.zIndex
        })
    } : {}, {
        e: e.safeAreaInsetTop
    }, (e.safeAreaInsetTop, {}), {
        f: e.safeAreaInsetBottom
    }, (e.safeAreaInsetBottom, {}), {
        g: e.closeable
    }, e.closeable ? {
        h: i.p({
            name: "close",
            color: "#909399",
            size: "18",
            bold: !0
        }),
        i: i.o(function() {
            return r.close && r.close.apply(r, arguments);
        }),
        j: i.n("uv-popup__content__close--" + e.closeIconPos)
    } : {}, {
        k: i.s(r.contentStyle),
        l: i.n(n.popupClass),
        m: i.o(function() {
            return r.clear && r.clear.apply(r, arguments);
        }),
        n: i.o(r.onTap),
        o: i.p({
            mode: n.ani,
            name: "content",
            "custom-style": n.transitionStyle,
            duration: e.duration,
            show: n.showTrans
        }),
        p: i.o(function() {
            return r.touchstart && r.touchstart.apply(r, arguments);
        }),
        q: i.n(n.popupClass),
        r: i.n(r.isDesktop ? "fixforpc-z-index" : ""),
        s: i.s({
            zIndex: e.zIndex
        })
    }) : {});
} ], [ "__scopeId", "data-v-8476b35e" ] ]);

wx.createComponent(n);