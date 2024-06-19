import React, { useContext, useEffect, useState } from "react";
import Meta from "../components/Meta";
import { PinInput } from "@mantine/core";
import { AuthContext } from "../context/AuthContext";
import { modals } from "@mantine/modals";
import { useParams } from "react-router-dom";
import { MdClose } from "react-icons/md";

const VerifyOTP = () => {
  const { id } = useParams();
  const [otp, setOTP] = useState(null);
  const { verifyOTP, error } = useContext(AuthContext);

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
                  setOTP(null);
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

  const handleVerify = async () => {
    const userData = {
      otp: +otp,
    };
    const data = await verifyOTP(id, userData);
    if (data) {
      location.href = `/add-user-information/${id}`;
    }
  };
  return (
    <>
      <Meta title="Verification" />
      <div className="auth-wrapper">
        <div className="login-card text-center">
          <h1>Verification</h1>
          <p>OTP code has been sent to your email. Please enter the code you received to continue.</p>
          <PinInput length={6} type="number" value={otp} onChange={(value) => setOTP(value)} />
          <button className="btn btn-success w-100" onClick={handleVerify}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
