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

        // ===== 云开发功能开关控制：读取 cloudDB feature_config 配置判断功能是否开放 =====
        var q = r.ref(false); // 默认隐藏

        // 获取 app 实例，注册监听器：云端配置加载完成后更新开关状态
        var app = getApp();
        if (app && app.isFeatureEnabled) {
            q.value = app.isFeatureEnabled("daily_draw");
            // 注册全局监听器（多个页面可同时注册，互不影响）
            app.registerFeatureConfigListener(function() {
                q.value = app.isFeatureEnabled("daily_draw");
                console.log("bazi页面 daily_draw 状态更新:", q.value);
            });
            // 延迟再检查一次（确保云配置加载完成后状态正确）
            setTimeout(function() {
                q.value = app.isFeatureEnabled("daily_draw");
                console.log("bazi页面 daily_draw 延迟检查:", q.value);
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
                // 保存场景到 globalData
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

            // ===== 原生模板广告事件回调 =====
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
                m: r.o(drawItemClick)
            });
        };
    }
}, i = r._export_sfc(o, [ [ "__scopeId", "data-v-47582f5c" ] ]);

wx.createPage(i);