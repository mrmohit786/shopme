import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper";
import { Link } from "react-router-dom";

//SIGNUP FUNCTION
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values; //destructure values

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
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  //SUCCESS MESSAGE
  const successMessage = () => {
    return (
      <div className="row m-3">
        <div className="col-lg-6 col-md-8 col-sm-10 offset-lg-3 offset-md-2 offset-sm-1 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link className="text-dark" to="/signin">
              Login Here
            </Link>
          </div>
        </div>
      </div>
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

  //SIGNUPFORM
  const signUpForm = () => {
    return (
      <div className="row m-3">
        <div className="col-lg-6 col-md-8 col-sm-10 offset-lg-3 offset-md-2 offset-sm-1 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark">Name</label>
              <input
                onChange={handleChange("name")}
                className="form-control"
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                onChange={handleChange("email")}
                className="form-control"
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
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

  //FUNCTION RETURN
  return (
    <Base title="Sign up" description="Register to the website">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

//EXPORT FUNCTION
export default Signup;
