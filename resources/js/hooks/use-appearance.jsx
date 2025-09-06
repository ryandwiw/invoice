import { useEffect, useState } from "react";

const THEME_MAP = {
  light: "bumblebee",   // tema DaisyUI untuk mode terang
  dark: "dark",  // tema DaisyUI untuk mode gelap
};

const prefersDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

// ✅ fungsi untuk inisialisasi theme sebelum React render
export function initializeTheme() {
  const saved = localStorage.getItem("appearance") || "system";

  let themeToApply;
  if (saved === "system") {
    themeToApply = prefersDark() ? THEME_MAP.dark : THEME_MAP.light;
  } else if (saved === "light") {
    themeToApply = THEME_MAP.light;
  } else if (saved === "dark") {
    themeToApply = THEME_MAP.dark;
  } else {
    themeToApply = saved;
  }

  document.documentElement.setAttribute("data-theme", themeToApply);
}

export function useAppearance() {
  const [appearance, setAppearance] = useState("system");

  const applyTheme = (appearanceValue) => {
    let themeToApply;

    if (appearanceValue === "system") {
      themeToApply = prefersDark() ? THEME_MAP.dark : THEME_MAP.light;
    } else if (appearanceValue === "light") {
      themeToApply = THEME_MAP.light;
    } else if (appearanceValue === "dark") {
      themeToApply = THEME_MAP.dark;
    } else {
      themeToApply = appearanceValue;
    }

    document.documentElement.setAttribute("data-theme", themeToApply);
  };

  useEffect(() => {
    const saved = localStorage.getItem("appearance") || "system";
    setAppearance(saved);
    applyTheme(saved);
  }, []);

  const updateAppearance = (newAppearance) => {
    setAppearance(newAppearance);
    localStorage.setItem("appearance", newAppearance);
    applyTheme(newAppearance);
  };

  return { appearance, updateAppearance };
}

