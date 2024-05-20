import React, { Component } from "react";
import "./LoginSignup.scss";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

class SignIn extends Component {
  state = {
    login: "",
    email: "",
    password: "",
    repeatedPassword: "",
    errorMsg: "",
    disableBtn: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (
      this.state.username.trim() === "" ||
      this.state.email.trim() === "" ||
      this.state.password === "" ||
      this.state.repeatedPassword === ""
    ) {
      this.setState({ errorMsg: "Brak danych! Uzupełnij formularz." });
      this.setState({ disableBtn: false });
      return;
    }

    this.setState({ errorMsg: "waiting" });

    let config = {
      headers: {
        "Accept-Language": "pl",
      },
    };

    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "/auth/register",
        {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          repeatedPassword: this.state.repeatedPassword,
        },
        config
      )
      .catch((err) => {
        this.setState({ errorMsg: err.response.data.message });
        this.setState({ disableBtn: false });
      });
  };

  handleDisableBtn = () => {
    this.setState({ disableBtn: true });
  };

  render() {
    let errorMsg = <div className="error-msg">{this.state.errorMsg}</div>;
    if (this.state.errorMsg === "waiting") {
      errorMsg = <div className="waiting-msg"></div>;
    }

    if (!localStorage.getItem("token")) {
      return (
        <div className="auth-container">
          <form
            className="auth-form"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            <h1 className="auth-title"> Zarejestruj </h1>
            <input
              className="auth-input"
              maxLength="30"
              type="text"
              id="username"
              placeholder="Nazwa użytkownika"
              onChange={this.handleChange}
            />
            <input
              className="auth-input"
              maxLength="30"
              type="text"
              id="email"
              placeholder="Adres email"
              onChange={this.handleChange}
            />
            <input
              className="auth-input"
              maxLength="25"
              type="password"
              id="password"
              placeholder="Hasło"
              onChange={this.handleChange}
            />
            <input
              className="auth-input"
              maxLength="25"
              type="password"
              id="repeatedPassword"
              placeholder="Powtórz hasło"
              onChange={this.handleChange}
            />
            {errorMsg}
            <div className="auth-buttons">
              <input
                className={
                  this.state.disableBtn ? "auth-btn disable-btn" : "auth-btn"
                }
                onClick={this.handleDisableBtn}
                type="submit"
                value="Zarejestruj"
              />
              <Link to="/login">
                <input className="auth-btn" type="button" value="Zaloguj" />
              </Link>
            </div>
          </form>
        </div>
      );
    } else {
      return <Navigate to="/" />;
    }
  }
}

export default SignIn;
