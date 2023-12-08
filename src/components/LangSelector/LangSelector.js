import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./LangSelector.css";

function LangSelector() {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("fr");

  const changeLanguage = (event) => {
    setSelectedLang(event.target.value);
    i18n.changeLanguage(event.target.value);
  };
  return (
    <div onChange={changeLanguage} className="language-container">
      <select name="language-select">
        <option
          type="select"
          value="fr"
          name="language"
          defaultChecked={selectedLang === "fr"}
          className="fr"
        >
          FR
        </option>
        <option
          type="select"
          value="en"
          name="language"
          defaultChecked={selectedLang === "en"}
          className="en"
        >
          EN
        </option>
      </select>
    </div>
  );
}

export default LangSelector;
