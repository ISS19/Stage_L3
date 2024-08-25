import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeToggleButtonProps {
  styles: Record<string, string>;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ styles }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme} className={styles.themeToggle}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggleButton;
