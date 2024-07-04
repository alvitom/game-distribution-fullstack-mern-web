import React, { useEffect } from "react";
import Meta from "../components/Meta";
import { Fieldset, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(sessionStorage.getItem("user"));

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <>
      <Meta title="Profile" />
      <div className="profile-wrapper">
        <div className="container">
          <div className="row justify-content-center py-4">
            <div className="col-9">
              <div className="profile-container">
                <h1>My Profile</h1>
                <Fieldset legend="Personal information">
                  <p>ID: {}</p>
                  <TextInput label="Username" placeholder="Username" />
                  <TextInput label="Email" placeholder="Email" mt="md" />
                  <TextInput label="Full name" placeholder="Full name" />
                </Fieldset>
                <Fieldset legend="Address Information" className="mt-4">
                  <TextInput label="Address" placeholder="Address" />
                  <TextInput label="City" placeholder="City" />
                  <TextInput label="Postal Code" placeholder="Postal Code" />
                  <TextInput label="Country" placeholder="Country" />
                </Fieldset>
                <button type="button" className="btn btn-success w-100 mt-4">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
