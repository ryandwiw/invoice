// import { useEffect, useState } from "react";

// const THEME_MAP = {
//   light: "cupcake",   // tema DaisyUI untuk mode terang
//   dark: "forest",  // tema DaisyUI untuk mode gelap
// };

// const prefersDark = () =>
//   window.matchMedia("(prefers-color-scheme: dark)").matches;

// // ✅ fungsi untuk inisialisasi theme sebelum React render
// export function initializeTheme() {
//   const saved = localStorage.getItem("appearance") || "system";

//   let themeToApply;
//   if (saved === "system") {
//     themeToApply = prefersDark() ? THEME_MAP.dark : THEME_MAP.light;
//   } else if (saved === "light") {
//     themeToApply = THEME_MAP.light;
//   } else if (saved === "dark") {
//     themeToApply = THEME_MAP.dark;
//   } else {
//     themeToApply = saved;
//   }

//   document.documentElement.setAttribute("data-theme", themeToApply);
// }

// export function useAppearance() {
//   const [appearance, setAppearance] = useState("system");

//   const applyTheme = (appearanceValue) => {
//     let themeToApply;

//     if (appearanceValue === "system") {
//       themeToApply = prefersDark() ? THEME_MAP.dark : THEME_MAP.light;
//     } else if (appearanceValue === "light") {
//       themeToApply = THEME_MAP.light;
//     } else if (appearanceValue === "dark") {
//       themeToApply = THEME_MAP.dark;
//     } else {
//       themeToApply = appearanceValue;
//     }

//     document.documentElement.setAttribute("data-theme", themeToApply);
//   };

//   useEffect(() => {
//     const saved = localStorage.getItem("appearance") || "system";
//     setAppearance(saved);
//     applyTheme(saved);
//   }, []);

//   const updateAppearance = (newAppearance) => {
//     setAppearance(newAppearance);
//     localStorage.setItem("appearance", newAppearance);
//     applyTheme(newAppearance);
//   };

//   return { appearance, updateAppearance };
// }

import { useEffect, useState, useCallback } from "react";

const THEME_MAP = {
  light: "cupcake",   // tema DaisyUI mode terang
  dark: "forest",     // tema DaisyUI mode gelap
};

const prefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

// ✅ inisialisasi theme sebelum React render (dipanggil di _app atau layout root)
export function initializeTheme() {
  const saved = localStorage.getItem("appearance") || "system";

  let themeToApply;
  if (saved === "system") {
    themeToApply = prefersDark() ? THEME_MAP.dark : THEME_MAP.light;
  } else {
    themeToApply = THEME_MAP[saved] || saved;
  }

  document.documentElement.setAttribute("data-theme", themeToApply);
}

export function useAppearance() {
  const [appearance, setAppearance] = useState("system");

  const applyTheme = useCallback((appearanceValue) => {
    let themeToApply;
    if (appearanceValue === "system") {
      themeToApply = prefersDark() ? THEME_MAP.dark : THEME_MAP.light;
    } else {
      themeToApply = THEME_MAP[appearanceValue] || appearanceValue;
    }
    document.documentElement.setAttribute("data-theme", themeToApply);
  }, []);

  // ⏳ hanya sekali saat mount
  useEffect(() => {
    const saved = localStorage.getItem("appearance") || "system";
    setAppearance(saved);
    applyTheme(saved);
  }, [applyTheme]);

  const updateAppearance = (newAppearance) => {
    // ⚡ langsung apply ke DOM tanpa delay
    applyTheme(newAppearance);

    // 🔒 simpan ke localStorage
    localStorage.setItem("appearance", newAppearance);

    // 🖼️ state internal buat UI dropdown / toggle doang
    setAppearance(newAppearance);
  };

  return { appearance, updateAppearance };
}

