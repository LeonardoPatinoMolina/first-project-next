import React, { useState, useContext } from "react";
import { ThemesContext } from "../context/Themes/ThemesState";

export const useTheme = () => {
  const { theme , setTheme } = useContext(ThemesContext);
  const themes = ["light", "dark"];

  const switchTheme = () => {
    const newTheme = themes.filter((t) => t !== theme);
    setTheme(newTheme[0]);
  };
  return {switchTheme, theme};
};
