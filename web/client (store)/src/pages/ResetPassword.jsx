import React from "react";
import Meta from "../components/Meta";

const ResetPassword = () => {
  return (
    <>
      <Meta title="Reset Password" />
      <div className="auth-wrapper">
        <div className="login-card text-center">
          <h1>Reset Password</h1>
          <input type="password" className="w-100" placeholder="Password" />
          <input type="password" className="w-100" placeholder="Konfirmasi Password" />
          <button className="btn btn-success w-100">Reset</button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
