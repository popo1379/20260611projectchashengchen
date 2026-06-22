Object.defineProperty(exports, Symbol.toStringTag, {
    value: "Module"
});

var e = require("./common/vendor.js"), n = require("./common/share.js");

Math;

// ===== 共享云环境全局状态（在 onLaunch 中初始化）=====
// 官方文档：https://developers.weixin.qq.com/minigame/dev/wxcloudrun/src/guide/reuse/
// 资源复用（环境共享）的正确用法：
// 1. wx.cloud.init() 不传 env —— 仅启用云 API 系统
// 2. new wx.cloud.Cloud({ resourceAppid, resourceEnv }) —— 创建共享实例
// 3. await sharedCloud.init() —— 必须调用 init() 方法才能使用！
// 前提：资源方已在云开发控制台 → 资源复用 中添加本小程序 AppID 的授权
var sharedCloud = null;
var cloudReady = false;

// ===== 初始化云环境（异步函数，在 onLaunch 中调用）
function initCloudEnv() {
    return new Promise(function(resolve) {
        try {
            if (typeof wx.cloud === "undefined" || !wx.cloud.init) {
                console.warn("当前基础库不支持云开发，将使用本地默认配置");
                cloudReady = false;
                resolve(false);
                return;
            }

            // 第一步：启用云 API 系统，同时指定默认环境
            var defaultEnvId = 'mortgagecalculator-9d0fqf0fbb151';
            wx.cloud.init({ 
                env: defaultEnvId,
                traceUser: true 
            });

            // 第二步：创建共享环境实例
            if (typeof wx.cloud.Cloud !== "function") {
                // 基础库版本过低，不支持 Cloud 构造函数，退化为默认方式
                cloudReady = true;
                console.log("云 API 已启用，当前基础库不支持共享实例，将使用默认访问方式");
                resolve(true);
                return;
            }

            // 资源方 AppID 和共享环境 ID
            var resourceAppid = "wx02933187189c34ad";
            var resourceEnv = "mortgagecalculator-9d0fqf0fbb151";

            sharedCloud = new wx.cloud.Cloud({
                resourceAppid: resourceAppid,
                resourceEnv: resourceEnv,
                traceUser: true
            });

            // 第三步：调用 init() 方法（官方文档要求必须调用）
            var appInstance = this;
            console.log('开始初始化共享云实例...');
            sharedCloud.init().then(function() {
                cloudReady = true;
                // 保存到 globalData，供其他模块使用（如云函数调用）
                if (appInstance.globalData) {
                    appInstance.globalData.sharedCloud = sharedCloud;
                    console.log('✓ sharedCloud 已保存到 globalData');
                }
                console.log("共享云环境初始化成功", resourceEnv);
                resolve(true);
            }).catch(function(err) {
                console.warn("共享云环境 init() 失败，将使用本地默认配置", err);
                sharedCloud = null;
                cloudReady = false;
                resolve(false);
            });

        } catch (err) {
            console.warn("云环境初始化失败，将使用本地默认配置", err);
            sharedCloud = null;
            cloudReady = false;
            resolve(false);
        }
    });
}

// ===== 当前小程序版本号（需高于云数据库 minVersion 才开放受限功能）=====
var appVersion = "1.2";

// ===== 版本比较函数：返回 1（大于）、0（等于）、-1（小于）=====
function compareVersion(v1, v2) {
    v1 = v1 || "0";
    v2 = v2 || "0";
    var arr1 = v1.split(".");
    var arr2 = v2.split(".");
    var len = Math.max(arr1.length, arr2.length);
    for (var i = 0; i < len; i++) {
        var a = parseInt(arr1[i] || "0");
        var b = parseInt(arr2[i] || "0");
        if (a > b) return 1;
        if (a < b) return -1;
    }
    return 0;
}

var o = {
    onLaunch: function() {
        // 初始化 globalData
        this.globalData = this.globalData || {};
        this.globalData.appVersion = appVersion;
        this.globalData.featureConfig = {};
        // 显示加载动画（云数据库配置加载中）
        try {
            wx.showLoading({
                title: "加载中...",
                mask: true
            });
        } catch (err) {
            console.warn("显示加载动画失败", err);
        }
        // 超时保护：5 秒后强制关闭加载动画
        var loadingTimeout = setTimeout(function() {
            try { wx.hideLoading(); } catch (err) {}
            console.log("加载动画超时（5 秒），已强制关闭");
        }, 5000);
        // 异步初始化云环境，等待完成后再加载配置
        initCloudEnv().then(function() {
            // 加载云端功能配置，完成后关闭加载动画
            this.loadFeatureConfig(function() {
                try {
                    clearTimeout(loadingTimeout);
                    wx.hideLoading();
                } catch (err) {
                    console.warn("隐藏加载动画失败", err);
                }
            });
        }.bind(this));
    },
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
                    content: '请您删除当前小程序，到微信 "发现-小程序" 页，重新搜索打开哦~',
                    showCancel: !1
                });
            });
        },
        loadFeatureConfig: function(callback) {
            var self = this;
            // 云环境不可用时，直接默认开放所有功能，不再尝试查询云数据库
            if (!cloudReady || typeof wx.cloud === "undefined") {
                self.globalData.featureConfig = {};
                console.log("云环境不可用，使用本地默认配置（所有功能开放）");
                if (typeof callback === "function") callback();
                // 通知所有注册的监听器
                if (self._featureConfigListeners) {
                    self._featureConfigListeners.forEach(function(fn) { try { fn(); } catch(e) {} });
                }
                return;
            }

            // 按优先级尝试获取数据库句柄
            // 优先级 1：共享实例（如果有）→ 优先级 2：默认全局 database
            var db = null;
            var sourceLabel = "";
            if (sharedCloud && typeof sharedCloud.database === "function") {
                try {
                    db = sharedCloud.database();
                    sourceLabel = "共享实例";
                } catch (e) {
                    console.warn("共享实例 database() 获取失败，尝试默认方式", e);
                    db = null;
                }
            }
            if (!db && typeof wx.cloud.database === "function") {
                try {
                    db = wx.cloud.database();
                    sourceLabel = "默认方式";
                } catch (e) {
                    console.warn("默认 database() 获取失败", e);
                    db = null;
                }
            }
            if (!db) {
                self.globalData.featureConfig = {};
                console.log("数据库句柄获取失败，使用本地默认配置（所有功能开放）");
                if (typeof callback === "function") callback();
                if (self._featureConfigListeners) {
                    self._featureConfigListeners.forEach(function(fn) { try { fn(); } catch(e) {} });
                }
                return;
            }

            try {
                db.collection("feature_config").get().then(function(res) {
                    if (res.data && res.data.length > 0) {
                        var config = {};
                        res.data.forEach(function(item) {
                            config[item.feature] = item;
                        });
                        self.globalData.featureConfig = config;
                        console.log("云端功能配置加载成功（" + sourceLabel + "）", config);
                    } else {
                        self.globalData.featureConfig = {};
                        console.log("云端功能配置为空，默认全部开放");
                    }
                    if (typeof callback === "function") callback();
                    // 通知所有注册的监听器
                    if (self._featureConfigListeners) {
                        self._featureConfigListeners.forEach(function(fn) { try { fn(); } catch(e) {} });
                    }
                }).catch(function(err) {
                    console.error("云端功能配置加载失败（" + sourceLabel + "）", err);
                    // 加载失败时默认全部开放（降级保护）
                    self.globalData.featureConfig = {};
                    if (typeof callback === "function") callback();
                    if (self._featureConfigListeners) {
                        self._featureConfigListeners.forEach(function(fn) { try { fn(); } catch(e) {} });
                    }
                });
            } catch (err) {
                console.error("云端功能配置调用失败", err);
                self.globalData.featureConfig = {};
                if (typeof callback === "function") callback();
                if (self._featureConfigListeners) {
                    self._featureConfigListeners.forEach(function(fn) { try { fn(); } catch(e) {} });
                }
            }
        },
        // 注册功能配置监听器（多个页面可同时注册）
        registerFeatureConfigListener: function(fn) {
            if (!this._featureConfigListeners) this._featureConfigListeners = [];
            this._featureConfigListeners.push(fn);
        },
        isFeatureEnabled: function(featureName) {
            var config = this.globalData.featureConfig || {};
            var feature = config[featureName];
            // 如果云数据库中没有配置该功能，则默认隐藏
            if (!feature) {
                console.log("isFeatureEnabled:", featureName, "- 未配置，默认隐藏");
                return false;
            }
            // 支持两种字段名：hideVersion（用户描述）和 minVersion（代码中）
            var hideVersion = feature.hideVersion || feature.minVersion || "";
            console.log("isFeatureEnabled:", featureName, "- 云版本号:", hideVersion, "小程序版本号:", appVersion);
            // 只有当云版本号 === 小程序版本号时才隐藏
            if (hideVersion === appVersion) {
                console.log("isFeatureEnabled:", featureName, "- 版本匹配，隐藏功能");
                return false;
            }
            console.log("isFeatureEnabled:", featureName, "- 版本不匹配，开放功能");
            return true;
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