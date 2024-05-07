import React from "react";

const Login = () => {
  return (
    <div className="auth-wrapper">
      <div className="login-card text-center">
        <h1>Alvito Game Store</h1>
        <h3>Masuk</h3>
        <input type="email" className="w-100" placeholder="Alamat Email" />
        <input type="password" className="w-100" placeholder="Password" />
        <a href="/forgot-password" className="forgot-password d-block text-decoration-underline">Lupa Password</a>
        <button className="btn btn-success w-100">Masuk</button>
      </div>
    </div>
  );
};

export default Login;
