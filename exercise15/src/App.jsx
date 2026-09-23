import { useState } from "react";

export default function LanguageToggle() {
  const [lang, setLang] = useState("en");

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === "en" ? "es" : "en"));
  };

  return (
    <div className="p-8">
      {/* Button Switcher */}
      <button
        onClick={toggleLanguage}
        className="px-4 py-2 border border-black rounded bg-gray-100 hover:bg-gray-200 transition-colors text-black font-medium mb-8"
      >
        {lang === "en" ? "Switch to Spanish" : "Switch to English"}
      </button>

      {/* Greeting Text */}
      <h1 className="text-5xl font-bold text-black">
        {lang === "en" ? "Hello!" : "¡Hola!"}
      </h1>
    </div>
  );
}
