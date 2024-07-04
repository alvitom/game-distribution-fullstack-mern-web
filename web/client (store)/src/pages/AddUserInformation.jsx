import React, { useContext, useState } from "react";
import Meta from "../components/Meta";
import { AuthContext } from "../context/AuthContext";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";
import { useParams } from "react-router-dom";

const AddUserInformation = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const { addUserInformation, loading } = useContext(AuthContext);

  const handleAddUserInfo = async () => {
    const userData = {
      username,
      fullname,
    };
    const response = await addUserInformation(id, userData);
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
    } else {
      sessionStorage.setItem("user", JSON.stringify(response.data));
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
          <button className={`${loading && "disabled"} btn btn-success w-100`} onClick={handleAddUserInfo}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddUserInformation;
