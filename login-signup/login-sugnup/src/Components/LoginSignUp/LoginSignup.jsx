import React from "react";
import "./LoginSignup.css";
import { useState } from "react";

// import user_icon from "..Assets/person.png";
// import email_icon from "..Assets/email.png";
// import password_icon from "..Assets/padlock.png";

const LoginSignup = () => {
  const [action, setAction] = useState("Zaloguj");

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
            <input type="text" placeholder="Nazwa użytkownika/Email" />
          </div>
        )}
        <div className="input">
          <img src="{password_icon}" alt="" />
          <input type="password" placeholder="Password" />
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
            setAction("Zarejestruj");
          }}
        >
          Zarejestruj
        </div>
        <div
          className={action === "Zarejestruj" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Zaloguj");
          }}
        >
          Zaloguj
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
