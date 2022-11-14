import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login, loginFailure } from '../../../redux/userRedux';
import userApi from '../../../api/userApi';
import styled from "styled-components";
import { showNotification } from "../../../utils/MyUtils";



function SignIn() {
  const StyledLink = styled(Link)`
  color: #7B68EE;
  text-decoration: underline;
`;
  const errorlogin = useSelector(state => state.user.error)
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("username", username)
    formData.append("password", password)
    console.log(formData)

    try {
      const res = await userApi.login(formData)
      if (!res.status || res.status === 200) {
        login(dispatch, res, username);
        showNotification('success', 'Login success!', 'Wish you a happy purchase!', 'OK')
      } else {
        dispatch(loginFailure())
        showNotification('error', 'Login failed!', 'Please check your username and password!', 'OK')
      }
    } catch (error) {
      dispatch(loginFailure())
    }
  };

  return (
    <div
      className="wrapper"
      style={{ backgroundImage: 'url("img/signup/bg-tech.jpg")' }}
    >
      <div className="inner">
        <div className="image-holder">
          <img src="img/signup/ip13.jpg" />
        </div>
        <form onSubmit={handleClick}>
          <h3>Sign in</h3>

          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className="zmdi zmdi-account" />
          </div>

          <div className="form-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="zmdi zmdi-lock" />
          </div>
          {error ? (<h5 style={{ color: "red" }}>Username or password wrong!</h5>) : ("")}
          <StyledLink to="/forgot">Forgot password</StyledLink>
          <StyledLink style={{ float: "right" }} to="/signup"> Sign up </StyledLink>
          <div className="d-flex row">
            <button onClick={() => nav(-1)} className="btn-back">
              <i className="zmdi zmdi-arrow-left" />
              Back
            </button>
            <button
              type="submit"
              disabled={isFetching}
              className="btn-Register"
            >
              Sign in
              <i className="zmdi zmdi-arrow-right" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default SignIn;
