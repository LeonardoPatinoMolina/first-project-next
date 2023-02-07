import React, { useState, useContext } from "react";
import { ThemesContext } from "../context/Themes/ThemesState";

export const useTheme = () => {
  const { theme , setTheme } = useContext(ThemesContext);
  const themes = {true: "light", false: "dark"};

  const switchTheme = (value) => {
    console.log(themes[value]);
    setTheme(themes[value]);
  };
  return {switchTheme, theme};
};
