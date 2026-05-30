require("../@babel/runtime/helpers/Arrayincludes");

var e = require("../@babel/runtime/helpers/toConsumableArray"), n = require("../@babel/runtime/helpers/objectSpread2"), t = require("../common/vendor.js"), r = require("../lunar/index.js");

Array || (t.resolveComponent("uv-subsection") + t.resolveComponent("uv-popup"))(), 
Math || (function() {
    return "../node-modules/@climblee/uv-ui/components/uv-subsection/uv-subsection.js";
} + function() {
    return "../node-modules/@climblee/uv-ui/components/uv-popup/uv-popup.js";
})();

var o = {
    __name: "ui-dateTime-picker",
    props: {
        title: {
            default: "选择时间"
        },
        mode: {
            default: "dateTime"
        },
        formatter: {
            default: function() {
                return null;
            }
        },
        safeAreaInsetBottom: {
            default: !1
        }
    },
    emits: [ "select" ],
    setup: function(o, a) {
        for (var u = a.expose, i = a.emit, d = o, c = t.reactive({
            open: !1,
            years: [],
            months: [],
            days: [],
            hour: [ {
                name: "未知",
                id: "未知"
            } ],
            minute: [],
            currentIndex: [ 0, 0, 0, 0, 0 ]
        }), m = t.ref(), s = t.reactive({
            current: 0,
            list: [ "农历", "公历" ]
        }), l = function(e) {
            s.current = e;
            var n = c.currentIndex[0], t = c.currentIndex[1];
            x(c.years[n].id, c.months[t].id);
        }, f = function(e) {
            c.open = e.show;
        }, p = function() {
            t.nextTick$1(m.value.close);
        }, h = new Date("1949/1/1").getFullYear(), v = h; v <= h + 80; v++) c.years.push({
            name: v,
            id: v
        });
        for (var y = 1; y <= 12; y++) c.months.push({
            name: y < 10 ? "0".concat(y) : y,
            id: y < 10 ? "0".concat(y) : y
        });
        for (var x = function(e, n) {
            c.days = [];
            var t = new Date(e, n, 0).getDate();
            0 == s.current && (t = r.lunar.lunarLastDay(e, n));
            for (var o = 1; o <= t; o++) c.days.push({
                name: o < 10 ? "0".concat(o) : o,
                id: o < 10 ? "0".concat(o) : o
            });
        }, b = 0; b <= 23; b++) {
            var g = {
                name: b < 10 ? "0".concat(b) : b,
                id: b < 10 ? "0".concat(b) : b
            };
            c.hour.push(g);
        }
        for (var I = 0; I <= 59; I++) {
            var T = {
                name: I < 10 ? "0".concat(I) : I,
                id: I < 10 ? "0".concat(I) : I
            };
            c.minute.push(T);
        }
        var D = function e(n, t) {
            if (0 == s.current) {
                if ("month" == n) return 0 == s.current ? q(Number(t)) : "".concat(t, "月");
                if ("day" == n) return 0 == s.current ? _(Number(t)) : "".concat(t, "月");
            }
            if (!d.formatter) return {
                year: "".concat(t, "年"),
                month: "".concat(t, "月"),
                day: "".concat(t, "日"),
                hour: "".concat(t, "时"),
                minute: "".concat(t, "分")
            }[n];
            e(n, t);
        }, w = function(e) {
            var n = new Date(e), t = n.getFullYear(), r = n.getMonth() + 1;
            r = r < 10 ? "0".concat(r) : r;
            var o = n.getDate();
            o = o < 10 ? "0".concat(o) : o;
            var a = n.getHours();
            a = a < 10 ? "0".concat(a) : a;
            var u = n.getMinutes();
            return [ t, r, o, a, u = u < 10 ? "0".concat(u) : u ];
        }, A = function(e, n, t, r, o) {
            if (e && n && t) {
                var a = c.years.findIndex(function(n) {
                    return n.id == e;
                });
                a = a < 0 ? 0 : a;
                var u = c.months.findIndex(function(e) {
                    return e.id == n;
                });
                u = u < 0 ? 0 : u, x(c.years[a].id, c.months[u].id);
                var i = c.days.findIndex(function(e) {
                    return e.id == t;
                });
                i = i < 0 ? 0 : i;
                var m = c.hour.findIndex(function(e) {
                    return e.id == r;
                });
                m = m < 0 ? 0 : m;
                var s = c.minute.findIndex(function(e) {
                    return e.id == o;
                });
                s = s < 0 ? 0 : s, "dateTime" == d.mode ? c.currentIndex = [ a, u, i, m ] : "year-month" == d.mode ? c.currentIndex = [ a, u ] : "date" == d.mode ? c.currentIndex = [ a, u, i ] : "time" == d.mode && (c.currentIndex = [ m, s ]);
            }
        }, j = function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500, t = null;
            return function() {
                for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++) o[a] = arguments[a];
                t && clearTimeout(t), t = setTimeout(function() {
                    return e.apply(void 0, o);
                }, n);
            };
        }(function(e) {
            var n = e.detail.value;
            c.currentIndex = n, [ "dateTime", "date" ].includes(d.mode) && x(c.years[n[0]].id, c.months[n[1]].id), 
            k(!1);
        }), k = function() {
            var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t = c.currentIndex, r = t[2] > c.days.length - 1 ? c.days.length - 1 : t[2], o = w(Date.now()), a = {};
            "dateTime" == d.mode ? a = {
                year: c.years[t[0]].id,
                month: c.months[t[1]].id,
                day: c.days[r].id,
                hour: c.hour[t[3]].id
            } : "date" == d.mode ? a = {
                year: c.years[t[0]].id,
                month: c.months[t[1]].id,
                day: c.days[r].id,
                hour: o[3],
                minute: o[4]
            } : "year-month" == d.mode ? a = {
                year: c.years[t[0]].id,
                month: c.months[t[1]].id,
                day: o[2],
                hour: o[3],
                minute: o[4]
            } : "time" == d.mode && (a = {
                year: o[0],
                month: o[1],
                day: o[2],
                hour: c.hour[t[0]].id,
                minute: c.minute[t[1]].id
            }), e && p(), i("select", n(n({}, a), {}, {
                type: s.current
            }));
        }, q = function(e) {
            return {
                1: "正月",
                2: "二月",
                3: "三月",
                4: "四月",
                5: "五月",
                6: "六月",
                7: "七月",
                8: "八月",
                9: "九月",
                10: "十月",
                11: "冬月",
                12: "腊月"
            }[e] || "无效月份";
        }, _ = function(e) {
            return e < 1 || e > 30 ? "无效日期" : [ "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十", "三十一" ][e - 1];
        };
        return u({
            open: function() {
                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                s.current = n;
                var o = -1 != (r = r.replace(/-/g, "/")).indexOf("/未知");
                o && (r = r.replace("/未知", ""));
                var a = w(r || Date.now());
                o && (a[3] = "未知"), A.apply(void 0, e(a)), t.nextTick$1(m.value.open);
            },
            close: p
        }), function(e, n) {
            return t.e({
                a: t.t(o.title),
                b: c.open
            }, c.open ? {
                c: t.o(l),
                d: t.p({
                    activeColor: "#F3D49B",
                    "bg-color": "#fff",
                    bold: !0,
                    fontSize: "28rpx",
                    "custom-style": "height: 60rpx;border-radius: 30rpx;border:1px solid #0E0F08;",
                    "custom-item-style": "border-radius: 30rpx;background:#0E0F08;",
                    list: s.list,
                    current: s.current
                })
            } : {}, {
                e: c.open
            }, c.open ? t.e({
                f: [ "dateTime", "date", "year-month" ].includes(o.mode)
            }, [ "dateTime", "date", "year-month" ].includes(o.mode) ? {
                g: t.f(c.years, function(e, n, r) {
                    return {
                        a: t.t(D("year", e.name)),
                        b: n
                    };
                })
            } : {}, {
                h: [ "dateTime", "date", "year-month" ].includes(o.mode)
            }, [ "dateTime", "date", "year-month" ].includes(o.mode) ? {
                i: t.f(c.months, function(e, n, r) {
                    return {
                        a: t.t(D("month", e.name)),
                        b: n
                    };
                })
            } : {}, {
                j: [ "dateTime", "date" ].includes(o.mode)
            }, [ "dateTime", "date" ].includes(o.mode) ? {
                k: t.f(c.days, function(e, n, r) {
                    return {
                        a: t.t(D("day", e.name)),
                        b: n
                    };
                })
            } : {}, {
                l: [ "dateTime", "time" ].includes(o.mode)
            }, [ "dateTime", "time" ].includes(o.mode) ? {
                m: t.f(c.hour, function(e, n, r) {
                    return {
                        a: t.t(D("hour", e.name)),
                        b: n
                    };
                })
            } : {}, {
                n: [ "time" ].includes(o.mode)
            }, [ "time" ].includes(o.mode) ? {
                o: t.f(c.minute, function(e, n, r) {
                    return {
                        a: t.t(D("minute", e.name)),
                        b: n
                    };
                })
            } : {}, {
                p: c.currentIndex,
                q: t.o(function() {
                    return t.unref(j) && t.unref(j).apply(void 0, arguments);
                })
            }) : {}, {
                r: t.o(k),
                s: t.sr(m, "c8f83219-0", {
                    k: "refPopup"
                }),
                t: t.o(f),
                v: t.p({
                    duration: 150,
                    mode: "bottom",
                    round: "30rpx",
                    "z-index": "1999",
                    safeAreaInsetBottom: o.safeAreaInsetBottom
                })
            });
        };
    }
}, a = t._export_sfc(o, [ [ "__scopeId", "data-v-c8f83219" ] ]);

wx.createComponent(a);