import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            loginUser({
              email,
              password,
            })
          ).then((response) => {
            if (response.payload.loginSuccess) {
              history.push("/");
            } else {
              alert("로그인 실패");
            }
          });
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
