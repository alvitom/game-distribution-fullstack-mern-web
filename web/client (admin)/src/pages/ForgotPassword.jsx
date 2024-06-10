import React from "react";

const ForgotPassword = () => {
  return (
    <>
      <div className="auth-page">
        <div className="auth-wrapper text-center">
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
