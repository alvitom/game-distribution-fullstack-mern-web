import React from "react";

const ResetPassword = () => {
  return (
    <>
      <div className="auth-page">
        <div className="auth-wrapper text-center">
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
