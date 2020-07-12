const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리를 하는 미들웨어
  // 쿠키에서 토큰을 가져와 복호화
  let token = req.cookies.x_auth;

  User.findByToken(token, function (err, user) {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = auth;
