var e = require("../@babel/runtime/helpers/regeneratorRuntime"), t = require("../@babel/runtime/helpers/objectSpread2"), r = require("../@babel/runtime/helpers/asyncToGenerator"), n = require("../common/vendor.js"), i = require("./storage/index.js"), a = require("../common/utils.js"), o = require("../api/index.js").api.isWechatOfficialIp(), c = a.utils.cacheFunc(r(e().mark(function r() {
    return e().wrap(function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.t0 = t, e.t1 = t, e.t2 = {}, e.next = 5, n.index.request({
                url: "https://yisuanbaapi.huomiao.info/jsonApi/wzcwx"
            }).then(function(e) {
                return e.data.data;
            });

          case 5:
            return e.t3 = e.sent, e.t4 = (0, e.t1)(e.t2, e.t3), e.t5 = {}, e.next = 10, o;

          case 10:
            return e.t6 = e.sent, e.t7 = {
                ip: e.t6
            }, e.abrupt("return", (0, e.t0)(e.t4, e.t5, e.t7));

          case 13:
          case "end":
            return e.stop();
        }
    }, r);
}))), s = n.defineStore("system", {
    state: function() {
        return {
            open: !0,
            officialAccount: !1,
            navbar: "查生辰命理",
            title: "农历 · 公历 · 命理",
            mainBtn: "开始查询",
            share: !1,
            qrcode: "",
            officialAccountBtn: "查看详细信息",
            modalText: "查看详细排盘"
        };
    },
    getters: {},
    actions: {
        getSystemConfig: function() {
            var e = this;
            c().then(function(t) {
                e.navbar = t.navbar, e.title = t.title, e.share = t.share >= 8, e.mainBtn = t.mainBtn, 
                e.qrcode = t.qrcode, e.officialAccountBtn = t.officialAccountBtn, e.modalText = t.modalText, 
                e.officialAccount = !1, e.open = !0;
            });
        }
    },
    persist: {
        storage: i.storage(!0),
        paths: [ "qrcode" ]
    }
});

exports.useSystemStore = s;