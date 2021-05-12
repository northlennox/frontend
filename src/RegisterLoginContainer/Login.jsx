import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as EmailValidator from "email-validator";
import "./Login.scss";

import { ElForm } from "../Shared/Form/Form";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      info: {},
      errors: true,
    };
    this.inputs = [
      {
        id: "email",
        text: "EMAIL",
        errorText: "Please enter a valid email address",
        errorId: "EmailError",
        handleChange: this.handleInputChange,
        handleBlur: this.handleBlur,
      },
      {
        id: "password",
        text: "PASSWORD",
        errorText: "Passwords must be six or more characters",
        errorId: "PasswordError",
        type: "password",
        handleChange: this.handleInputChange,
        handleBlur: this.handleBlur,
      },
    ];
  }
  handleInputChange = (e) => {
    let { name, value } = e.target;
    this.handleBlur(e);
    let arr = value.split("");

    // General Bad Statements

    if (!value) return;

    if (value[value.length - 1] === " ") {
      arr.pop();
      e.target.value = arr.join("");
      return;
    }

    const info = { ...this.state.info };
    info[name] = value;
    this.setState({ info });
  };

  handleBlur = (e) => {
    this.setState({ errors: true });
    const { value, name } = e.target;
    if (!value) return true;

    if (name == "email" && !EmailValidator.validate(value)) {
      return true;
    }

    if (name == "password" && value.length < 6) {
      return true;
    }
    const { info } = this.state;
    if (Object.keys(info).length === this.inputs.length)
      this.setState({ errors: false });

    return false;
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const { info } = this.state;
    console.log(info);

    //this.fetchLogin(updatedLogin);
  };

  fetchLogin = async (updatedLogin) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(updatedLogin),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const parsedResponse = await response.json();
      console.log(parsedResponse.status);
      if (parsedResponse.status !== 401) {
        updatedLogin.successful = true;
        this.setState({
          login: updatedLogin,
        });

        sessionStorage.setItem("userId", parsedResponse.userId);
        this.props.history.push("/home");
      } else {
        alert("Incorrect email or password.");
      }
    } catch (err) {
      alert("Incorrect email or password.");
    }
  };

  render() {
    return (
      <div className="custom-heigh-login">
        <ElForm
          options={{
            submitButtonText: "Log In",
            inputs: this.inputs,
            errors: this.state.errors,
            handleSubmit: this.handleSubmit,
            extraAfterSubmit: (
              <div className="row justify-content-center  align-items-center singup-background mt-3 ">
                <p className="pt-2">
                  Don’t have an account ? <Link to="/signup"> Sign up </Link>
                </p>
              </div>
            ),
          }}
        />
      </div>
    );
  }
}
export default Login;
