"use client";
import React, { useRef, useEffect } from "react";
// import { Search } from "../Search";
import { useTheme } from "../../Hooks/useTheme";
import { useRouter } from "next/router";
import {
  MdOutlineClose,
  MdManageAccounts,
  MdLightMode,
  MdNightlight,
} from "react-icons/md";
import styles from "./style/LateralMenu.module.css";

export const LateralMenu = ({ open, open_function }) => {
  const { switchTheme, theme } = useTheme();
  const router = useRouter();

  const handleClick = (e) => {
    e.stopPropagation();
    open_function(false);
  };

  const goProfile = () => router.push("/profile");

  return (
    <section
      className={`${styles.cont_menu} ${
        open ? styles.open_menu : styles.close_menu
      }`}
    >
      <nav className={styles.container}>
        <ul className={styles.list}>
          <li className={`${styles.item_list}`}>
            <button className={styles.btn_exit} onClick={(e) => handleClick(e)}>
              <MdOutlineClose size={30} />
            </button>
          </li>
          <li className={styles.item_list} onClick={goProfile}>
            <MdManageAccounts size={30} />
            MI CUENTA
          </li>
          <li
            className={`${styles.item_list}`}
            onClick={() => switchTheme()}
            title="cambiar Tema"
          >
            <MdNightlight
              size={30}
              className={`material-icons ${theme === "light" && styles.hide}`}
            />
            <MdLightMode
              size={30}
              className={`material-icons ${theme === "dark" && styles.hide}`}
            />
            TEMA
          </li>
        </ul>
      </nav>
    </section>
  );
};
