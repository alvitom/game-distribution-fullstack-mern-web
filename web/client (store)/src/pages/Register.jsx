import React from "react";
import Meta from "../components/Meta";

const Register = () => {
  return (
    <>
    <Meta title="Daftar" />
    <div className="auth-wrapper">
      <div className="login-card text-center">
        <h1>Buat Akun</h1>
        <input type="email" className="w-100" placeholder="Alamat Email" />
        <input type="text" className="w-100" placeholder="Username" />
        <input type="password" className="w-100" placeholder="Password" />
        <input type="password" className="w-100" placeholder="Konfirmasi Password" />
        <button className="btn btn-success w-100">Daftar</button>
      </div>
    </div>
    </>
  );
};

export default Register;
