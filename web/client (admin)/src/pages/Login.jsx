import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    const userData = {
      email,
      password,
    };
    const data = await login(userData);
    if (data) {
      sessionStorage.setItem("user", JSON.stringify(data));
    } else {
      modals.open({
        radius: "md",
        size: "xs",
        centered: true,
        withCloseButton: false,
        children: (
          <>
            <div className="d-flex justify-content-center mb-2">
              <MdClose style={{ width: 100 + "px", height: 100 + "px", color: "rgb(220, 53, 69)" }} />
            </div>
            <p className="text-center">Wrong email or password</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  setEmail("");
                  setPassword("");
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    }
    const getUser = JSON.parse(sessionStorage.getItem("user"));
    if (getUser) {
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
