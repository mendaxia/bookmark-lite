import React, { useState } from "react";

import "./style.scss";

export default function ThemeToggle({ toggleTheme }) {
  const [theme, setTheme] = useState("light");
  const handleToggleTheme = () => {
    let changedTheme = theme === "light" ? "dark" : "light";
    setTheme(changedTheme);
    toggleTheme(changedTheme);
  };
  return (
    <div id="toggle" className={`${theme === "light" ? "ligth" : "dark"}`}>
      <div id="sun-moon" onClick={() => handleToggleTheme()}></div>
    </div>
  );
}
