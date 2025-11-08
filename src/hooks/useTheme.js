import { useEffect, useState } from "react";

const useTheme = () => {
  // const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [theme, setTheme] = useState(() => {
    const theme = localStorage.getItem("theme");

    return theme;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      localStorage.setItem("theme", theme);
      root.classList.add("dark");
    } else {
      localStorage.setItem("theme", theme);
      root.classList.remove("dark");
    }
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
