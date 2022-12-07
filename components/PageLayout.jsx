import React, { useState } from "react";
import { Search } from "./Search";
import styles from "../Styles/NavBarHeader.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
import { LateralMenu } from "./LateralMenu";

export default function PageLayout({ title, desc, children }) {
  const [LateralMenuOpen, setLateralMenuOpen] = useState(false);

  const [value, setValue] = useState(""); //datos ingresado en input de compomnente hijo
  const router = useRouter();
  const goHome = () => router.push("/");
  const goFavorite = () => router.push("/favorites");
  const goMyHeros = () => router.push("/myheros");

  const handleSearch = () => {
    console.log(value);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.navegation_header}>
        <ul className={styles.navegation_list}>
          <li
            className={styles.navegation_item}
            onClick={goHome}
            title="Inicio"
          >
            <span className={styles.navegation_home}>P</span>
          </li>
          <li className={styles.navegation_item}>
            <Search getChildValue={setValue} />
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
            <span className={`material-icons ${styles.item}`}>
              menu
            </span>
          </li>
        </ul>
      </nav>
      <LateralMenu open={LateralMenuOpen} open_function={setLateralMenuOpen} />
      <main>{children}</main>
    </>
  );
}


