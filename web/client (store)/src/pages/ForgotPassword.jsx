import React from "react";
import Meta from "../components/Meta";

const ForgotPassword = () => {
  return (
    <>
    <Meta title="Lupa Password" />
      <div className="auth-wrapper">
        <div className="login-card text-center">
          <h1>Lupa Password</h1>
          <p>Kami akan mengirimi Anda email untuk mengatur ulang kata sandi Anda</p>
          <input type="email" className="w-100" placeholder="Alamat Email" />
          <button className="btn btn-success w-100">Submit</button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
