var e = require("../@babel/runtime/helpers/regeneratorRuntime"), t = require("../@babel/runtime/helpers/asyncToGenerator"), n = require("../config/http/index.js"), r = new function() {
    this.isWechatOfficialIp = t(e().mark(function r() {
        return e().wrap(function(r) {
            for (;;) switch (r.prev = r.next) {
              case 0:
                return r.abrupt("return", new Promise(function() {
                    var r = t(e().mark(function t(r, c) {
                        var i;
                        return e().wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return i = !1, setTimeout(function() {
                                    i || (r("ok"), i = !0);
                                }, 5e3), e.next = 4, n.http.get("/client/common/isWechatOfficialIp").then(function(e) {
                                    !i && r(e.data), i = !0;
                                }).catch(function(e) {
                                    i = !0, r("ok");
                                });

                              case 4:
                                console.log("发送请求");

                              case 5:
                              case "end":
                                return e.stop();
                            }
                        }, t);
                    }));
                    return function(e, t) {
                        return r.apply(this, arguments);
                    };
                }()));

              case 1:
              case "end":
                return r.stop();
            }
        }, r);
    }));
}();

exports.commons = r;