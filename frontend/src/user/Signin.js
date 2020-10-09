import React, { useState } from "react";
import Base from "../core/Base";

import { Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth/helper/index";

//SIGNIN
const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values; //destructure values

  const { user } = isAuthenticated();

  //HANDLE CHANGE ON INPUT
  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  //ONSUBMIT ON BUTTON
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Signin request failed"));
  };

  //PERFORM REDIRECT WHEN USE IS ADMIN OR NOT
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />; //if user is admin
      } else {
        return <Redirect to="/user/dashboard" />; //if user is customer
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />; //redirect to home is user is customer
    }
  };

  //LOADING MESSAGE
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert aler-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  //ERROR MESSAGE
  const errorMessage = () => {
    return (
      <div className="row m-3">
        <div className="col-lg-6 col-md-8 col-sm-10 offset-lg-3 offset-md-2 offset-sm-1 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  //SIGNIN FORM
  const signInForm = () => {
    return (
      <div className="row m-3">
        <div className="col-lg-6 col-md-8 col-sm-10 offset-lg-3 offset-md-2 offset-sm-1 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Signup
            </button>
          </form>
        </div>
      </div>
    );
  };

  //FUCTION RETURN
  return (
    <Base title="Sign In" description="Sign In to Explore">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

//EXPORT FUNCTION
export default Signin;
