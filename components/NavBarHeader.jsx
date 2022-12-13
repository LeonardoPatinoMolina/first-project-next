"use client";
import React, { useRef, useState } from "react";
import styles from "../Styles/NavBarHeader.module.css";
import { Logo } from "./Logo";
import { LateralMenu } from "./LateralMenu";
import { useRouter } from "next/router";

export const NavBarHeader = () => {
  const [LateralMenuOpen, setLateralMenuOpen] = useState(false);

  const router = useRouter();
  const goHome = () => router.push("/");
  const goSearch = () => router.push("/search/a");
  const goFavorite = () => router.push("/favorites");
  const goMyHeros = () => router.push("/myheros");
  const goTop = ()=>{
    if (typeof window !== undefined){
      const scrollS = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollS > 0) scrollTo(0,0)
    }
  }
  return (
    <>
      <div id="top_screen_marc" style={{ position: "absolute", top: 0 }}></div>
      <nav className={styles.navegation_header}>
        <ul className={styles.navegation_list}>
          <li
            className={styles.navegation_item}
            onClick={goHome}
            title="Inicio"
          >
            <Logo size={55} color="#ffffff" />
          </li>
          <li
            className={styles.navegation_item}
            onClick={goSearch}
            title="Mis Favoritos"
          >
            <span className={styles.desc_icon}>BUSCAR</span>
            <span className={`material-icons ${styles.item}`}>search</span>
          </li>
          <li
            className={styles.navegation_item}
            onClick={goFavorite}
            title="Mis Favoritos"
          >
            <span className={styles.desc_icon}>FAVORITOS</span>
            <span className={`material-icons ${styles.item}`}>grade</span>
          </li>
          <li
            className={styles.navegation_item}
            title="Mis Héroes"
            onClick={goMyHeros}
          >
            <span className={styles.desc_icon}>MIS HÉROES</span>
            <span className={`material-icons ${styles.item}`}>edit</span>
          </li>
          <li
            className={`${styles.navegation_item}`}
            onClick={() => setLateralMenuOpen(true)}
            title="menu"
          >
            <span className={styles.desc_icon}>MENU</span>
            <span className={`material-icons ${styles.item}`}>menu</span>
          </li>
        </ul>
      </nav>
      <LateralMenu open={LateralMenuOpen} open_function={setLateralMenuOpen} />
      <div title="Volver arriba" onClick={goTop} className={`boton ${styles.btn_up}`}>
        <span className="material-icons">keyboard_arrow_up</span>
      </div>
    </>
  );
};
