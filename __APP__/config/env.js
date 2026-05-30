require("./Aes256/index.js");

var e = "shengcheng_wuxing", o = {
    development: {},
    systemMsgId: {}
};

o.development = {
    version: "1.0.0",
    name: e,
    wxWebAppid: "",
    host: "http://localhost:9090"
}, o.production = {
    version: "1.0.0",
    name: e,
    wxWebAppid: "",
    host: "https://yisuanbaapi.huomiao.info"
};

var s = o.production;

exports.env = s;