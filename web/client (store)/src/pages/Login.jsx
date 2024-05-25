import React from "react";
import Meta from "../components/Meta";

const Login = () => {
  return (
    <>
      <Meta title="Masuk" />
      <div className="auth-wrapper">
        <div className="login-card text-center">
          <h1>Masuk</h1>
          <input type="email" className="w-100" placeholder="Alamat Email" />
          <input type="password" className="w-100" placeholder="Password" />
          <a href="/forgot-password" className="forgot-password d-block text-decoration-underline">
            Lupa Password
          </a>
          <button className="btn btn-success w-100">Masuk</button>
        </div>
      </div>
    </>
  );
};

export default Login;
