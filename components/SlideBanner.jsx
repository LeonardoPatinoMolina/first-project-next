"use client"
import Image from "next/image";
import React, { useRef } from "react";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import styles from "../styles/SlideBanner.module.css";

export const SlideBanner = () => {
  const sliderPanel = useRef();
  const handleRight = () => {
    scrollFunction(1);
  };
  const handleLeft = () => {
    scrollFunction(-1);
  };
  function scrollFunction(D) {
    if (typeof window) {
      let scrollPercent;
      if (innerWidth < 750) scrollPercent = 1;
      else scrollPercent = 0.7;
      sliderPanel.current.scrollLeft += innerWidth * scrollPercent * D;
    }
  }
  return (
    <header className={styles.wrapper}>
      <button className={styles.left_arrow} onClick={handleLeft}>
        <BsFillCaretLeftFill size={50} className={styles.arrow_icon} />
      </button>
      <button className={styles.right_arrow} onClick={handleRight}>
        <BsFillCaretRightFill size={50} className={styles.arrow_icon} />
      </button>
      <section className={styles.slider} ref={sliderPanel}>
        <article className={styles.section}>
          <Image src={'/buscarBanner.webp'} alt='Buscar banner' fill={true} />
        </article> 
        <article className={styles.section}>
          <Image src={'/favoritosBanner.webp'} alt='Favoritos banner' fill={true} />
        </article> 
        <article className={styles.section}>
          <Image src={'/misHeroesBanner.webp'} alt='Mis héroes banner' fill={true} />
        </article> 
      </section>
    </header>
  );
};
