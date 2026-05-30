var i = require("../../../../../common/vendor.js"), t = {
    name: "uv-icon",
    emits: [ "click" ],
    mixins: [ i.mpMixin, i.mixin, i.props$2 ],
    data: function() {
        return {
            colorType: [ "primary", "success", "info", "error", "warning" ]
        };
    },
    computed: {
        uClasses: function() {
            var i = [];
            return i.push(this.customPrefix), i.push(this.customPrefix + "-" + this.name), this.color && this.colorType.includes(this.color) && i.push("uv-icon__icon--" + this.color), 
            i;
        },
        iconStyle: function() {
            var i = {};
            return i = {
                fontSize: this.$uv.addUnit(this.size),
                lineHeight: this.$uv.addUnit(this.size),
                fontWeight: this.bold ? "bold" : "normal",
                top: this.$uv.addUnit(this.top)
            }, this.color && !this.colorType.includes(this.color) && (i.color = this.color), 
            i;
        },
        isImg: function() {
            var i = this.name.indexOf("data:") > -1 && this.name.indexOf("base64") > -1;
            return -1 !== this.name.indexOf("/") || i;
        },
        imgStyle: function() {
            var i = {};
            return i.width = this.width ? this.$uv.addUnit(this.width) : this.$uv.addUnit(this.size), 
            i.height = this.height ? this.$uv.addUnit(this.height) : this.$uv.addUnit(this.size), 
            i;
        },
        icon: function() {
            var t = i.icons["uvicon-" + this.name];
            return t ? unescape("%u".concat(t)) : [ "uvicon" ].indexOf(this.customPrefix) > -1 ? this.name : "";
        }
    },
    methods: {
        clickHandler: function(i) {
            this.$emit("click", this.index), this.stop && this.preventEvent(i);
        }
    }
}, e = i._export_sfc(t, [ [ "render", function(t, e, s, n, o, a) {
    return i.e({
        a: a.isImg
    }, a.isImg ? {
        b: t.name,
        c: t.imgMode,
        d: i.s(a.imgStyle),
        e: i.s(t.$uv.addStyle(t.customStyle))
    } : {
        f: i.t(a.icon),
        g: i.n(a.uClasses),
        h: i.s(a.iconStyle),
        i: i.s(t.$uv.addStyle(t.customStyle)),
        j: t.hoverClass
    }, {
        k: "" !== t.label
    }, "" !== t.label ? {
        l: i.t(t.label),
        m: t.labelColor,
        n: t.$uv.addUnit(t.labelSize),
        o: "right" == t.labelPos ? t.$uv.addUnit(t.space) : 0,
        p: "bottom" == t.labelPos ? t.$uv.addUnit(t.space) : 0,
        q: "left" == t.labelPos ? t.$uv.addUnit(t.space) : 0,
        r: "top" == t.labelPos ? t.$uv.addUnit(t.space) : 0
    } : {}, {
        s: i.o(function() {
            return a.clickHandler && a.clickHandler.apply(a, arguments);
        }),
        t: i.n("uv-icon--" + t.labelPos)
    });
} ], [ "__scopeId", "data-v-553bbf60" ] ]);

wx.createComponent(e);