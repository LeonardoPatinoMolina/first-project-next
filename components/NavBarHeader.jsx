"use client";
import React, { useEffect, useState, useRef } from "react";
import { Logo } from "./Logo";
import { LateralMenu } from "./LateralMenu";
import { useRouter } from "next/router";
import { FaSearch, FaPaintBrush } from "react-icons/fa";
import { BsFillStarFill } from "react-icons/bs";
import { ImMenu } from "react-icons/im";
import styles from "../styles/NavBarHeader.module.css";

export const NavBarHeader = () => {
  const [LateralMenuOpen, setLateralMenuOpen] = useState(false);
  const router = useRouter();
  
  const goHome = () => router.push("/");
  const goSearch = () => router.push("/search/a");
  const goFavorite = () => router.push("/favorites");
  const goMyHeros = () => router.push("/myheros");
  
  return (
    <>
      <nav className={styles.navegation_header}>
        <ul className={styles.navegation_list}>
          <li
            className={styles.navegation_item}
            onClick={goHome}
            title="Inicio"
          >
            <Logo size={54} color="#ffffff" />
          </li>
          <li
            className={styles.navegation_item}
            onClick={goSearch}
            title="Buscar"
          >
            <span className={styles.desc_icon}>BUSCAR</span>
            <FaSearch className={styles.item} size={25} color="#ffffff" />
          </li>
          <li
            className={styles.navegation_item}
            onClick={goFavorite}
            title="Mis Favoritos"
          >
            <span className={styles.desc_icon}>FAVORITOS</span>
            <BsFillStarFill className={styles.item} size={25} color="#ffffff" />
          </li>
          <li
            className={styles.navegation_item}
            title="Mis Héroes"
            onClick={goMyHeros}
          >
            <span className={styles.desc_icon}>MIS HÉROES</span>
            <FaPaintBrush
              className={styles.item}
              size={25}
              color="#ffffff"
            />
          </li>
          <li
            className={`${styles.navegation_item}`}
            onClick={() => setLateralMenuOpen(true)}
            title="menu"
          >
            <span className={styles.desc_icon}>MENU</span>
            <ImMenu className={styles.item} size={25} color="#ffffff" />
          </li>
        </ul>
      </nav>
      <LateralMenu open={LateralMenuOpen} open_function={setLateralMenuOpen} />
    </>
  );
};
