"use client";

import { Switch } from "@/components/ui/Switch";
import { useTheme } from "next-themes";

function ToggleDarkMode() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      onClick={toggleTheme}
      className="flex items-center justify-center gap-3"
    >
      <Switch checked={theme === "dark"} />
      Modo Escuro
    </div>
  );
}

export default ToggleDarkMode;
