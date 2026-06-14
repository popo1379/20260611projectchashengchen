require("../../@babel/runtime/helpers/Objectentries"), require("../../@babel/runtime/helpers/Objectvalues");

var a = require("../../@babel/runtime/helpers/toConsumableArray"), n = require("../../@babel/runtime/helpers/slicedToArray"), e = require("../../common/vendor.js");

require("../../config/router/index.js");

var r = require("../../lunar/index.js"), t = require("../../pinia/system.js"), o = require("../../lunar/data.js");

Math || i();

var i = function() {
    return "./footer-button.js";
}, u = {
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
        var u = t.useSystemStore();
        u.getSystemConfig();
        var h = i, f = e.reactive({
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
            arrowDownOpen: !1,
            showInterpretation: !1
        }), d = e.reactive({
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
            wuxingRemark: "",
            tenStars: {},
            naYin: {},
            riZhuInfo: {},
            dayun: {},
            interpretation: {}
        }), y = e.ref({}), s = function() {
            var e = h.birthday.split("-"), t = n(e, 4), i = t[0], s = t[1], u = t[2], c = t[3], l = "未知" == (c = c && decodeURI(c)) ? 12 : c || 12;
            if (h.birthday || (i = 2006, s = "06", u = "06", c = 12, h.calendar = 0), 1 == h.calendar) {
                f.solarBirthday = {
                    year: i,
                    month: s,
                    day: u,
                    hour: c
                };
                var g = new r.lunar.LunarDays(i, s, u, l);
                f.lunarBirthday = {
                    year: g.year,
                    month: g.month,
                    day: g.day,
                    hour: c,
                    value: "".concat(g.year, "年").concat(g.monthName).concat(g.dayName, " ").concat("未知" == c ? "未知点" : g.hourName)
                };
            } else {
                var m = r.lunar.getLunarDays(i, s, u, l);
                f.lunarBirthday = {
                    year: m.year,
                    month: m.month,
                    day: m.day,
                    hour: c,
                    value: "".concat(m.year, "年").concat(m.monthName).concat(m.dayName, " ").concat("未知" == c ? "未知点" : m.hourName)
                };
                var x = r.lunar.solarDay(i, s, u);
                f.solarBirthday = {
                    year: x.year,
                    month: x.month,
                    day: x.day,
                    hour: c
                };
            }
            f.constellation = r.lunar.getConstellation(f.solarBirthday.year, f.solarBirthday.month, f.solarBirthday.day), 
            f.zodiac = r.lunar.getZodiac(f.lunarBirthday.year);
            var v = r.lunar.bazi(f.lunarBirthday.year, f.lunarBirthday.month, f.lunarBirthday.day, l);
            d.year = v.year, d.month = v.month, d.day = v.day, d.hour = v.hour, d.ownSign = v.ownSign, 
            d.bodySign = v.bodySign, d.fetalOrigin = v.fetalOrigin, d.detalBreath = v.detalBreath, 
            d.xiyongWuxing = v.xiyongWuxing;
            var w = Math.max.apply(Math, a(Object.values(v.xiyongWuxing.wuxingRatio)));
            w += 1, d.wuxingRatio = [ v.xiyongWuxing.wuxingRatio["木"] / w * 100, v.xiyongWuxing.wuxingRatio["火"] / w * 100, v.xiyongWuxing.wuxingRatio["土"] / w * 100, v.xiyongWuxing.wuxingRatio["金"] / w * 100, v.xiyongWuxing.wuxingRatio["水"] / w * 100 ];
            var S = Object.entries(v.xiyongWuxing.wuxingRatio);
            d.wuxingRemark = "";
            for (var B = 0, b = S; B < b.length; B++) {
                var T = b[B];
                T[1] <= 0 && (d.wuxingRemark = d.wuxingRemark ? "".concat(d.wuxingRemark, "，").concat(T[0]) : T[0]);
            }
            d.wuxingRemark ? d.wuxingRemark = "五行缺".concat(d.wuxingRemark) : d.wuxingRemark = "五行俱全", 
            d.tenStars = {
                yearGan: v.year.heavenStemTenStar,
                monthGan: v.month.heavenStemTenStar,
                dayGan: "元",
                hourGan: v.hour.heavenStemTenStar
            }, d.naYin = {
                year: v.year.sound,
                month: v.month.sound,
                day: v.day.sound,
                hour: v.hour.sound
            }, d.riZhuInfo = o.heavenStemInfo[d.day.heavenStem.name];
            
            var riGanName = d.riZhuInfo.name;
            d.interpretation.riGan = o.riGanInterpretation[riGanName] || {};
            
            var strongestWuxing = v.xiyongWuxing.strong[0];
            var weakestWuxing = v.xiyongWuxing.weak[0];
            d.interpretation.wuxing = {
                strongest: o.wuxingInterpretation[strongestWuxing] || o.wuxingInterpretation["木"],
                weakest: o.wuxingInterpretation[weakestWuxing] || o.wuxingInterpretation["木"]
            };
            
            var xiWuxing = v.xiyongWuxing.xi;
            d.interpretation.career = o.xiYongShenApplication[xiWuxing] || o.xiYongShenApplication["木"];
            d.interpretation.health = o.healthGuide[xiWuxing] || o.healthGuide["木"];
            d.interpretation.love = o.loveGuide[xiWuxing] || o.loveGuide["木"];
            d.interpretation.lucky = o.xiYongShenApplication[xiWuxing] || o.xiYongShenApplication["木"];
            
            y.value = new r.lunar.LunarInfo(i, s, u);
            try {
                d.dayun = r.lunar.getDecadeFortune(f.lunarBirthday.year, f.lunarBirthday.month, f.lunarBirthday.day, l, 1);
            } catch (e) {
                console.log("大运计算失败", e);
            }
        };
        e.watch(function() {
            return h.birthday;
        }, s, {
            immediate: !0
        }), e.watch(function() {
            return h.calendar;
        }, s, {
            immediate: !0
        });
        var c = function(a) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return {
                "金": n + "jin",
                "木": n + "mu",
                "水": n + "shui",
                "火": n + "huo",
                "土": n + "tu"
            }[a];
        },

        // ===== 插屏广告初始化 =====
        interstitialAd = null;

        if (wx.createInterstitialAd) {
            interstitialAd = wx.createInterstitialAd({
                adUnitId: 'adunit-c379e822cc83fd65'
            });
            interstitialAd.onLoad(function() {});
            interstitialAd.onError(function(err) {
                console.error('插屏广告加载失败', err);
            });
            interstitialAd.onClose(function() {
                // 广告关闭后展示解读弹窗
                f.showInterpretation = !0;
            });
        }

        l = function() {
            // 优先展示广告，广告关闭后在 onClose 回调中打开弹窗；
            // 若广告不可用或展示失败，则直接打开弹窗
            if (interstitialAd) {
                interstitialAd.show().catch(function(err) {
                    console.error('插屏广告显示失败', err);
                    f.showInterpretation = !0;
                });
            } else {
                f.showInterpretation = !0;
            }
        }, g = function() {
            f.showInterpretation = !1;
        };
        return function(a, n) {
            return e.e({
                a: d.year.heavenStem
            }, d.year.heavenStem ? e.e({
                b: e.t(f.lunarBirthday.value),
                c: e.t((R = f.solarBirthday, "".concat(R.year, "年").concat(R.month, "月").concat(R.day, "日 ").concat(R.hourName ? R.hourName : "".concat(R.hour, "点")))),
                d: e.t(f.zodiac),
                e: e.t(f.constellation),
                f: e.t(d.year.heavenStem.name),
                g: e.n(c(d.year.heavenStem.wuxing, "ui-")),
                h: e.t(d.year.earthBranch.name),
                i: e.n(c(d.year.earthBranch.wuxing, "ui-")),
                j: e.t(d.month.heavenStem.name),
                k: e.n(c(d.month.heavenStem.wuxing, "ui-")),
                l: e.t(d.month.earthBranch.name),
                m: e.n(c(d.month.earthBranch.wuxing, "ui-")),
                n: e.t(d.day.heavenStem.name),
                o: e.n(c(d.day.heavenStem.wuxing, "ui-")),
                p: e.t(d.day.earthBranch.name),
                q: e.n(c(d.day.earthBranch.wuxing, "ui-")),
                r: e.t(d.hour.heavenStem.name),
                s: e.n(c(d.hour.heavenStem.wuxing, "ui-")),
                t: e.t(d.hour.earthBranch.name),
                v: e.n(c(d.hour.earthBranch.wuxing, "ui-")),
                w: e.unref(u).open,
                x: e.t(d.day.heavenStem.wuxing),
                y: e.n(c(d.day.heavenStem.wuxing, "ui-")),
                A: e.t(d.wuxingRemark),
                D: e.t(d.naYin.year),
                E: e.t(d.naYin.month),
                F: e.t(d.naYin.day),
                G: e.t(d.naYin.hour),
                I: e.t(d.tenStars.yearGan),
                J: e.t(d.tenStars.monthGan),
                K: e.t(d.tenStars.dayGan),
                L: e.t(d.tenStars.hourGan),
                N: e.t(d.xiyongWuxing.state),
                O: e.t(d.xiyongWuxing.xi),
                P: e.t(d.xiyongWuxing.yong),
                Q: e.t(d.xiyongWuxing.strong.join("、")),
                U: e.t(d.xiyongWuxing.weak.join("、")),
                z: f.showInterpretation,
                C: d.interpretation.riGan.summary,
                H: d.interpretation.riGan.keywords ? d.interpretation.riGan.keywords.join("、") : "",
                M: d.interpretation.riGan.advantages,
                V: d.interpretation.riGan.notes,
                W: d.interpretation.wuxing.strongest.strong,
                Y: d.interpretation.wuxing.weakest.weak,
                aa: d.interpretation.wuxing.strongest.tips,
                bb: d.interpretation.career.career.join("、"),
                cc: d.interpretation.health.organs,
                dd: d.interpretation.health.notes,
                ee: d.interpretation.health.tips,
                ff: d.interpretation.love.trait,
                gg: d.interpretation.love.suitable.join("、"),
                hh: d.interpretation.love.tips,
                ii: d.interpretation.lucky.luckyColor,
                jj: d.interpretation.lucky.luckyNumber,
                kk: d.interpretation.lucky.luckyDirection,
                ll: e.o(l),
                mm: e.o(g)
            }, d.dayun ? {
                nn: e.t(d.dayun.childLimit.year),
                oo: e.f(d.dayun.dayun.slice(0, 5), function(a, n, r) {
                    return {
                        a: e.t(a.age),
                        b: e.t(a.sixtyCycle),
                        c: e.t(a.year)
                    };
                })
            } : {}) : {});
            var R;
        };
    }
}, h = e._export_sfc(u, [ [ "__scopeId", "data-v-13c364a5" ] ]);

wx.createComponent(h);
