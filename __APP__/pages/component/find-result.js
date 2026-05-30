require("../../@babel/runtime/helpers/Objectentries"), require("../../@babel/runtime/helpers/Objectvalues");

var a = require("../../@babel/runtime/helpers/toConsumableArray"), n = require("../../@babel/runtime/helpers/slicedToArray"), e = require("../../common/vendor.js");

require("../../config/router/index.js");

var r = require("../../lunar/index.js"), t = require("../../pinia/system.js");

Math || i();

var i = function() {
    return "./footer-button.js";
}, o = {
    __name: "find-result",
    props: {
        birthday: {
            default: ""
        },
        calendar: {
            default: ""
        }
    },
    setup: function(i) {
        var o = t.useSystemStore();
        o.getSystemConfig();
        var u = i, h = e.reactive({
            lunarBirthday: {
                year: "",
                month: "",
                day: "",
                hour: "",
                value: ""
            },
            solarBirthday: {
                year: "",
                month: "",
                day: "",
                hour: ""
            },
            zodiac: "",
            constellation: "",
            arrowDownOpen: !1
        }), y = e.reactive({
            year: {},
            month: {},
            day: {},
            hour: {},
            ownSign: {},
            bodySign: {},
            fetalOrigin: {},
            detalBreath: {},
            xiyongWuxing: {},
            wuxingRatio: [],
            wuxingRemark: ""
        }), m = e.ref({}), c = function() {
            var e = u.birthday.split("-"), t = n(e, 4), i = t[0], o = t[1], c = t[2], d = t[3], l = "未知" == (d = d && decodeURI(d)) ? 12 : d || 12;
            if (u.birthday || (i = 2006, o = "06", c = "06", d = 12, u.calendar = 0), 1 == u.calendar) {
                h.solarBirthday = {
                    year: i,
                    month: o,
                    day: c,
                    hour: d
                };
                var g = new r.lunar.LunarDays(i, o, c, l);
                h.lunarBirthday = {
                    year: g.year,
                    month: g.month,
                    day: g.day,
                    hour: d,
                    value: "".concat(g.year, "年").concat(g.monthName).concat(g.dayName, " ").concat("未知" == d ? "未知点" : g.hourName)
                };
            } else {
                var x = r.lunar.getLunarDays(i, o, c, l);
                h.lunarBirthday = {
                    year: x.year,
                    month: x.month,
                    day: x.day,
                    hour: d,
                    value: "".concat(x.year, "年").concat(x.monthName).concat(x.dayName, " ").concat("未知" == d ? "未知点" : x.hourName)
                };
                var s = r.lunar.solarDay(i, o, c);
                h.solarBirthday = {
                    year: s.year,
                    month: s.month,
                    day: s.day,
                    hour: d
                };
            }
            h.constellation = r.lunar.getConstellation(h.solarBirthday.year, h.solarBirthday.month, h.solarBirthday.day), 
            h.zodiac = r.lunar.getZodiac(h.lunarBirthday.year);
            var v = r.lunar.bazi(h.lunarBirthday.year, h.lunarBirthday.month, h.lunarBirthday.day, l);
            y.year = v.year, y.month = v.month, y.day = v.day, y.hour = v.hour, y.ownSign = v.ownSign, 
            y.bodySign = v.bodySign, y.fetalOrigin = v.fetalOrigin, y.detalBreath = v.detalBreath, 
            y.xiyongWuxing = v.xiyongWuxing;
            var w = Math.max.apply(Math, a(Object.values(v.xiyongWuxing.wuxingRatio)));
            w += 1, y.wuxingRatio = [ v.xiyongWuxing.wuxingRatio["木"] / w * 100, v.xiyongWuxing.wuxingRatio["火"] / w * 100, v.xiyongWuxing.wuxingRatio["土"] / w * 100, v.xiyongWuxing.wuxingRatio["金"] / w * 100, v.xiyongWuxing.wuxingRatio["水"] / w * 100 ];
            var f = Object.entries(v.xiyongWuxing.wuxingRatio);
            y.wuxingRemark = "";
            for (var B = 0, b = f; B < b.length; B++) {
                var S = b[B];
                S[1] <= 0 && (y.wuxingRemark = y.wuxingRemark ? "".concat(y.wuxingRemark, "，").concat(S[0]) : S[0]);
            }
            y.wuxingRemark ? y.wuxingRemark = "五行缺".concat(y.wuxingRemark) : y.wuxingRemark = "五行俱全", 
            m.value = new r.lunar.LunarInfo(i, o, c);
        };
        e.watch(function() {
            return u.birthday;
        }, c, {
            immediate: !0
        }), e.watch(function() {
            return u.calendar;
        }, c, {
            immediate: !0
        });
        var d = function(a) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return {
                "金": n + "jin",
                "木": n + "mu",
                "水": n + "shui",
                "火": n + "huo",
                "土": n + "tu"
            }[a];
        };
        return function(a, n) {
            return e.e({
                a: y.year.heavenStem
            }, y.year.heavenStem ? e.e({
                b: e.t(h.lunarBirthday.value),
                c: e.t((r = h.solarBirthday, "".concat(r.year, "年").concat(r.month, "月").concat(r.day, "日 ").concat(r.hourName ? r.hourName : "".concat(r.hour, "点")))),
                d: e.t(h.zodiac),
                e: e.t(h.constellation),
                f: e.t(y.year.heavenStem.name),
                g: e.n(d(y.year.heavenStem.wuxing, "ui-")),
                h: e.t(y.year.earthBranch.name),
                i: e.n(d(y.year.earthBranch.wuxing, "ui-")),
                j: e.t(y.month.heavenStem.name),
                k: e.n(d(y.month.heavenStem.wuxing, "ui-")),
                l: e.t(y.month.earthBranch.name),
                m: e.n(d(y.month.earthBranch.wuxing, "ui-")),
                n: e.t(y.day.heavenStem.name),
                o: e.n(d(y.day.heavenStem.wuxing, "ui-")),
                p: e.t(y.day.earthBranch.name),
                q: e.n(d(y.day.earthBranch.wuxing, "ui-")),
                r: e.t(y.hour.heavenStem.name),
                s: e.n(d(y.hour.heavenStem.wuxing, "ui-")),
                t: e.t(y.hour.earthBranch.name),
                v: e.n(d(y.hour.earthBranch.wuxing, "ui-")),
                w: e.unref(o).open
            }, e.unref(o).open ? {
                x: e.t(y.day.heavenStem.wuxing),
                y: e.n(d(y.day.heavenStem.wuxing, "ui-"))
            } : {}, {
                z: e.unref(o).open
            }, e.unref(o).open ? {
                A: e.t(y.wuxingRemark)
            } : {}) : {});
            var r;
        };
    }
}, u = e._export_sfc(o, [ [ "__scopeId", "data-v-13c364a5" ] ]);

wx.createComponent(u);