import React, { useContext, useState } from "react";
import Meta from "../components/Meta";
import { PinInput } from "@mantine/core";
import { AuthContext } from "../context/AuthContext";
import { modals } from "@mantine/modals";
import { useParams } from "react-router-dom";
import { MdClose } from "react-icons/md";

const VerifyOTP = () => {
  const { id } = useParams();
  const [otp, setOTP] = useState("");
  const { verifyOTP, loading } = useContext(AuthContext);

  const handleVerify = async () => {
    const userData = {
      otp: otp,
    };
    const response = await verifyOTP(id, userData);
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
                  setOTP("");
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else {
      location.href = `/add-user-information/${id}`;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (otp.length === 6) {
        handleVerify();
      }
    }
  };
  return (
    <>
      <Meta title="Verification" />
      <div className="auth-wrapper">
        <div className="login-card text-center">
          <h1>Verification</h1>
          <p>OTP code has been sent to your email. Please enter the code you received to continue.</p>
          <PinInput length={6} type="number" value={otp} onChange={(value) => setOTP(value)} disabled={loading} autoFocus onKeyDown={handleKeyDown}  />
          <button className={`${loading && "disabled"} ${otp.length < 6 && "disabled"} btn btn-success w-100`} onClick={handleVerify}>
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
