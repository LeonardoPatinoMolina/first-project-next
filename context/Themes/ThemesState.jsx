import { createContext, useReducer } from "react";
import { ThemesReducer } from "./ThemesReducer";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import { changeTheme } from "../../lib/changeTheme";

export const ThemesContext = createContext();

export const ThemesState = ({ children }) => {
  const [storageTheme, setStorageTheme] = useLocalStorage('theme', 'light');
  const initialState = {
    theme: storageTheme,
  }
  const [state, dispatch] = useReducer(ThemesReducer, 
    initialState)

  const setTheme = (theme)=>{
    setStorageTheme(theme)
    changeTheme(theme);
    dispatch({
      type: 'SET_THEME',
      payload: theme
    })
  }
  return (
    <ThemesContext.Provider value={{...state, setTheme}}>
      {children}
    </ThemesContext.Provider>
  )
}
