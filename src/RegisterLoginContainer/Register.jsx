import React, { Component } from "react";
import * as EmailValidator from "email-validator";
import swal from "sweetalert";
import { ElForm } from "../Shared/Form/Form";

import Nav from "../Nav";
import "./Register.scss";

//////////// THIS CODE MUST BE REFACTORED  ///////////////

class RegisterLoginContainer extends Component {
  constructor() {
    super();

    this.state = {
      info: {},
      errors: true,
      mobileNotifications: false,
      emailNotifications: false,
      loading: false,
    };
    this.inputs = [
      {
        id: "firstName",
        text: "First Name",
        errorText: "Please enter your first name ",
        errorId: "FirstNameError",
        handleChange: this.handleInputChange,
        handleBlur: this.handleBlur,
      },
      {
        id: "lastName",
        text: "Last Name",
        errorText: "Please enter your last name  ",
        errorId: "LastNameError",
        handleChange: this.handleInputChange,
        handleBlur: this.handleBlur,
      },
      {
        id: "phone",
        text: "Phone Number",
        errorText: "Please enter your phone number  ",
        errorId: "PhoneNumberError",
        handleChange: this.handleInputChange,
        handleBlur: this.handleBlur,
      },
      {
        id: "email",
        text: "Email Address",
        errorText: "Please enter a valid email address",
        errorId: "EmailError",
        handleChange: this.handleInputChange,
        handleBlur: this.handleBlur,
      },
      {
        id: "password",
        text: "Enter your password",
        errorText: "Passwords must be six or more characters",
        errorId: "PasswordError",
        type: "password",
        handleChange: this.handleInputChange,
        handleBlur: this.handleBlur,
      },
    ];
    this.checkboxes = [
      {
        id: "emailCheck",
        text: "Agree to receive email notifications ",
        handleClick: this.handleCheckboxClick,
        name: "emailNotifications",
      },
      {
        id: "MobileCheck",
        text: "Agree to receive mobile notifications ",
        handleClick: this.handleCheckboxClick,
        name: "mobileNotifications",
      },
    ];
  }

  handleCheckboxClick = (e) => {
    const { checked, name } = e.target;

    const info = {};
    info[name] = checked;

    this.setState({ [name]: checked });
    console.log({ info });
  };

  handleBlur = (e) => {
    this.setState({ errors: true });
    const { value, name } = e.target;
    if (!value) return true;

    if (name == "email" && !EmailValidator.validate(value)) {
      return true;
    }
    if (name == "phone") {
      if (value.length < 13) {
        return true;
      }
    }

    if (name == "password" && value.length < 6) {
      return true;
    }
    const { info } = this.state;
    if (Object.keys(info).length === this.inputs.length)
      this.setState({ errors: false });

    return false;
  };

  handleRegisterSubmit = (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    setTimeout(() => {
      this.setState({ loading: false });
      let userInfo = this.state;
      const info = {};
      this.setState({ info });
      this.setState({ emailNotifications: false });
      this.setState({ mobileNotifications: false });

      if (userInfo.info.email === "ivo@gmail.com") {
        console.log(userInfo.info.email);
        swal({
          title: "This email address has been taken.",
          text: " Do you already have an account?",
          icon: "error",
          button: "Try Again",
        });
        return;
      }
      delete userInfo.errors;
      delete userInfo.loading;
      console.log("sendng user info ", userInfo);
    }, 5000);
  };

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

    // First Name and Last Name Formats

    if (name === "firstName" || name === "lastName") {
      if (value[value.length - 1].match("[^A-Za-z]") != null) {
        arr.pop();
        e.target.value = arr.join("");
        return;
      }
    }

    // Phone Format

    if (name === "phone") {
      if (isNaN(value[value.length - 1]) || value.length > 13) {
        arr.pop();
        e.target.value = arr.join("");
        return;
      }
      if (arr.length >= 3 && arr.indexOf("(") === -1) arr.unshift("(");
      if (arr.length >= 4 && arr.indexOf(")") === -1) arr.splice(4, 0, ")");
      if (arr.length >= 8 && arr.indexOf("-") === -1) arr.splice(8, 0, "-");
      e.target.value = arr.join("");
    }

    const info = { ...this.state.info };
    info[name] = value;
    this.setState({ info });
  };

  fetchRegister = async (e) => {
    console.log(e);
    return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth`, {
        method: "POST",
        credentials: "include",
        // body: JSON.stringify(updatedRegister),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const parsedResponse = await response.json();

      sessionStorage.setItem("userId", parsedResponse.userId);

      this.props.history.push("/home");
    } catch (err) {
      alert(
        "This email address has been taken. Do you already have an account?"
      );
    }
  };

  render() {
    return this.state.loading ? (
      <div className="row  no-gutters justify-content-center  align-items-center custom-height ">
        <div className="spinner-border" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    ) : (
      <ElForm
        options={{
          handleSubmit: this.handleRegisterSubmit,
          inputs: this.inputs,
          checkboxes: this.checkboxes,
          errors: this.state.errors,
          submitButtonText: "SIGN UP ",
        }}
      />
    );
  }
}
export default RegisterLoginContainer;
