import React, { Component } from "react";
import axios from "axios";
import "./LoginSignup.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      repeatedPassword: "",
      errorMsg: "",
      disableBtn: false,
      action: "Zaloguj", // Dodane, aby uniknąć błędu z undefined
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { action } = this.state; // Dodane

    return (
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Login" ? (
            <div></div>
          ) : (
            <div className="input">
              <img src="{user_icon}" alt="" />
              <input
                type="text"
                placeholder="Nazwa użytkownika"
                id="username"
                value={this.state.username} // Dodane
                onChange={(e) => this.setState({ username: e.target.value })} // Dodane
              />
            </div>
          )}
          <div className="input">
            <img src="{password_icon}" alt="" />
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={this.state.email} // Dodane
              onChange={(e) => this.setState({ email: e.target.value })} // Dodane
            />
          </div>
          <div className="input">
            <img src="{password_icon}" alt="" />
            <input
              type="password"
              placeholder="Hasło"
              id="password"
              value={this.state.password} // Dodane
              onChange={(e) => this.setState({ password: e.target.value })} // Dodane
            />
          </div>
          <div className="input">
            <img src="{password_icon}" alt="" />
            <input
              type="password"
              placeholder="Powtórz Hasło"
              id="repeatedPassword"
              value={this.state.repeatedPassword} // Dodane
              onChange={
                (e) => this.setState({ repeatedPassword: e.target.value }) // Dodane
              }
            />
          </div>
        </div>
        {action === "Zarejestruj" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Nie pamiętasz hasła? <span>Kliknij tutaj!</span>
          </div>
        )}

        <div className="submit-container">
          <div
            className={action === "Zaloguj" ? "submit gray" : "submit"}
            onClick={() => {
              if (action === "Zarejestruj") {
                this.handleSubmit();
              } else {
                this.setState({ action: "Zarejestruj" });
              }
            }}
          >
            Zarejestruj
          </div>
          <div
            className={action === "Zarejestruj" ? "submit gray" : "submit"}
            onClick={() => {
              if (action === "Zaloguj") {
                this.handleSubmit();
              } else {
                axios
                  .post(process.env.REACT_APP_SERVER_URL + "/auth/register", {
                    emailAddress: this.state.email,
                    username: this.state.username,
                    matchingPassword: this.state.repeatedPassword,
                    password: this.state.password,
                    userName: "",
                  })
                  .then((res) => {
                    axios
                      .post(process.env.REACT_APP_SERVER_URL + "/auth/login", {
                        Token: "",
                        username: this.state.username,
                        password: this.state.password,
                      })
                      .then((res) => {
                        localStorage.setItem("token", res.data);
                        window.location.reload();
                        this.props.history.push("/");
                      })
                      .catch((err) =>
                        this.setState({ errorMsg: err.response.data.message })
                      );
                  })
                  .catch((err) => {
                    this.setState({ errorMsg: err.response.data.message });
                    this.setState({ disableBtn: false });
                  });
              }
            }}
          >
            Zaloguj
          </div>
        </div>
      </div>
    );
  }

  handleSubmit = () => {
    axios
      .post("http://localhost:8080/auth/register", {
        emailAddress: this.state.email,
        username: this.state.username,
        matchingPassword: this.state.repeatedPassword,
        password: this.state.password,
        userName: "",
      })
      .then((res) => {
        axios
          .post(process.env.REACT_APP_SERVER_URL + "/auth/login", {
            Token: "",
            username: this.state.username,
            password: this.state.password,
          })
          .then((res) => {
            localStorage.setItem("token", res.data);
            window.location.reload();
            this.props.history.push("/");
          })
          .catch((err) =>
            this.setState({ errorMsg: err.response.data.message })
          );
      })
      .catch((err) => {
        this.setState({ errorMsg: err.response.data.message });
        this.setState({ disableBtn: false });
      });
  };
}

export default SignIn;
