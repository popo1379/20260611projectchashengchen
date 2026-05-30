var e = require("../@babel/runtime/helpers/objectSpread2");

require("../@babel/runtime/helpers/Objectentries");

var a = require("../@babel/runtime/helpers/slicedToArray"), t = require("../@babel/runtime/helpers/createForOfIteratorHelper"), r = require("../common/vendor.js"), n = require("./data.js"), m = function(e, a, t) {
    var n = r.SolarDay.fromYmd(Number(e), Number(a), Number(t)).getTermDay();
    return 0 == n.dayIndex ? n.getName() : null;
}, o = function(e, a, t) {
    var n = r.SolarDay.fromYmd(Number(e), Number(a), Number(t)).getLunarDay();
    return n.getFestival() ? n.getFestival().name : null;
}, i = function(e, a, t) {
    var n = r.SolarDay.fromYmd(Number(e), Number(a), Number(t)), m = [ [ "愚人节", 4, 1 ], [ "平安夜", 12, 24 ], [ "圣诞节", 12, 25 ], [ "万圣节", 11, 1 ] ].find(function(e) {
        return e[1] == a && e[2] == t;
    });
    m && (m = m[0]);
    var o = n.getFestival() ? n.getFestival().name : m || null;
    if (o) for (var i = 0, h = [ "三八", "五一", "五四", "六一", "八一" ]; i < h.length; i++) {
        var u = h[i];
        o = o.replace(u, "");
    }
    return o;
}, h = function(e, a, t) {
    var n = r.LegalHoliday.fromYmd(Number(e), Number(a), Number(t));
    return !n || !!n.work;
}, u = function(e, a, t) {
    var n = r.LunarDay.fromYmd(Number(e), Number(a), Number(t)).getSolarDay(), m = n.getSolarMonth();
    return {
        year: m.getSolarYear().year,
        month: m.month,
        day: n.getDay()
    };
};

function g(e, a, t) {
    var n, u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, g = r.SolarTime.fromYmdHms(Number(e), Number(a), Number(t), Number(u), 0, 0).getLunarHour();
    this.hourName = g.getName();
    var c = g.getLunarDay();
    this.dayName = c.getName();
    var s = c.getLunarMonth();
    this.monthName = s.getName(), this.yearName = s.getLunarYear().getName(), this.yearName = this.yearName.replace("农历", ""), 
    this.season = s.getSeason().getName(), this.year = g.getYear(), this.month = g.getMonth(), 
    this.day = g.getDay(), this.hour = g.getHour(), this.week = c.getWeek().getName(), 
    this.solarTerms = m(e, a, t), this.lunarFestival = o(e, a, t), this.solarFestival = i(e, a, t), 
    this.isWork = h(e, a, t), this.job = (null == (n = r.LegalHoliday.fromYmd(Number(e), Number(a), Number(t))) ? void 0 : n.isWork()) || !1;
}

var c = function(e, a, t) {
    try {
        return r.LunarDay.fromYmd(e, a, t), t;
    } catch (e) {
        return null;
    }
};

function s(e, a, n, m) {
    var o = new g(e, a, n);
    Object.assign(this, o);
    var i = r.SolarDay.fromYmd(Number(e), Number(a), Number(n)).getLunarDay();
    this.recommends = [], this.avoids = [];
    var h, u = t(i.getRecommends());
    try {
        for (u.s(); !(h = u.n()).done; ) {
            var c = h.value;
            this.recommends.push(c.getName());
        }
    } catch (e) {
        u.e(e);
    } finally {
        u.f();
    }
    var s, v = t(i.getAvoids());
    try {
        for (v.s(); !(s = v.n()).done; ) {
            var y = s.value;
            this.avoids.push(y.getName());
        }
    } catch (e) {
        v.e(e);
    } finally {
        v.f();
    }
    this.sixStar = i.getSixStar().getName(), this.sevenStar = i.getTwentyEightStar().getSevenStar().getName(), 
    this.phase = i.getPhase().getName(), this.duty = i.getDuty().getName();
    var f = i.getTwelveStar();
    this.twelveStar = [ f.getName(), f.getEcliptic().getName(), f.getEcliptic().getLuck().getName() ];
    var N = i.getTwentyEightStar();
    if (this.twentyEightStar = [ N.getName(), N.getSevenStar().getName(), N.getAnimal().getName(), N.getLuck().getName() ], 
    !m) {
        this.fetusDay = i.getFetusDay().getName().split(" ");
        var S = i.getNineStar();
        this.nineStar = [ S.getDipper().getName(), S.getElement().getName(), S.getDirection().getName() ], 
        r.LunarHour.provider = new r.LunarSect2EightCharProvider();
        var d = r.LunarHour.fromYmdHms(o.year, o.month, o.day, 0, 0, 0).getEightChar().day.getName();
        this.sound = r.SixtyCycle.fromName(d).getSound().getName();
        var l = r.EarthBranch.fromName(d.split("")[1]);
        this.zodiac = l.getOpposite().getZodiac().getName(), this.ominous = l.getOminous().getName();
        var H = r.SixtyCycle.fromName(d).getPengZu();
        this.pengZu = [ H.pengZuHeavenStem.getName(), H.pengZuEarthBranch.getName() ];
        var b = r.HeavenStem.fromName(d.split("")[0]);
        this.joyDirection = b.getJoyDirection().getName(), this.yangDirection = b.getYangDirection().getName(), 
        this.wealthDirection = b.getWealthDirection().getName(), this.mascotDirection = b.getMascotDirection().getName();
        var B = i.getGods();
        this.shen = [], this.sha = [];
        var x, D = t(B);
        try {
            for (D.s(); !(x = D.n()).done; ) {
                var p = x.value;
                "吉" == p.getLuck().getName() ? this.shen.push(p.getName()) : this.sha.push(p.getName());
            }
        } catch (e) {
            D.e(e);
        } finally {
            D.f();
        }
    }
}

var v = function(e) {
    var t = e.split(""), n = a(t, 2), m = n[0], o = n[1], i = r.HeavenStem.fromName(m), h = r.EarthBranch.fromName(o);
    return {
        name: e,
        heavenStem: {
            name: m,
            wuxing: i.getElement().getName(),
            yinyang: 0 == i.getYinYang() ? "阴" : "阳"
        },
        earthBranch: {
            name: o,
            wuxing: h.getElement().getName(),
            yinyang: 0 == h.getYinYang() ? "阴" : "阳"
        }
    };
}, y = function(e, a) {
    return r.EarthBranch.fromName(e).getHideHeavenStems().map(function(e) {
        var t = e.getName(), n = r.HeavenStem.fromName(t);
        return {
            name: t,
            wuxing: n.getElement().getName(),
            yinyang: 0 == n.getYinYang() ? "阴" : "阳",
            owner: a && r.HeavenStem.fromName(a).getTenStar(n).getName()
        };
    });
};

function f(e, a, t, n) {
    r.LunarHour.provider = new r.LunarSect2EightCharProvider();
    var m = r.LunarHour.fromYmdHms(Number(e), Number(a), Number(t), Number(n), 0, 0).getEightChar();
    return {
        year: v(m.year.getName()),
        month: v(m.month.getName()),
        day: v(m.day.getName()),
        hour: v(m.hour.getName())
    };
}

var N = function(e) {
    var a = r.SixtyCycle.fromName(e).getExtraEarthBranches();
    return [ a[0].getName(), a[1].getName() ].join("");
}, S = function(e) {
    return r.SixtyCycle.fromName(e).getSound().getName();
}, d = function(e, a) {
    var t = "/";
    return (t = n.eightCharLiuHe.find(function(t) {
        return t[0] == "".concat(e).concat(a) || t[0] == "".concat(a).concat(e);
    })) ? t[1] : (t = n.eightCharBanHe.find(function(t) {
        return t[0] == "".concat(e).concat(a) || t[0] == "".concat(a).concat(e);
    })) ? t[1] : (t = n.eightCharGonHe.find(function(t) {
        return t[0] == "".concat(e).concat(a) || t[0] == "".concat(a).concat(e);
    })) ? t[1] : (t = n.eightCharHai.find(function(t) {
        return t[0] == "".concat(e).concat(a) || t[0] == "".concat(a).concat(e);
    })) ? t[1] : (t = n.eightCharPo.find(function(t) {
        return t[0] == "".concat(e).concat(a) || t[0] == "".concat(a).concat(e);
    })) ? t[1] : (t = n.eightCharXing.find(function(t) {
        return t[0] == "".concat(e).concat(a) || t[0] == "".concat(a).concat(e);
    })) ? t[1] : (t = n.eightCharHai.find(function(t) {
        return t[0] == "".concat(e).concat(a) || t[0] == "".concat(a).concat(e);
    })) ? t[1] : "/";
}, l = {
    bazi: function(e, m, o, i) {
        var h = f(e, m, o, i), u = new r.EightChar(h.year.name, h.year.name, h.year.name, h.year.name), g = r.HeavenStem.fromName(h.day.heavenStem.name);
        h.ownSign = v(u.getOwnSign().getName()), h.ownSign.hideHeavenStems = y(h.ownSign.earthBranch.name, h.ownSign.heavenStem.name), 
        h.ownSign.heavenStemTenStar = g.getTenStar(r.HeavenStem.fromName(h.ownSign.heavenStem.name)).getName(), 
        h.bodySign = v(u.getBodySign().getName()), h.bodySign.hideHeavenStems = y(h.bodySign.earthBranch.name, h.bodySign.heavenStem.name), 
        h.bodySign.heavenStemTenStar = g.getTenStar(r.HeavenStem.fromName(h.bodySign.heavenStem.name)).getName(), 
        h.fetalOrigin = v(u.getFetalOrigin().getName()), h.fetalOrigin.hideHeavenStems = y(h.fetalOrigin.earthBranch.name, h.fetalOrigin.heavenStem.name), 
        h.fetalOrigin.heavenStemTenStar = g.getTenStar(r.HeavenStem.fromName(h.fetalOrigin.heavenStem.name)).getName(), 
        h.detalBreath = v(u.getFetalBreath().getName()), h.detalBreath.hideHeavenStems = y(h.detalBreath.earthBranch.name, h.detalBreath.heavenStem.name), 
        h.detalBreath.heavenStemTenStar = g.getTenStar(r.HeavenStem.fromName(h.detalBreath.heavenStem.name)).getName(), 
        h.year.hideHeavenStems = y(h.year.earthBranch.name, h.day.heavenStem.name), h.month.hideHeavenStems = y(h.month.earthBranch.name, h.day.heavenStem.name), 
        h.day.hideHeavenStems = y(h.day.earthBranch.name, h.day.heavenStem.name), h.hour.hideHeavenStems = y(h.hour.earthBranch.name, h.day.heavenStem.name);
        var c = r.HeavenStem.fromName(h.day.heavenStem.name);
        h.year.heavenStemTenStar = c.getTenStar(r.HeavenStem.fromName(h.year.heavenStem.name)).getName(), 
        h.month.heavenStemTenStar = c.getTenStar(r.HeavenStem.fromName(h.month.heavenStem.name)).getName(), 
        h.day.heavenStemTenStar = "元", h.hour.heavenStemTenStar = c.getTenStar(r.HeavenStem.fromName(h.hour.heavenStem.name)).getName(), 
        h.year.sound = S(h.year.name), h.month.sound = S(h.month.name), h.day.sound = S(h.day.name), 
        h.hour.sound = S(h.hour.name), h.year.extraEarthBranches = N(h.year.name), h.month.extraEarthBranches = N(h.month.name), 
        h.day.extraEarthBranches = N(h.day.name), h.hour.extraEarthBranches = N(h.hour.name);
        var s = r.HeavenStem.fromName(h.day.heavenStem.name);
        return h.year.terrain = s.getTerrain(r.EarthBranch.fromName(h.year.earthBranch.name)).getName(), 
        h.month.terrain = s.getTerrain(r.EarthBranch.fromName(h.month.earthBranch.name)).getName(), 
        h.day.terrain = s.getTerrain(r.EarthBranch.fromName(h.day.earthBranch.name)).getName(), 
        h.hour.terrain = s.getTerrain(r.EarthBranch.fromName(h.hour.earthBranch.name)).getName(), 
        h.year.isit = r.HeavenStem.fromName(h.year.heavenStem.name).getTerrain(r.EarthBranch.fromName(h.year.earthBranch.name)).getName(), 
        h.month.isit = r.HeavenStem.fromName(h.month.heavenStem.name).getTerrain(r.EarthBranch.fromName(h.month.earthBranch.name)).getName(), 
        h.day.isit = r.HeavenStem.fromName(h.day.heavenStem.name).getTerrain(r.EarthBranch.fromName(h.day.earthBranch.name)).getName(), 
        h.hour.isit = r.HeavenStem.fromName(h.hour.heavenStem.name).getTerrain(r.EarthBranch.fromName(h.hour.earthBranch.name)).getName(), 
        h.xiyongWuxing = function(e) {
            var r = {
                "金": 0,
                "木": 0,
                "水": 0,
                "火": 0,
                "土": 0
            }, m = n.wuxingRelationship.find(function(a) {
                return a[0] == e.day[0];
            }), o = 0, i = function(a) {
                e[a].forEach(function(e, t) {
                    -1 != m[1].indexOf(e) ? o += n.sizhuScore[a][t] : o -= n.sizhuScore[a][t], r[e] += 1;
                });
            };
            for (var h in e) i(h);
            var u = o < 50 ? m[1].split("") : [ m[2][0], "".concat(m[2][2]).concat(m[2][1]) ], g = a(u, 2), c = g[0], s = g[1], v = Object.entries(r);
            v = v.sort(function(e, a) {
                return a[1] - e[1];
            });
            var y, f = [], N = [], S = t(v);
            try {
                for (S.s(); !(y = S.n()).done; ) {
                    var d = y.value;
                    d[1] == v[0][1] && f.push(d[0]), d[1] == v[4][1] && N.push(d[0]);
                }
            } catch (e) {
                S.e(e);
            } finally {
                S.f();
            }
            return {
                strong: f,
                weak: N,
                xi: c,
                yong: s,
                score: o,
                state: o > 50 ? "身强" : "身弱",
                wuxingRatio: r
            };
        }({
            year: [ h.year.heavenStem.wuxing, h.year.earthBranch.wuxing ],
            month: [ h.month.heavenStem.wuxing, h.month.earthBranch.wuxing ],
            day: [ h.day.heavenStem.wuxing, h.day.earthBranch.wuxing ],
            hour: [ h.hour.heavenStem.wuxing, h.hour.earthBranch.wuxing ]
        }), h;
    },
    getShensha: function(e, a, n) {
        var m, o = r.LunarDay.fromYmd(Number(e), Number(a), Number(n)).getGods(), i = [], h = t(o);
        try {
            for (h.s(); !(m = h.n()).done; ) {
                var u = m.value;
                i.push({
                    name: u.names[u.index],
                    state: u.getLuck().getName()
                });
            }
        } catch (e) {
            h.e(e);
        } finally {
            h.f();
        }
        return i;
    },
    getSound: S,
    getExtraEarthBranches: N,
    getEightChar: f,
    hideHeavenStems: y,
    getElementYinYang: v,
    getConstellation: function(e, a, t) {
        return r.SolarDay.fromYmd(e, a, Number(t)).getConstellation().getName();
    },
    getZodiac: function(e) {
        var a = r.LunarYear.fromYear(Number(e)).getSixtyCycle().getName().split("");
        return r.EarthBranch.fromName(a[1]).getZodiac().getName();
    },
    getSolarTerms: m,
    getLunarFestival: o,
    getSolarFestival: i,
    isWork: h,
    LunarDays: g,
    LunarInfo: s,
    getLunarHourYiJi: function(e, a, n, m) {
        var o, i = r.SolarDay.fromYmd(Number(e), Number(a), Number(n)).getLunarDay(), h = r.SolarTime.fromYmdHms(e, a, n, new Date().getHours(), 0, 0).getLunarHour(), u = [], g = t(i.getHours());
        try {
            for (g.s(); !(o = g.n()).done; ) {
                var c = o.value;
                u.push({
                    name: c.getSixtyCycle().toString(),
                    luck: c.getTwelveStar().getEcliptic().getLuck().toString(),
                    recommends: c.getRecommends().map(function(e) {
                        return e.getName();
                    }),
                    avoids: c.getAvoids().map(function(e) {
                        return e.getName();
                    })
                });
            }
        } catch (e) {
            g.e(e);
        } finally {
            g.f();
        }
        return {
            hours: u,
            curHour: function() {
                return h.getSixtyCycle().getName();
            }
        };
    },
    getFestival: function() {
        for (var e = [], a = new Date(), t = 1; e.length < 26; ) {
            a.setDate(a.getDate() + 1);
            var r = a.getFullYear(), n = a.getMonth() + 1, m = a.getDate(), h = o(r, n, m) || i(r, n, m);
            h && e.push({
                name: h,
                year: r,
                month: n,
                day: m,
                dayNum: t
            }), t += 1;
        }
        return e;
    },
    jiriList: n.jiriList,
    getAuspiciousDay: function(a) {
        for (var n = [], m = new Date(), o = 1; n.length < 12 && o < 365; ) {
            m.setDate(m.getDate() + 1);
            var i, h = m.getFullYear(), u = m.getMonth() + 1, g = m.getDate(), c = r.SolarDay.fromYmd(Number(h), Number(u), Number(g)).getLunarDay(), v = [], y = t(c.getRecommends());
            try {
                for (y.s(); !(i = y.n()).done; ) {
                    var f = i.value;
                    v.push(f.getName());
                }
            } catch (e) {
                y.e(e);
            } finally {
                y.f();
            }
            if (v.find(function(e) {
                return -1 != e.indexOf(a);
            })) {
                var N = new s(h, u, g, !0);
                n.push(e(e({}, N), {}, {
                    dayNum: o,
                    solar: {
                        year: h,
                        month: u,
                        day: g
                    }
                }));
            }
            o += 1;
        }
        return n;
    },
    wuxingGrowRestrain: function(e, a) {
        for (var t = "", r = 0, n = [ [ "木", "水火", "金土", "木" ], [ "火", "木土", "水金", "火" ], [ "土", "火金", "木水", "土" ], [ "金", "土水", "火木", "金" ], [ "水", "金木", "土火", "水" ] ]; r < n.length; r++) {
            var m = n[r];
            e == m[0] && (-1 != m[1].indexOf(a) ? t = "相生" : -1 != m[2].indexOf(a) ? t = "相克" : -1 != m[3].indexOf(a) && (t = "相同"));
        }
        return t;
    },
    zodiacGrowRestrain: function(e, a) {
        for (var t = "", r = 0, n = [ [ "鼠", "龙、猴、牛", "羊、马、兔、鸡" ], [ "牛", "鼠、蛇、鸡", "龙、马、羊、狗、兔" ], [ "虎", "马、狗", "蛇、猴" ], [ "兔", "羊、狗、猪", "鼠、牛、龙、鸡、马" ], [ "龙", "鼠、猴、鸡", "狗、牛、龙、兔" ], [ "蛇", "牛、鸡", "虎、猴、猪" ], [ "‌马", "虎、羊、狗", "鼠、牛、兔、马" ], [ "‌羊", "鼠、牛、狗", "兔、马、猪" ], [ "‌‌猴", "鼠、龙", "虎、蛇、猪" ], [ "‌‌‌鸡", "牛、龙、蛇", "兔、鸡、狗" ], [ "‌狗", "虎、兔、马", "牛、龙、羊、鸡" ], [ "‌‌猪", "羊、兔", "蛇、猪、猴" ] ]; r < n.length; r++) {
            var m = n[r];
            e == m[0] && (-1 != m[1].indexOf(a) ? t = "相生" : -1 != m[2].indexOf(a) && (t = "相克"));
        }
        return t || "/";
    },
    heavenStemMatch: function(e, a) {
        var t = "";
        return (t = n.heavenStemHe.find(function(t) {
            return t[0] == "".concat(e).concat(a) || t[0] == "".concat(a).concat(e);
        })) ? t[1] : (t = n.heavenStemChon.find(function(t) {
            return t[0] == "".concat(e).concat(a) || t[0] == "".concat(a).concat(e);
        })) ? t[1] : (t = n.heavenStemKe.find(function(t) {
            return t[0] == "".concat(e).concat(a) || t[0] == "".concat(a).concat(e);
        })) ? t[1] : "/";
    },
    earthBranchMatch: d,
    zodiacHe: function(e, a) {
        var t = n.zodiacEarthBranch.find(function(a) {
            return a[0] == e;
        }), r = n.zodiacEarthBranch.find(function(e) {
            return e[0] == a;
        });
        return d(t[1], r[1]);
    },
    solarDay: u,
    getDecadeFortune: function(e, a, t, n, m) {
        for (var o = f(e, a, t, n), i = r.HeavenStem.fromName(o.day.heavenStem.name), h = r.ChildLimit.fromSolarTime(r.LunarHour.fromYmdHms(Number(e), Number(a), Number(t), Number(n), 0, 0).getSolarTime(), 1 == m ? r.Gender.MAN : r.Gender.WOMAN), u = {
            year: h.getYearCount(),
            month: h.getMonthCount(),
            day: h.getDayCount(),
            hour: h.getHourCount()
        }, g = [], c = h.getStartDecadeFortune(), s = h.getStartFortune(), N = 0; N < 10; ) {
            var S = null, d = {
                year: (S = 0 == N ? c : c.next(N)).getStartLunarYear().getYear(),
                sixtyCycle: S.getSixtyCycle().getName(),
                age: S.getStartAge(),
                years: []
            }, l = v(d.sixtyCycle);
            d.heavenStem = l.heavenStem, d.earthBranch = l.earthBranch, d.TenStar = i.getTenStar(r.HeavenStem.fromName(d.sixtyCycle[0])).getName(), 
            d.hideHeavenStems = y(d.sixtyCycle[1], o.day.heavenStem.name)[0].owner;
            for (var H = null, b = 0; b < 10; b++) {
                var B = {
                    year: (H = 0 == b ? s : s.next(b + 10 * N)).getLunarYear().getYear(),
                    sixtyCycle: H.getLunarYear().getSixtyCycle().getName()
                }, x = v(B.sixtyCycle);
                B.heavenStem = x.heavenStem, B.earthBranch = x.earthBranch, B.TenStar = i.getTenStar(r.HeavenStem.fromName(B.sixtyCycle[0])).getName(), 
                B.hideHeavenStems = y(B.sixtyCycle[1], o.day.heavenStem.name)[0].owner, d.years.push(B);
            }
            g.push(d), N += 1;
        }
        return {
            childLimit: u,
            dayun: g
        };
    },
    lunarHourName: function(e, a, t, n) {
        return r.LunarHour.fromYmdHms(e, a, t, n, 0, 0).getName();
    },
    getLunarDays: function(e, a, t, r) {
        var n = u(e, a, t);
        return new g(n.year, n.month, n.day, r);
    },
    lunarLastDay: function(e, a) {
        var t = c(e, a, 31);
        if (t) return t;
        var r = c(e, a, 30);
        if (r) return r;
        var n = c(e, a, 29);
        return n || (c(e, a, 28) || void 0);
    }
};

exports.lunar = l;