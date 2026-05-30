var e = require("../@babel/runtime/helpers/toConsumableArray"), t = require("../@babel/runtime/helpers/defineProperty"), n = require("../@babel/runtime/helpers/typeof"), r = require("../common/vendor.js"), a = require("../lunar/index.js"), o = {
    __name: "date-tabs",
    props: {
        checkedDay: {
            default: Date.now()
        },
        mode: {
            default: "month"
        },
        immediate: {
            default: !0
        },
        formatDay: {
            default: void 0,
            type: Function
        }
    },
    emits: [ "select" ],
    setup: function(o, i) {
        var c = i.emit, s = [ "一", "二", "三", "四", "五", "六", "日" ], h = c, u = o, f = r.reactive({
            currentItem: 1,
            checkedDay: u.checkedDay,
            checkedDayInfo: {},
            curYear: "",
            curMonth: "",
            mode: u.mode,
            monthList: [],
            weekList: []
        });
        r.watch(function() {
            return u.mode;
        }, function() {
            f.mode = u.mode;
        }), r.watch(function() {
            return u.checkedDay;
        }, function() {
            f.checkedDay = u.checkedDay;
            var e = new Date(f.checkedDay);
            x({
                year: e.getFullYear(),
                month: e.getMonth() + 1,
                day: e.getDate()
            }), f.currentItem = 1;
        });
        var d = r.computed(function() {
            return "month" == f.mode ? f.monthList : f.weekList;
        }), y = function(e) {
            var t = e.detail, n = d.value[t.current];
            f.currentItem = t.current, f.curYear = n.year, f.curMonth = n.month;
            var r = M(n.year, n.month), a = C(n.year, n.month, n.firstDay);
            0 == t.current ? (f.monthList = [ r.curMonth, r.nextMonth, r.prevMonth ], f.weekList = [ a.curWeek, a.nextWeek, a.prevWeek ]) : 1 == t.current ? (f.monthList = [ r.prevMonth, r.curMonth, r.nextMonth ], 
            f.weekList = [ a.prevWeek, a.curWeek, a.nextWeek ]) : 2 == t.current && (f.monthList = [ r.nextMonth, r.prevMonth, r.curMonth ], 
            f.weekList = [ a.nextWeek, a.prevWeek, a.curWeek ]);
            var o = new Date(f.curYear, f.curMonth, 1), i = new Date(o.getTime() - 1), c = new Date(f.checkedDay).getDate();
            c > i.getDate() && (c = i.getDate());
            var s = new Date();
            f.curYear == s.getFullYear() && f.curMonth == s.getMonth() + 1 && (c = s.getDate()), 
            f.checkedDay = new Date(f.curYear, f.curMonth - 1, c).getTime();
        }, l = function(e) {
            var t = new Date(f.checkedDay), n = e.year == t.getFullYear(), r = e.month == t.getMonth() + 1, a = e.day == t.getDate(), o = n && r && a && !e.prevMonth && !e.nextMonth;
            return o && (f.checkedDayInfo = e, u.immediate && h("select", e)), o;
        }, m = function(e) {
            switch (n(e)) {
              case "undefined":
                return !1;

              case "string":
                if (0 == e.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length) return !1;
            }
            return !0;
        }, g = function(e) {
            var t = new a.lunar.LunarDays(e.year, e.month, e.day);
            return e.isWork = t.isWork, e.job = t.job, e.lunarFestival = t.lunarFestival, e.solarFestival = t.solarFestival, 
            e.solarTerms = t.solarTerms, e.tagConfig.text = e.lunarFestival || e.solarFestival || e.solarTerms || t.dayName, 
            (e.lunarFestival || e.solarFestival || e.solarTerms) && (e.dayConfig.defaultStyles = {
                color: "#f3d49b"
            }, e.tagConfig.styles = {
                color: "#f3d49b"
            }), 0 == e.week && (e.markConfig.show = !0, e.markConfig.text = "休", e.markConfig.styles.color = "#f3d49b", 
            e.dayConfig.defaultStyles = {
                color: "#f3d49b"
            }, e.tagConfig.styles = {
                color: "#f3d49b"
            }), !e.toDay || e.prevMonth || e.nextMonth || (e.dayConfig.defaultStyles.background = "rgba(243, 212, 155, 0.3)", 
            e.markConfig.show = !0, e.markConfig.text = "今"), e.isWork || (e.markConfig.show = !0, 
            e.markConfig.text = "休", e.markConfig.styles.color = "#f3d49b", e.dayConfig.defaultStyles = {
                color: "#f3d49b"
            }, e.tagConfig.styles = {
                color: "#f3d49b"
            }), e.job && (e.markConfig.show = !0, e.markConfig.text = "班", e.markConfig.styles.color = "#212121", 
            e.dayConfig.defaultStyles = {
                color: "#212121"
            }, e.tagConfig.styles = {
                color: "#212121"
            }), (e.prevMonth || e.nextMonth) && (e.dayConfig.defaultStyles.opacity = .3), u.formatDay && "function" == typeof u.formatDay && u.formatDay(e) || e;
        };
        function k(e, t, n) {
            var r = new Date(), a = new Date(r.getFullYear(), r.getMonth(), r.getDate());
            m(e) && m(t) && m(t) && (a = new Date(e, t - 1, n)), this.year = a.getFullYear(), 
            this.month = a.getMonth() + 1, this.day = a.getDate(), this.week = a.getDay(), this.timestamp = a.getTime(), 
            this.weekText = [ "日", "一", "二", "三", "四", "五", "六" ][r.getDay()], this.date = "".concat(this.year, "/").concat(this.month, "/").concat(this.day);
        }
        var v = new k();
        function w(e, n, r) {
            var a, o = new k(e, n, r);
            for (var i in o) this[i] = o[i];
            this.toDay = !1;
            var c = this.year == v.year, s = this.month == v.month, h = this.day == v.day;
            c && s && h && (this.toDay = !0), this.dayConfig = {
                select: !0,
                text: this.day,
                defaultStyles: {},
                checkedStyles: (a = {
                    background: "#f3d49b",
                    color: "#f3d49b"
                }, t(a, "background", "rgba(243, 212, 155, 0.2)"), t(a, "border", "1px solid #f3d49b"), 
                a)
            }, this.tagConfig = {
                show: !0,
                text: "初一",
                styles: {
                    color: "#A3A3A3"
                },
                checkedStyles: {
                    color: "#f3d49b"
                }
            }, this.markConfig = {
                show: !1,
                text: "",
                styles: {
                    color: "#f3d49b"
                },
                checkedStyles: {
                    color: "#f3d49b"
                }
            };
        }
        var D = function(e, t) {
            for (var n = new Date(e, t, 0), r = n.getDate(), a = [], o = 1; o <= r; o++) {
                var i = new w(e, t, o);
                a.push(g(i));
            }
            for (var c = a[0], s = 0 == c.week ? 7 : c.week, h = 1; h <= s - 1; h++) {
                var u = new w(e, t, c.day - h);
                u.prevMonth = !0, a.unshift(g(u));
            }
            for (var f = a[a.length - 1], d = 42 - a.length, y = 1; y <= d; y++) {
                var l = new w(e, t, f.day + y);
                l.nextMonth = !0, a.push(g(l));
            }
            return {
                year: n.getFullYear(),
                month: n.getMonth() + 1,
                firstDay: c.day,
                dayList: a
            };
        }, M = function(e, t) {
            return {
                prevMonth: D(e, t - 1),
                curMonth: D(e, t),
                nextMonth: D(e, t + 1)
            };
        }, p = function(e, t, n) {
            var r = new k(e, t, n), a = 0 == r.week ? 7 : r.week, o = new Date(r.date);
            o.setDate(o.getDate() - (a - 1));
            for (var i = [], c = 0; c < 7; c++) {
                var s = new w(o.getFullYear(), o.getMonth() + 1, o.getDate() + c);
                s.year == r.year ? (s.prevMonth = s.month < r.month, s.nextMonth = s.month > r.month) : (s.prevMonth = s.year < r.year, 
                s.nextMonth = s.year > r.year), i.push(g(s));
            }
            return {
                year: r.year,
                month: r.month,
                firstDay: r.day,
                dayList: i
            };
        }, C = function(t, n, r) {
            var a = p(t, n, r), o = a.dayList.find(function(e) {
                return !e.prevMonth && !e.nextMonth;
            }), i = p(t, n, o.day - 1), c = e(a.dayList).reverse().find(function(e) {
                return !e.prevMonth && !e.nextMonth;
            });
            return {
                curWeek: a,
                prevWeek: i,
                nextWeek: p(t, n, c.day + 1)
            };
        }, x = function(e) {
            var t = M(e.year, e.month);
            f.monthList = [ t.prevMonth, t.curMonth, t.nextMonth ];
            var n = C(e.year, e.month, e.day);
            f.weekList = [ n.prevWeek, n.curWeek, n.nextWeek ], f.curYear = e.year, f.curMonth = e.month;
        };
        return x(v), function(e, t) {
            return {
                a: r.f(s, function(e, t, n) {
                    return {
                        a: r.t(e),
                        b: t > 5 ? 1 : "",
                        c: t
                    };
                }),
                b: r.f(d.value, function(e, t, n) {
                    return {
                        a: r.f(e.dayList, function(e, t, n) {
                            return r.e({
                                a: r.t(e.dayConfig.text),
                                b: e.tagConfig.show
                            }, e.tagConfig.show ? {
                                c: r.t(e.tagConfig.text),
                                d: r.s(l(e) ? e.tagConfig.checkedStyles : e.tagConfig.styles)
                            } : {}, {
                                e: e.markConfig.show
                            }, e.markConfig.show ? {
                                f: r.t(e.markConfig.text),
                                g: r.s(l(e) ? e.markConfig.checkedStyles : e.markConfig.styles)
                            } : {}, {
                                h: r.o(function(t) {
                                    return function(e) {
                                        if (!e.prevMonth && !e.nextMonth && e.dayConfig.select && (f.checkedDay = e.date, 
                                        f.checkedDayInfo = e, h("select", e), "month" == f.mode)) {
                                            var t = C(e.year, e.month, e.day);
                                            0 == f.currentItem ? f.weekList = [ t.curWeek, t.nextWeek, t.prevWeek ] : 1 == f.currentItem ? f.weekList = [ t.prevWeek, t.curWeek, t.nextWeek ] : 2 == f.currentItem && (f.weekList = [ t.nextWeek, t.prevWeek, t.curWeek ]);
                                        }
                                    }(e);
                                }, t),
                                i: t,
                                j: r.s(e.dayConfig.defaultStyles),
                                k: r.s(l(e) ? e.dayConfig.checkedStyles : "")
                            });
                        }),
                        b: t
                    };
                }),
                c: r.o(y),
                d: f.currentItem,
                e: "week" == f.mode ? 1 : ""
            };
        };
    }
}, i = r._export_sfc(o, [ [ "__scopeId", "data-v-d45b5536" ] ]);

wx.createComponent(i);