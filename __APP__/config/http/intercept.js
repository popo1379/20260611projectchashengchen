var e = require("../../common/vendor.js"), n = function() {
    e.index.showToast({
        title: "您还未登录",
        icon: "none"
    }), e.index.switchTab({
        url: "/pages/tabbar/bazi"
    }), setTimeout(function() {
        return location.reload();
    }, 500);
}, t = function() {
    e.index.showToast({
        title: "登录过期",
        icon: "none"
    }), e.index.switchTab({
        url: "/pages/tabbar/bazi"
    });
}, o = function(n) {
    setTimeout(function() {
        e.index.showToast({
            title: n.message,
            icon: "none"
        });
    });
}, i = function(n) {
    setTimeout(function() {
        e.index.showToast({
            title: "服务不可用,请联系管理员",
            icon: "none"
        });
    });
};

exports.intercept = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    switch (console.log(e, "res"), e.state) {
      case 401:
        n();
        break;

      case 403:
        t();
        break;

      case 400:
        o(e);
        break;

      case 500:
        i();
    }
};