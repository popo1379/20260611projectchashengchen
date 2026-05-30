var e = require("../../common/vendor.js");

require("../../config/router/index.js"), require("../../api/index.js");

var a = require("../../lunar/index.js");

Array || e.resolveComponent("uv-navbar")(), Math || (function() {
    return "../../node-modules/@climblee/uv-ui/components/uv-navbar/uv-navbar.js";
} + r)();

var r = function() {
    return "../../components/date-tabs.js";
}, n = {
    __name: "calendar",
    setup: function(r) {
        var n = e.ref({}), t = e.ref({}), u = e.ref({}), o = e.ref(a.lunar.getFestival()), l = e.reactive({
            curHour: "",
            hours: [],
            recommends: [],
            avoids: []
        }), v = function(e) {
            var r = new a.lunar.LunarInfo(e.year, e.month, e.day);
            r.lunarFestival && (r.lunarFestival = r.lunarFestival.replace("方", "")), t.value = r;
            var o = new Date().getHours(), v = a.lunar.getEightChar(r.year, r.month, r.day, o);
            u.value = v;
            var i = a.lunar.getLunarHourYiJi(e.year, e.month, e.day, o);
            l.hours = i.hours.slice(0, 12);
            var s = i.curHour();
            l.curHour = s;
            var c = i.hours.find(function(e) {
                return e.name == s;
            });
            c || (l.curHour = i.hours[6].name, s = i.hours[6].name, c = i.hours.find(function(e) {
                return e.name == s;
            })), l.recommends = c ? c.recommends : [], l.avoids = c ? c.avoids : [], n.value.year = e.year, 
            n.value.month = e.month, n.value.day = e.day, n.value.zodiac = a.lunar.getZodiac(r.year), 
            n.value.constellation = a.lunar.getConstellation(e.year, e.month, e.day);
        }, i = e.ref(Date.now()), s = new Date(), c = function() {
            return n.value.year == s.getFullYear() && n.value.month == s.getMonth() + 1 && n.value.day == s.getDate();
        };
        return function(a, r) {
            return e.e({
                a: e.p({
                    fixed: !1,
                    leftText: "",
                    leftIcon: "",
                    "bg-color": "transparent",
                    title: "中华万年历"
                }),
                b: e.t(n.value.year),
                c: e.t(n.value.month),
                d: e.t(n.value.day < 10 ? "0" + n.value.day : n.value.day),
                e: e.t(t.value.lunarFestival || t.value.solarFestival || t.value.solarTerms || "周".concat(t.value.week)),
                f: e.t(t.value.yearName),
                g: e.t(n.value.zodiac),
                h: e.t(n.value.constellation),
                i: e.t(t.value.monthName),
                j: e.t(t.value.dayName),
                k: e.t(t.value.season),
                l: !c()
            }, c() ? {} : {
                m: e.o(function(e) {
                    return i.value = Date.now();
                })
            }, {
                n: e.o(v),
                o: e.p({
                    checkedDay: i.value
                }),
                p: e.f(o.value, function(a, r, n) {
                    return {
                        a: e.t(a.name),
                        b: e.t(a.month),
                        c: e.t(a.day),
                        d: e.t(a.dayNum),
                        e: r
                    };
                })
            });
        };
    }
}, t = e._export_sfc(n, [ [ "__scopeId", "data-v-aea32c90" ] ]);

wx.createPage(t);