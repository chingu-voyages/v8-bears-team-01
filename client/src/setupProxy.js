const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy("/api/*", { target: "http://localhost:5000" }));
    app.use(proxy("/api/projects/*", { target: "http://localhost:5000" }));
    app.use(proxy("/auth/google", { target: "http://localhost:5000" }));
    app.use(proxy("/auth/facebook", { target: "http://localhost:5000" }));
    app.use(proxy("/auth/*", { target: "http://localhost:5000" }));
    app.use(proxy("/api/user/*", { target: "http://localhost:5000" }));
    app.use(proxy("/api/logout",{target: "http://localhost:5000"}))
    app.use(proxy("/api/auth_token",{target: "http://localhost:5000"}))
    app.use(proxy("/api/user/projects",{target: "http://localhost:5000"}))

};
