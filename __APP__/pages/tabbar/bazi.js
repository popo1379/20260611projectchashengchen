var e = require("../../@babel/runtime/helpers/slicedToArray"), r = require("../../common/vendor.js");

require("../../config/router/index.js");

var n = require("../../common/uniFn.js"), t = require("../../pinia/system.js");

Array || r.resolveComponent("uv-navbar")(), Math || (function() {
    return "../../node-modules/@climblee/uv-ui/components/uv-navbar/uv-navbar.js";
} + c + a)();

var a = function() {
    return "../../components/ui-dateTime-picker.js";
}, c = function() {
    return "../component/find-result.js";
}, o = {
    __name: "bazi",
    setup: function(a) {
        var c = t.useSystemStore();
        c.getSystemConfig();
        var o = r.reactive({
            birthday: "",
            calendar: 0
        }), i = r.ref(), u = function() {
            i.value.open(o.calendar, o.birthday || "2006/6/6/未知");
        }, s = function(e) {
            d.value = !1, o.birthday = "".concat(e.year, "-").concat(e.month, "-").concat(e.day, "-").concat(e.hour), 
            o.calendar = e.type;
        }, f = function() {
            var r = o.birthday.split("-"), n = e(r, 4), t = n[0], a = n[1], c = n[2], i = n[3];
            return o.birthday ? "".concat(0 == o.calendar ? "农历" : "公历", " · ").concat(t, "年").concat(a, "月").concat(c, "日 ").concat(i, "时") : "";
        }, d = r.ref(!1), l = function() {
            if (!o.birthday) return n.uniFn.toast("请选择日期时辰");
            d.value = !0;
        };
        return function(e, n) {
            return r.e({
                a: r.t(r.unref(c).navbar),
                b: r.p({
                    leftText: "",
                    fixed: !1,
                    "bg-color": "transparent",
                    leftIcon: ""
                }),
                c: r.t(r.unref(c).title),
                d: f(),
                e: r.o(u),
                f: r.t(r.unref(c).mainBtn),
                g: r.o(l),
                h: d.value
            }, d.value ? {
                i: r.p({
                    birthday: o.birthday,
                    calendar: o.calendar
                })
            } : {}, {
                j: r.sr(i, "47582f5c-2", {
                    k: "refSelectBirthday"
                }),
                k: r.o(s),
                l: r.p({
                    safeAreaInsetBottom: !1,
                    title: "选择日期时辰"
                }),
                m: r.unref(c).share
            }, (r.unref(c).share, {}));
        };
    }
}, i = r._export_sfc(o, [ [ "__scopeId", "data-v-47582f5c" ] ]);

wx.createPage(i);