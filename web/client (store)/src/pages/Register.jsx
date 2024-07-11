import React, { useContext, useState } from "react";
import Meta from "../components/Meta";
import { AuthContext } from "../context/AuthContext";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, loading } = useContext(AuthContext);

  const handleRegister = async () => {
    const userData = {
      email,
      password,
      confirmPassword,
    };
    const response = await register(userData);
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
                  setConfirmPassword("");
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else {
      location.href = `/verify-otp/${response.data.id}`;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (email && password && confirmPassword) {
        handleRegister();
      }
    }
  };
  return (
    <>
      <Meta title="Register" />
      <div className="auth-wrapper">
        <div className="login-card text-center">
          <h1>Register</h1>
          <input type="email" className="w-100" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required onKeyDown={handleKeyDown} autoFocus maxLength={50} disabled={loading} />
          <input type="password" className="w-100" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required onKeyDown={handleKeyDown} maxLength={20} disabled={loading} />
          <input type="password" className="w-100" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required onKeyDown={handleKeyDown} maxLength={20} disabled={loading} />
          <button className={`${loading && "disabled"} ${!(email && password && confirmPassword) && "disabled"} btn btn-success w-100`} onClick={handleRegister}>
            {loading ? "Loading..." : "Register"}
          </button>
          <div className="d-flex align-items-center justify-content-center gap-2 mt-4">
            <span>Already have an account?</span>
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
