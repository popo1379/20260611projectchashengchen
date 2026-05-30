var t = require("../../../../../common/vendor.js"), e = {
    name: "uv-navbar",
    mixins: [ t.mpMixin, t.mixin, t.props ],
    data: function() {
        return {};
    },
    computed: {
        getBgColor: function() {
            var t = {};
            return this.bgColor && (this.bgColor.indexOf("gradient") > -1 ? t.backgroundImage = this.bgColor : this.isImg ? t.background = "transparent" : t.background = this.bgColor), 
            t;
        },
        getStatusbgColor: function() {
            if (this.bgColor) return this.isImg ? "transparent" : this.bgColor;
        },
        isImg: function() {
            var t = this.bgColor.indexOf("data:") > -1 && this.bgColor.indexOf("base64") > -1;
            return -1 !== this.bgColor.indexOf("/") || t;
        },
        bgImgStyle: function() {
            var t = {};
            return this.safeAreaInsetTop ? t.height = this.$uv.addUnit(this.$uv.sys().statusBarHeight + 44, "px") : t.height = "44px", 
            t;
        }
    },
    methods: {
        leftClick: function() {
            this.$emit("leftClick"), this.autoBack && t.index.navigateBack();
        },
        rightClick: function() {
            this.$emit("rightClick");
        }
    }
};

Array || (t.resolveComponent("uv-status-bar") + t.resolveComponent("uv-icon"))(), 
Math || (function() {
    return "../uv-status-bar/uv-status-bar.js";
} + function() {
    return "../uv-icon/uv-icon.js";
})();

var i = t._export_sfc(e, [ [ "render", function(e, i, o, r, n, s) {
    return t.e({
        a: e.fixed && e.placeholder
    }, e.fixed && e.placeholder ? {
        b: e.$uv.addUnit(e.$uv.getPx(e.height) + e.$uv.sys().statusBarHeight, "px")
    } : {}, {
        c: s.isImg
    }, s.isImg ? {
        d: e.bgColor,
        e: e.imgMode,
        f: t.s(s.bgImgStyle)
    } : {}, {
        g: e.safeAreaInsetTop
    }, e.safeAreaInsetTop ? {
        h: t.p({
            bgColor: s.getStatusbgColor
        })
    } : {}, {
        i: e.leftIcon
    }, e.leftIcon ? {
        j: t.p({
            name: e.leftIcon,
            size: e.leftIconSize,
            color: e.leftIconColor
        })
    } : {}, {
        k: e.leftText
    }, e.leftText ? {
        l: t.t(e.leftText),
        m: e.leftIconColor
    } : {}, {
        n: t.o(function() {
            return s.leftClick && s.leftClick.apply(s, arguments);
        }),
        o: t.t(e.title),
        p: t.s({
            width: e.$uv.addUnit(e.titleWidth),
            flex: "0 1 auto"
        }),
        q: t.s(e.$uv.addStyle(e.titleStyle)),
        r: e.rightIcon
    }, e.rightIcon ? {
        s: t.p({
            name: e.rightIcon,
            size: "20"
        })
    } : {}, {
        t: e.rightText
    }, e.rightText ? {
        v: t.t(e.rightText)
    } : {}, {
        w: t.o(function() {
            return s.rightClick && s.rightClick.apply(s, arguments);
        }),
        x: t.n(e.border && "uv-border-bottom"),
        y: t.s({
            height: e.$uv.addUnit(e.height)
        }),
        z: t.s(s.getBgColor),
        A: t.n(e.fixed && "uv-navbar--fixed")
    });
} ], [ "__scopeId", "data-v-44b38cd3" ] ]);

wx.createComponent(i);