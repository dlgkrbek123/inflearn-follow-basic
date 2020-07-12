import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
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
      <h2>시작 페이지</h2>
      <br />
      <button
        onClick={() => {
          // db의 토큰만 지워져도 인증안되서 괜찮음
          axios
            .get("/api/users/logout")
            .then((res) => {
              if (res.data.success) {
                history.push("/login");
              } else {
                alert("로그아웃 실패");
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default LandingPage;
