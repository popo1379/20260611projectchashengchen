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

        // ===== 云开发功能开关控制 =====
        var q = r.ref(false);
        var p = r.ref(true); // 本命星盘：默认显示，只有云端版本号匹配时才隐藏

        var app = getApp();
        if (app && app.isFeatureEnabled) {
            q.value = app.isFeatureEnabled("daily_draw");
            // 本命星盘：未配置时默认显示；配置了但版本号不匹配时显示；只有版本号完全匹配时才隐藏
            var config = app.globalData.featureConfig || {};
            var feature = config["astrology"];
            if (!feature) {
                p.value = true; // 未配置 → 显示
            } else {
                var hideVersion = feature.hideVersion || feature.minVersion || "";
                p.value = hideVersion !== "1.2"; // 版本号匹配时才隐藏
            }
            app.registerFeatureConfigListener(function() {
                q.value = app.isFeatureEnabled("daily_draw");
                // 本命星盘：重新评估
                var cfg = app.globalData.featureConfig || {};
                var feat = cfg["astrology"];
                if (!feat) {
                    p.value = true;
                } else {
                    var hv = feat.hideVersion || feat.minVersion || "";
                    p.value = hv !== "1.2";
                }
                console.log("bazi页面 daily_draw 状态更新:", q.value);
                console.log("bazi页面 astrology 状态更新:", p.value);
            });
            setTimeout(function() {
                q.value = app.isFeatureEnabled("daily_draw");
                var cfg = app.globalData.featureConfig || {};
                var feat = cfg["astrology"];
                if (!feat) {
                    p.value = true;
                } else {
                    var hv = feat.hideVersion || feat.minVersion || "";
                    p.value = hv !== "1.2";
                }
                console.log("bazi页面 daily_draw 延迟检查:", q.value);
                console.log("bazi页面 astrology 延迟检查:", p.value);
            }, 3000);
        }

        return function(e, v) {
            var drawItemClick = function(e) {
                var scene = e.currentTarget.dataset.scene;
                if (!scene) {
                    wx.showToast({
                        title: '场景参数错误',
                        icon: 'none'
                    });
                    return;
                }
                getApp().globalData.drawScene = scene;
                wx.navigateTo({
                    url: '/pages/draw/draw',
                    fail: function(err) {
                        wx.showToast({
                            title: '页面跳转失败',
                            icon: 'none'
                        });
                    }
                });
            };

            var astrologyClick = function() {
                wx.navigateTo({
                    url: '/pages/astrology/input',
                    fail: function(err) {
                        wx.showToast({
                            title: '页面跳转失败',
                            icon: 'none'
                        });
                    }
                });
            };

            var adLoad = function() {
                console.log("原生模板广告加载成功");
            };
            var adError = function(err) {
                console.error("原生模板广告加载失败", err);
            };
            var adClose = function() {
                console.log("原生模板广告关闭");
            };

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
                h: d.value,
                o: q.value,
                p: p.value,
                q: r.o(adLoad),
                r: r.o(adError),
                s: r.o(adClose)
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
                m: r.o(drawItemClick),
                v: r.o(astrologyClick)
            });
        };
    }
}, i = r._export_sfc(o, [ [ "__scopeId", "data-v-47582f5c" ] ]);

wx.createPage(i);
