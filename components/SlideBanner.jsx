"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import styles from "../styles/SlideBanner.module.css";

export const SlideBanner = () => {
const [currentE, setCurrentE]=useState(0);
const sliderPanel = useRef();

const MATRIZ = [
  [2, 0, 1],
  [0, 1, 2],
  [1, 2, 0],
];
  const handleRight = () => {
    setCurrentE(MATRIZ[currentE][2])
  };
  const handleLeft = () => {
    setCurrentE(MATRIZ[currentE][0])
  };


  const ARJSX = [
    (<article className={styles.section}>
    <Image
      src={"/buscarBanner.webp"}
      alt="Buscar banner"
      fill={true}
      sizes="(max-width: 750px) 100vw,
        70vw"
      priority
    />
  </article>),
  (<article className={styles.section}>
    <Image
      src={"/favoritosBanner.webp"}
      alt="Favoritos banner"
      fill={true}
      sizes="(max-width: 750px) 100vw,
        70vw"
    />
  </article>),
  (<article className={styles.section}>
    <Image
      src={"/misHeroesBanner.webp"}
      alt="Mis héroes banner"
      fill={true}
      sizes="(max-width: 750px) 100vw,
        70vw"
    />
  </article>)
  ]
  const handleClickPoint=({target})=>{
    setCurrentE(parseInt(target.title));
  };
  return (
    <header className={styles.wrapper} >
      <button className={styles.left_arrow} onClick={handleLeft}>
        <BsFillCaretLeftFill size={50} className={styles.arrow_icon} />
      </button>
      <button className={styles.right_arrow} onClick={handleRight}>
        <BsFillCaretRightFill size={50} className={styles.arrow_icon} />
      </button>
      <div className={styles.bottom_points_wrapper}>
        <div className={`${styles.bottom_points} ${currentE === 0 && styles.current}`} onClick={(e)=>handleClickPoint(e)} title="0"></div>
        <div className={`${styles.bottom_points} ${currentE === 1 && styles.current}`} onClick={(e)=>handleClickPoint(e)} title="1"></div>
        <div className={`${styles.bottom_points} ${currentE === 2 && styles.current}`} onClick={(e)=>handleClickPoint(e)} title="2"></div>
      </div>
      <section className={styles.slider} ref={sliderPanel}>
        {ARJSX[currentE]}
      </section>
    </header>
  );
};

