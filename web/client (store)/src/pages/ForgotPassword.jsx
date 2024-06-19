import React, { useContext, useEffect, useState } from "react";
import Meta from "../components/Meta";
import { AuthContext } from "../context/AuthContext";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, error } = useContext(AuthContext);

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

  const handleForgotPassword = async () => {
    const data = await forgotPassword({ email });
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
            <p className="text-center">Reset password link has been successfully sent. Please check your email to reset your password</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  location.href = "/login";
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    }
  };
  return (
    <>
      <Meta title="Lupa Password" />
      <div className="auth-wrapper">
        <div className="login-card text-center">
          <h1>Lupa Password</h1>
          <p>Kami akan mengirimi Anda email untuk mengatur ulang kata sandi Anda</p>
          <input type="email" className="w-100" placeholder="Alamat Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button className="btn btn-success w-100" onClick={handleForgotPassword}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
