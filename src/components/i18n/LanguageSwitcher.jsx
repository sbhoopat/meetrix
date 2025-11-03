// 📁 src/i18n/LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 p-2">
      <select
        onChange={changeLanguage}
        value={i18n.language}
        className="border border-gray-300 rounded-md px-2 py-1 text-[#002133]"
      >
        <option value="en">English</option>
        <option value="te">తెలుగు</option>
      </select>
    </div>
  );
}
