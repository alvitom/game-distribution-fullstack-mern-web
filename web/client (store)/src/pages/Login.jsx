import React, { useContext, useState } from "react";
import Meta from "../components/Meta";
import { AuthContext } from "../context/AuthContext";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useContext(AuthContext);

  const handleLogin = async () => {
    const userData = {
      email,
      password,
    };

    const response = await login(userData);

    if (!response.success) {
      return modals.open({
        radius: "md",
        size: "xs",
        centered: true,
        withCloseButton: false,
        children: (
          <>
            <div className="d-flex justify-content-center mb-2">
              <MdClose style={{ width: 100 + "px", height: 100 + "px", color: "rgb(220, 53, 69)" }} />
            </div>
            <p className="text-center">{response.message}</p>
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
    } else {
      sessionStorage.setItem("user", JSON.stringify(response.data));
      location.href = "/";
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (email && password) {
        handleLogin();
      }
    }
  };
  return (
    <>
      <Meta title="Login" />
      <div className="auth-wrapper">
        <div className="login-card text-center">
          <h1>Login</h1>
          <input type="email" className="w-100" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} required autoFocus maxLength={50} disabled={loading} />
          <input type="password" className="w-100" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} required maxLength={20} disabled={loading} />
          <a href="/forgot-password" className="forgot-password d-block text-decoration-underline">
            Forgot Password
          </a>
          <button className={`${loading && "disabled"} ${!(email && password) && "disabled"} btn btn-success w-100`} onClick={handleLogin}>
            {loading ? "Loading..." : "Login"}
          </button>
          <div className="d-flex align-items-center justify-content-center gap-2 mt-4">
            <span>Don't have an account?</span>
            <a href="/register">Register</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
