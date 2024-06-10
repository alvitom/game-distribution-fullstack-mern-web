import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    const userData = {
      email,
      password,
    };
    await login(userData);
    const token = sessionStorage.getItem("user");
    if (token) {
      location.href = "/";
    }
  };

  return (
    <>
      <div className="auth-page">
        <div className="auth-wrapper text-center">
          <h1>Masuk Admin</h1>
          <input type="email" className="w-100" placeholder="Alamat Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="w-100" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <a href="/forgot-password" className="forgot-password">
            Lupa Password
          </a>
          <button className="btn btn-success w-100" onClick={handleLogin}>
            Masuk
          </button>
          {/* <div className="d-flex align-items-center justify-content-center gap-2 mt-4">
            <span>Belum punya akun?</span>
            <a href="/sign-up">Daftar</a>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
