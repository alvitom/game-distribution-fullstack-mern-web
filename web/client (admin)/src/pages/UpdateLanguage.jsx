import { Input } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { modals } from "@mantine/modals";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { LanguageContext } from "../context/LanguageContext";

const UpdateLanguage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { languages, setLanguages, selectedLanguage, fetchLanguage, updateLanguage } = useContext(LanguageContext);

  const [language, setLanguage] = useState({
    language: "",
  });

  useEffect(() => {
    fetchLanguage(id);
  }, [id]);

  useEffect(() => {
    if (selectedLanguage) {
      setLanguage({
        language: selectedLanguage.language,
      });
    }
  }, [selectedLanguage]);

  const handleUpdateLanguage = async () => {
    const data = await updateLanguage(id, language);
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
            <p className="text-center">Update language success</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  navigate("/languages");
                  setLanguages(languages.map((language) => (language._id === id ? data : language)));
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
            <p className="text-center">Update language failed</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  setLanguage({ language: selectedLanguage.language });
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
      <div className="update-language-wrapper">
        <h1>Update Language</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="language">Language</label>
            <Input placeholder="Language" size="md" id="language" value={language.language} onChange={(e) => setLanguage((prevLanguage) => ({ ...prevLanguage, language: e.target.value }))} />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-success w-25" onClick={handleUpdateLanguage}>
              Update Language
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateLanguage;
