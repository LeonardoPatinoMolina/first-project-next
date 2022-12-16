import React, {useEffect, useState} from "react";
import styles from "../Styles/HerosWraper.module.css";

export const HerosWraper = ({ children }) => {
 
  return (
    <>
    <div className={styles.stats_bar}>
      <ul className={styles.stats_list}>
        <li className={styles.stats_item}>Resultados:</li>
        <li className={styles.stats_item}>{children ? children.length : '0'}</li>
      </ul>
    </div>
    <section className={`${styles.wrapper} ${!children && styles.content_heros_empty}`}>
      {children}
      {!children && <div className={styles.empty_result}>NO HAY RESULTADOS PARA MOSTRAR</div>}
    </section>
    </>
  );
};
