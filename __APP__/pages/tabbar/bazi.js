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
        },

        // ===== 功能开放时间控制：系统时间超过 2026-06-15 23:59:59 时自动开放 =====
        unlockTime = new Date(2026, 5, 15, 23, 59, 59).getTime(),
        q = r.ref(Date.now() >= unlockTime);

        if (!q.value) {
            var diff = unlockTime - Date.now();
            var timer = setTimeout(function() {
                q.value = true;
            }, diff > 0 ? diff : 0);
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

            var pickerProps = q.value ? r.p({
                safeAreaInsetBottom: !1,
                title: "选择日期时辰"
            }) : r.p({
                safeAreaInsetBottom: !1,
                title: "选择日期时辰",
                disabled: true
            });

            var p_handler = function() {
                wx.showToast({
                    title: "敬请期待",
                    icon: "none",
                    duration: 1500
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
                p: r.o(p_handler),
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
                l: pickerProps,
                m: r.o(drawItemClick)
            });
        };
    }
}, i = r._export_sfc(o, [ [ "__scopeId", "data-v-47582f5c" ] ]);

wx.createPage(i);