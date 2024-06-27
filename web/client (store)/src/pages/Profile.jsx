import React, { useState } from "react";
import Meta from "../components/Meta";
import { Box, Fieldset, NavLink, TextInput } from "@mantine/core";
import { MdOutlineAccessTimeFilled, MdManageAccounts } from "react-icons/md";
import { FaExchangeAlt, FaTrash } from "react-icons/fa";

const data = [
  { icon: <MdManageAccounts />, label: "Account Information" },
  {
    icon: <FaExchangeAlt />,
    label: "Change Password",
    class: "mt-3",
  },
  { icon: <MdOutlineAccessTimeFilled />, label: "Transactions", class: "mt-3" },
  { icon: <FaTrash />, label: "Delete Account", class: "mt-3", color: "red" },
];

const Profile = () => {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      href="#required-for-focus"
      key={item.label}
      active={index === active}
      label={item.label}
      leftSection={item.icon}
      onClick={() => setActive(index)}
      className={item.class}
      color={item.color}
    />
  ));
  return (
    <>
      <Meta title="Profile" />
      <div className="profile-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="profile-Navlink-container">
                <Box>{items}</Box>
              </div>
            </div>
            <div className="col-8">
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
