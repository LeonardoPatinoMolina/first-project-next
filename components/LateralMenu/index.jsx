"use client";
import React, { useRef } from "react";
import style from "./style/LateralMenu.module.css";
import { useTheme } from "../../Hooks/useTheme";

const {
  cont_menu,
  container,
  list,
  item_list,
  btn_exit,
  open_menu,
  close_menu,
  container_small,
  container_bigger,
} = style;

export const LateralMenu = ({ open, open_function }) => {
  const { switchTheme, theme } = useTheme();

  const mediaQuery = () => {
    if (typeof window !== "undefined") {
      const qry = matchMedia("(max-width: 450px)");
      if (qry.matches) return container_small;
      else return container_bigger;
    }
  };
  const handleClick = (e) => {
    e.stopPropagation();
    console.log("salida");
    open_function(false);
  };
  return (
    <div className={`${cont_menu} ${open ? open_menu : close_menu}`}>
      <div className={`${container} ${mediaQuery()}`}>
        <button className={btn_exit} onClick={(e) => handleClick(e)}>
          <span className="material-icons">close</span>
        </button>
        <ul className={list}>
          <li className={item_list}>
            <span className="material-icons">person</span>
            MI CUENTA
          </li>
          <li className={item_list}>
            <span className="material-icons">content_cut</span>
            BARBEROS
          </li>
          <li className={item_list}>
            <span className="material-icons">admin_panel_settings</span>
            ADMIN
          </li>
          <li
            className={`${item_list}`}
            onClick={() => switchTheme()}
            title="cambiar Tema"
          >
            <span className={`material-icons`}>
              {theme === "dark" ? "dark_mode" : "light_mode"}
            </span>
            TEMA
          </li>
        </ul>
      </div>
    </div>
  );
};
{
  /* <li
  className={`${styles.navegation_item}`}
  onClick={() => switchTheme()}
  title="cambiar Tema"
>
  <span className={styles.desc_icon}>TEMA</span>
  <span className={`material-icons ${styles.item}`}>{theme === 'dark' ? 'dark_mode' : 'light_mode'}</span>
</li> */
}
