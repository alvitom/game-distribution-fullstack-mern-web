import React, { useContext, useEffect, useState } from "react";
import Meta from "../components/Meta";
import { AuthContext } from "../context/AuthContext";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error } = useContext(AuthContext);

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

  const handleResetPassword = async () => {
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
    const data = await resetPassword(token, { password });
    if (data) {
      return modals.open({
        radius: "md",
        size: "xs",
        centered: true,
        withCloseButton: false,
        children: (
          <>
            <div className="d-flex justify-content-center mb-2">
              <FaCheck style={{ width: 100 + "px", height: 100 + "px", color: "rgb(25, 135, 84)" }} />
            </div>
            <p className="text-center">Your password has been successfully reset. Please login with your new password.</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  window.close();
                }}
              >
                OK
              </button>
            </div>
          </>
        ),
      });
    }
  };
  return (
    <>
      <Meta title="Reset Password" />
      <div className="auth-wrapper">
        <div className="login-card text-center">
          <h1>Reset Password</h1>
          <input type="password" className="w-100" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" className="w-100" placeholder="Konfirmasi Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button className="btn btn-success w-100" onClick={handleResetPassword}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
