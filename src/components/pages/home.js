import React, { useState } from "react";
import "./Home.css";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { t } = useTranslation();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">{t("Nom")}</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="prenom">{t("Prenom")}</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>
        <button type="submit">{t("Commencer_quiz")}</button>
      </form>
    </div>
  );
};
