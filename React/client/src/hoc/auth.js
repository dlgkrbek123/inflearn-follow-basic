import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useHistory } from "react-router-dom";

const withAuth = (Comp, option, adminRoute = null) => {
  // option
  // null => 아무나
  // true => 로그이니해야지
  // false => 로그인하면 못감

  return (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
      dispatch(auth()).then((res) => {
        if (!res.payload.isAuth) {
          if (option) {
            history.push("/login");
          }
        } else {
          if (adminRoute && !res.payload.isAdmin) {
            history.push("/");
          } else {
            if (option === false) {
              history.push("/");
            }
          }
        }

        console.log(res);
      });
    });

    return <Comp {...props} />;
  };
};

export default withAuth;
