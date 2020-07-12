const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};

// 서버와 클라이언트의 도메인이 다르면 CORS에 의해 막힘
// 다른 사이트에서 내서버에 요청을 보내는 걸 보안적으로 막힘
// origin이 다른데 자원을 공유할 때 적용되는 정책
// 해결법은 다양한데 프록시를 사용해본다.

// 프록시 서버는 ip나 데이터를 바꿔줄 수 있다.

// concurrently를 이용해면 개발시 api서버와 프론트서버를 동시에 킬 수 있다.
