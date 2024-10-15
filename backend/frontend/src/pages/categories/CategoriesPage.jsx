import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../common/Navbar";
import Recipes from "../common/Recipes";

function CategoriePage() {
  const [darkMode, setDarkMode] = useState(false);
  const { categoryName } = useParams();

  return (
    <>
      <Navbar
        options={[{ title: null, href: null }]}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <main
        className={`${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } transition-colors duration-300 pt-20`}
      >
        <Recipes categoria={categoryName} darkMode={darkMode} />
      </main>
    </>
  );
}

export default CategoriePage;
