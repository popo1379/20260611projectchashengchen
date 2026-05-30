var e = require("../../common/vendor.js");

require("../../config/router/index.js"), require("../../api/index.js");

var a = require("../../lunar/index.js");

Array || e.resolveComponent("uv-navbar")(), Math || (function() {
    return "../../node-modules/@climblee/uv-ui/components/uv-navbar/uv-navbar.js";
} + n)();

var n = function() {
    return "../../components/date-tabs.js";
}, r = {
    __name: "almanac",
    setup: function(n) {
        var r = e.ref({}), u = e.ref({}), t = e.ref({});
        e.ref(a.lunar.getFestival());
        var v = e.reactive({
            curHour: "",
            hours: [],
            recommends: [],
            avoids: []
        }), o = function(e) {
            var n = new a.lunar.LunarInfo(e.year, e.month, e.day);
            n.lunarFestival && (n.lunarFestival = n.lunarFestival.replace("方", "")), u.value = n;
            var o = new Date().getHours(), l = a.lunar.getEightChar(n.year, n.month, n.day, o);
            t.value = l;
            var i = a.lunar.getLunarHourYiJi(e.year, e.month, e.day, o);
            v.hours = i.hours.slice(0, 12);
            var m = i.curHour();
            v.curHour = m;
            var s = i.hours.find(function(e) {
                return e.name == m;
            });
            s || (v.curHour = i.hours[6].name, m = i.hours[6].name, s = i.hours.find(function(e) {
                return e.name == m;
            })), v.recommends = s ? s.recommends : [], v.avoids = s ? s.avoids : [], r.value.year = e.year, 
            r.value.month = e.month, r.value.day = e.day, r.value.zodiac = a.lunar.getZodiac(n.year), 
            r.value.constellation = a.lunar.getConstellation(e.year, e.month, e.day);
        }, l = function(e) {
            return {
                "金": "ui-jin",
                "木": "ui-mu",
                "水": "ui-shui",
                "火": "ui-huo",
                "土": "ui-tu"
            }[e];
        }, i = e.ref(Date.now());
        return function(a, n) {
            return e.e({
                a: e.p({
                    fixed: !1,
                    leftText: "",
                    leftIcon: "",
                    "bg-color": "transparent",
                    title: "华夏 · 老黄历"
                }),
                b: e.o(o),
                c: e.p({
                    checkedDay: i.value,
                    mode: "week"
                }),
                d: e.t(u.value.monthName),
                e: e.t(u.value.dayName),
                f: e.t(u.value.season),
                g: e.t(u.value.yearName),
                h: e.t(r.value.zodiac),
                i: e.t(r.value.constellation),
                j: e.t(r.value.month),
                k: e.t(r.value.day < 10 ? "0" + r.value.day : r.value.day),
                l: e.t(u.value.lunarFestival || u.value.solarFestival || u.value.solarTerms || "周".concat(u.value.week)),
                m: t.value.year
            }, t.value.year ? {
                n: e.t(t.value.year.heavenStem.name),
                o: e.n(l(t.value.year.heavenStem.wuxing)),
                p: e.t(t.value.year.earthBranch.name),
                q: e.n(l(t.value.year.earthBranch.wuxing)),
                r: e.t(t.value.month.heavenStem.name),
                s: e.n(l(t.value.month.heavenStem.wuxing)),
                t: e.t(t.value.month.earthBranch.name),
                v: e.n(l(t.value.month.earthBranch.wuxing)),
                w: e.t(t.value.day.heavenStem.name),
                x: e.n(l(t.value.day.heavenStem.wuxing)),
                y: e.t(t.value.day.earthBranch.name),
                z: e.n(l(t.value.day.earthBranch.wuxing)),
                A: e.t(t.value.hour.heavenStem.name),
                B: e.n(l(t.value.hour.heavenStem.wuxing)),
                C: e.t(t.value.hour.earthBranch.name),
                D: e.n(l(t.value.hour.earthBranch.wuxing))
            } : {}, {
                E: u.value.recommends && u.value.recommends[0]
            }, u.value.recommends && u.value.recommends[0] ? {
                F: e.f(u.value.recommends, function(a, n, r) {
                    return {
                        a: e.t(a),
                        b: n
                    };
                })
            } : {}, {
                G: u.value.avoids && u.value.avoids[0]
            }, u.value.avoids && u.value.avoids[0] ? {
                H: e.f(u.value.avoids, function(a, n, r) {
                    return {
                        a: e.t(a),
                        b: n
                    };
                })
            } : {}, {
                I: u.value.twelveStar && !1
            }, (u.value.twelveStar, {}), {});
        };
    }
}, u = e._export_sfc(r, [ [ "__scopeId", "data-v-286e3247" ] ]);

wx.createPage(u);