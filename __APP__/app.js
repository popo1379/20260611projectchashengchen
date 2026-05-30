Object.defineProperty(exports, Symbol.toStringTag, {
    value: "Module"
});

var e = require("./common/vendor.js"), n = require("./common/share.js");

Math;

var o = {
    onLaunch: function() {},
    onShow: function() {
        console.log("App Show -"), this.checkUpdateVersion();
    },
    onHide: function() {
        console.log("App Hide");
    },
    methods: {
        checkUpdateVersion: function() {
            var n = e.index.getUpdateManager();
            n.onCheckForUpdate(function(e) {
                console.log("请求完新版本信息的回调", e);
            }), n.onUpdateReady(function(o) {
                e.index.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，重启应用以更新",
                    success: function(e) {
                        e.confirm && n.applyUpdate();
                    }
                });
            }), n.onUpdateFailed(function() {
                e.wx$1.showModal({
                    title: "已经有新版本喽~",
                    content: "请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~",
                    showCancel: !1
                });
            });
        }
    }
};

function t() {
    var t = e.createSSRApp(o), a = e.createPinia();
    return a.use(e.src_default), t.use(a), t.mixin(n.share), {
        app: t,
        Pinia: e.Pinia
    };
}

t().app.mount("#app"), exports.createApp = t;