"use client";
import { createContext, useReducer, useEffect } from "react";
import { ThemesReducer } from "./ThemesReducer";
import { changeTheme } from "../../lib/changeTheme";

export const ThemesContext = createContext();

export const ThemesState = ({ children }) => {

  const [state, dispatch] = useReducer(ThemesReducer, "light");

  const setTheme = (theme) => {
      changeTheme(theme);
      dispatch({
        type: "SET_THEME",
        payload: theme,
      });
  };

  return (
    <ThemesContext.Provider value={{ ...state, setTheme }}>
      {children}
    </ThemesContext.Provider>
  );
};
