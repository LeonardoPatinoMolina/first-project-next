import { createContext, useReducer, useEffect } from "react";
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
  function initTheme(){
    const th = window.localStorage.getItem('theme') || 'light';
    console.log('theme initialized');
    setStorageTheme(th)
    changeTheme(th);
    dispatch({
      type: 'INIT_THEME',
      payload: th
    })

  }
  return (
    <ThemesContext.Provider value={{...state, setTheme, initTheme}}>
      {children}
    </ThemesContext.Provider>
  )
}
