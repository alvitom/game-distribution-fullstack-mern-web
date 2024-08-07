import React, { useContext, useState } from "react";
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
  const { resetPassword, loading } = useContext(AuthContext);

  const handleResetPassword = async () => {
    const userData = {
      password,
      confirmPassword,
    };
    const response = await resetPassword(token, userData);
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
            <p className="text-center">{response.message}</p>
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (password && confirmPassword) {
        handleResetPassword();
      }
    }
  };
  return (
    <>
      <Meta title="Reset Password" />
      <div className="auth-wrapper">
        <div className="login-card text-center">
          <h1>Reset Password</h1>
          <input type="password" className="w-100" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoFocus onKeyDown={handleKeyDown} maxLength={20} disabled={loading} />
          <input type="password" className="w-100" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required onKeyDown={handleKeyDown} maxLength={20} disabled={loading} />
          <button className={`${loading && "disabled"} ${!(password && confirmPassword) && "disabled"} btn btn-success w-100`} onClick={handleResetPassword}>
            {loading ? "Loading..." : "Reset"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
