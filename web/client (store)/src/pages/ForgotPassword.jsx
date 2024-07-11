import React, { useContext, useState } from "react";
import Meta from "../components/Meta";
import { AuthContext } from "../context/AuthContext";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, loading } = useContext(AuthContext);

  const handleForgotPassword = async () => {
    const response = await forgotPassword({ email });
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
                  setEmail("");
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (email) {
        handleForgotPassword();
      }
    }
  };
  return (
    <>
      <Meta title="Forgot Password" />
      <div className="auth-wrapper">
        <div className="login-card text-center">
          <h1>Forgot Password</h1>
          <p>Please enter your email address</p>
          <input type="email" className="w-100" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus onKeyDown={handleKeyDown} maxLength={50} disabled={loading} />
          <button className={`${loading && "disabled"} ${!email && "disabled"} btn btn-success w-100`} onClick={handleForgotPassword}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
