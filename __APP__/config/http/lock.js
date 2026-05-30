var e = require("../Aes256/index.js"), n = "317eed0ab90331e88524ce5c5120d9ff", t = new e.Aes256({
    key: n,
    iv: n
}), c = function() {
    var e = 0;
    return function() {
        return e += 1, t.encrypt({
            key: n,
            date: "".concat(Date.now()).concat(e)
        });
    };
}();

exports.lock = c;