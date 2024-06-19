import React, { useContext, useEffect, useState } from "react";
import Meta from "../components/Meta";
import { AuthContext } from "../context/AuthContext";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, error } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
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
            <p className="text-center">{error}</p>
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
    }
  }, [error]);

  const handleRegister = async () => {
    if (confirmPassword !== password) {
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
            <p className="text-center">Password and confirm password not equal</p>
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
    }
    const userData = {
      email,
      password,
    };
    const data = await register(userData);
    if (data) {
      location.href = `/verify-otp/${data.id}`;
    }
  };

  return (
    <>
      <Meta title="Register" />
      <div className="auth-wrapper">
        <div className="login-card text-center">
          <h1>Register</h1>
          <input type="email" className="w-100" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="w-100" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" className="w-100" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button className="btn btn-success w-100" onClick={handleRegister}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
