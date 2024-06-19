import { Input } from "@mantine/core";
import React, { useContext, useState } from "react";
import { modals } from "@mantine/modals";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";

const AddLanguage = () => {
  const navigate = useNavigate();
  const { languages, setLanguages, createLanguage } = useContext(LanguageContext);

  const [language, setLanguage] = useState({
    language: "",
  });

  const handleCreateLanguage = async () => {
    const data = await createLanguage(language);
    if (data) {
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
            <p className="text-center">Add language success</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  navigate("/languages");
                  setLanguages([...languages, data]);
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else {
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
            <p className="text-center">Add language failed</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  setLanguage({ language: "" });
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
      <div className="add-language-wrapper">
        <h1>Add New Language</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="language">Language</label>
            <Input placeholder="Language" size="md" id="language" value={language.language} onChange={(e) => setLanguage((prevLanguage) => ({ ...prevLanguage, language: e.target.value }))} />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-success w-25" onClick={handleCreateLanguage}>
              Add Language
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLanguage;
