import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../../_actions/user_action";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
          if (password !== confirmPassword) {
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
          }

          dispatch(
            registerUser({
              email,
              name,
              password,
            })
          ).then((response) => {
            if (response.payload.success) {
              history.push("/login");
            } else {
              alert("fail to signup");
            }
          });
        }}
      >
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Name</label>
        <input
          type="text"
          value={name}
          required={true}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          required={true}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          required={true}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
