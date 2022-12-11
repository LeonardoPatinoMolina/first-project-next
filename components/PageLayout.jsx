"use client";
import React, { useState, useRef } from "react";
import { Search } from "./Search";
import styles from "../Styles/NavBarHeader.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
import { LateralMenu } from "./LateralMenu";
import { Logo } from "./Logo";
import { useSearch } from "../Hooks/useSearch";
// import { useDispatch, useSelector } from "react-redux";
// import { init_characters } from "../context/store/features/charactersRedux";

export default function PageLayout({ title, desc, children }) {
  const [LateralMenuOpen, setLateralMenuOpen] = useState(false);
  const searchFieldR = useRef();
  const initSearch = useSearch();
  // const dispath = useDispatch();
  // const {character} = useSelector(state=>state.characters);

  // const [value, setValue] = useState(""); //datos ingresado en input de compomnente hijo
  const router = useRouter();
  const goHome = () => router.push("/");
  const goFavorite = () => router.push("/favorites");
  const goMyHeros = () => router.push("/myheros");

  const handleSearch = async () => {
    const value = searchFieldR.current.value;
    const q = value.replace(" ", "-");
    router.push(`/search/${q}`);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={desc} />
      </Head>
      <nav className={styles.navegation_header}>
        <ul className={styles.navegation_list}>
          <li
            className={styles.navegation_item}
            onClick={goHome}
            title="Inicio"
          >
            <Logo size={55} color="#ffffff" />
          </li>
          <li className={styles.navegation_item}>
            <Search refeGet={searchFieldR} />
            <span
              className={`material-icons ${styles.search_icon}`}
              onClick={() => handleSearch()}
            >
              search
            </span>
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
      <main>{children}</main>

    </>
  );
}
