"use client"
import React,{useEffect, useRef} from 'react'
import { MdVerticalAlignTop } from "react-icons/md";
import styles from './style/BotonToTop.module.css'

export const BotonToTop = () => {
  const btnTop = useRef();
  useEffect(() => {
    if (typeof window) {
      addEventListener("scroll", handleTopBtnScroll);
    }
    return () => {
      if (typeof window) {
        removeEventListener("scroll", handleTopBtnScroll);
      }
    };
  }, []);
  function handleTopBtnScroll() {
    if (typeof window) {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop < 500) btnTop.current.classList.add(styles.noneD);
      else btnTop.current.classList.remove(styles.noneD);
    }
  }
  const goTop = () => {
    if (typeof window !== undefined) {
      const scrollS =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollS > 0) scrollTo(0, 0);
    }
  };
  return (
    <div
        ref={btnTop}
        title="Volver arriba"
        onClick={goTop}
        className={`${styles.btn_up} ${styles.noneD}`}
      >
        <MdVerticalAlignTop
              className={styles.item}
              size={25}
            />
      </div>
  )
}
