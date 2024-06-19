import React, { useContext, useEffect, useState } from "react";
import Meta from "../components/Meta";
import { AuthContext } from "../context/AuthContext";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";
import { useParams } from "react-router-dom";

const AddUserInformation = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const { addUserInformation, error } = useContext(AuthContext);

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
                  setUsername("");
                  setFullname("");
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

  const handleAddUserInfo = async () => {
    const userData = {
      username,
      fullname,
    };
    const data = await addUserInformation(id, userData);
    if (data) {
      sessionStorage.setItem("user", JSON.stringify(data));
      location.href = "/";
    }
  };
  return (
    <>
      <Meta title="Add User Information" />
      <div className="auth-wrapper">
        <div className="login-card text-center">
          <h1>Add Your Information</h1>
          <input type="text" className="w-100" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="text" className="w-100" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
          <button className="btn btn-success w-100" onClick={handleAddUserInfo}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default AddUserInformation;
