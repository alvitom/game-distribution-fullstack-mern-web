import React, { useContext, useEffect, useState } from "react";
import Meta from "../components/Meta";
import { AuthContext } from "../context/AuthContext";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(sessionStorage.getItem("user"));

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { changePassword, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  const handleChangePassword = async () => {
    const userData = {
      currentPassword,
      newPassword: newPassword.trim(),
      confirmPassword: confirmPassword.trim(),
    };

    const response = await changePassword(userData);

    if (!response.success) {
      const errorMessage = response.message;
      showErrorModal(errorMessage);
    } else {
      showSuccessModal(response.message);
    }
  };

  const showErrorModal = (message) => {
    modals.open({
      radius: "md",
      size: "xs",
      centered: true,
      withCloseButton: false,
      children: (
        <>
          <div className="d-flex justify-content-center mb-2">
            <MdClose style={{ width: 100 + "px", height: 100 + "px", color: "rgb(220, 53, 69)" }} />
          </div>
          <p className="text-center">{message}</p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-light" onClick={closeModal}>
              Close
            </button>
          </div>
        </>
      ),
    });
  };

  const showSuccessModal = (message) => {
    modals.open({
      radius: "md",
      size: "xs",
      centered: true,
      withCloseButton: false,
      children: (
        <>
          <div className="d-flex justify-content-center mb-2">
            <FaCheck style={{ width: 100 + "px", height: 100 + "px", color: "rgb(25, 135, 84)" }} />
          </div>
          <p className="text-center">{message}</p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-light" onClick={logoutAndRedirect}>
              OK
            </button>
          </div>
        </>
      ),
    });
  };

  const closeModal = () => {
    modals.closeAll();
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const logoutAndRedirect = () => {
    sessionStorage.removeItem("user");
    location.href = "/";
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (currentPassword && newPassword && confirmPassword) {
        handleChangePassword();
      }
    }
  };
  return (
    <>
      <Meta title="Change Password" />
      <div className="change-password-wrapper pt-4">
        <div className="auth-card text-center">
          <h1>Change Password</h1>
          <input type="password" className="w-100" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required autoFocus onKeyDown={handleKeyDown} maxLength={20} disabled={loading} />
          <input type="password" className="w-100" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required onKeyDown={handleKeyDown} maxLength={20} disabled={loading} />
          <input type="password" className="w-100" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required onKeyDown={handleKeyDown} maxLength={20} disabled={loading} />
          <button className={`${loading && "disabled"} ${!(currentPassword && newPassword && confirmPassword) && "disabled"} btn btn-success w-100`} onClick={handleChangePassword}>
            {loading ? "Loading..." : "Change"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
