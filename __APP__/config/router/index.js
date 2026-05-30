require("../../@babel/runtime/helpers/Arrayincludes");

var e = require("../../common/vendor.js");

e.index.historyRouter = [], [ "navigateTo", "redirectTo", "reLaunch", "switchTab", "navigateBack" ].forEach(function(i) {
    e.index.addInterceptor(i, {
        invoke: function(r) {
            "navigateTo" == i ? e.index.historyRouter.push(r) : [ "reLaunch", "switchTab" ].includes(i) ? e.index.historyRouter = [] : "navigateBack" == i && (e.index.historyRouter = e.index.historyRouter.slice(0, -1 * r.delta));
        }
    });
});