"use client";
import React, { useRef, useEffect } from "react";
import { useTheme } from "../../Hooks/useTheme";
import { useRouter } from "next/router";
import {
  MdOutlineClose,
  MdManageAccounts,
} from "react-icons/md";
import {FaExternalLinkAlt} from "react-icons/fa";
import styles from "./style/LateralMenu.module.css";
import { SwitchButtom } from "../SwitchButtom";

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
              <MdOutlineClose size={30} className={styles.icons} />
            </button>
          </li>
          <li
            className={`${styles.item_list}`}
            title="cambiar Tema"
          >
            <span className={styles.especific_text}>TEMA OSCURO</span>
            <SwitchButtom action={switchTheme} value={theme === "dark"} />
          </li>
          <li className={styles.item_list} onClick={goProfile}>
            <MdManageAccounts size={30} className={styles.icons} />
            MI CUENTA
          </li>
          <li className={styles.item_list}>
            <FaExternalLinkAlt size={28} className={styles.icons}/>
            <a href="https://marvel.com" target="_blank" rel="noopener noreferrer" className={styles.hyperlink}>MARVEL.COM</a>
          </li>
        </ul>
      </nav>
    </section>
  );
};
