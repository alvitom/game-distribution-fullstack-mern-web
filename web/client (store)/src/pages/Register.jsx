import React from "react";

const Register = () => {
  return (
    <div className="auth-wrapper">
      <div className="login-card text-center">
        <h1>Alvito Game Store</h1>
        <h3>Buat Akun</h3>
        <input type="email" className="w-100" placeholder="Alamat Email" />
        <input type="password" className="w-100" placeholder="Password" />
        <input type="password" className="w-100" placeholder="Konfirmasi Password" />
        <button className="btn btn-success w-100">Daftar</button>
      </div>
    </div>
  );
};

export default Register;
