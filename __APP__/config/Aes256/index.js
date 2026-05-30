var r = require("../../common/vendor.js");

function t(t) {
    var e = r.CryptoJS.enc.Utf8.parse(t.key), c = r.CryptoJS.enc.Utf8.parse(t.iv), n = {
        iv: c,
        mode: r.CryptoJS.mode.CBC,
        padding: r.CryptoJS.pad.Pkcs7
    }, o = t.encryptMode || n, p = t.decryptMode || n;
    o.iv = c, p.iv = c, this.encrypt = function(t) {
        return r.CryptoJS.AES.encrypt(JSON.stringify(t), e, o).toString();
    }, this.decrypt = function(t) {
        var c = r.CryptoJS.AES.decrypt(t, e, p);
        try {
            return c = c.toString(r.CryptoJS.enc.Utf8), [ void 0, JSON.parse(c) ];
        } catch (r) {
            return console.log(r), [ r, void 0 ];
        }
    };
}

var e = new t({
    iv: "52a68aa40fac4ae48c3d46f1cecc064b",
    key: "52a68aa40fac4ae48c3d46f1cecc064b"
});

t.encrypt = e.encrypt, t.decrypt = e.decrypt;

var c = t;

exports.Aes256 = c;