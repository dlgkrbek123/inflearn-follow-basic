const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");
const { User } = require("./models/User");

const app = express();
const port = 5000;

// body의 내용을 서버에서 파싱해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log(e)); // connection string

app.get("/", (req, res) => {
  res.send("Hell엄준식orld");
});

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    // 저장전에 암호화
    // mongoose의 기능을 활용

    if (err) {
      return res.json({
        success: false,
        err,
      });
    }
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/login", (req, res) => {
  // db에서 이메일 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    } else {
      // email이 있으면 비밀번호가 같니?

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({ loginSuccess: false, message: "비밀번호 틀림" });
        }

        // 비밀번호가 같으면 token 생성
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          // token을 저장 => 쿠키, 로컬 스토리지
          // 어디가 안전하니? 논란

          res.cookie("x_auth", user.token).status(200).json({
            loginSuccess: true,
            userId: user._id,
          });
        });
      });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
