const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10; // salt가 몇 글자?

// salt를 먼저 생성
// salt를 이용해서 암호화

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 문자열 내 공백을 없애줌
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// 저장전의 무엇을 할지 정의 가능
userSchema.pre("save", function (next) {
  // 비밀번호를 암호화시킴
  var user = this;

  if (user.isModified("password")) {
    // 비밀번호가 변화되어 save할 시 비번 바뀌어서 저장

    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.password, salt, function (err2, hash) {
        if (err2) return next(err2);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // 평문과 암호문을 같은지 체크해야함
  // 복호화는 불가능
  var user = this;

  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;

  const token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);

    cb(null, user);
  });

  // user._id + secretToken => token
  // token - secretToken => user._id 누구인지 식별 가능
};

// model이 스키마를 감싼다.
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
