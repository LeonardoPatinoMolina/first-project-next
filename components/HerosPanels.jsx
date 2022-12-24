import React, { useState, useEffect } from "react";
import styles from "../Styles/HerosPanels.module.css";

export const HerosPanels = ({ children, isMyHeros = false }) => {
  return (
    <section
      className={`${styles.wrapper} ${!children && styles.content_heros_empty}`}
    >
          {!children && (<div className={`${styles.empty_result}`}>
            NO HAY RESULTADOS PARA MOSTRAR
          </div>)}
      {children}
    </section>
  );
};
