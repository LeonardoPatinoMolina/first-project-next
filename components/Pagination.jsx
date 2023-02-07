import React, { useState } from "react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import styles from "../styles/Pagination.module.css";

export const Pagination = ({ loot, toPage }) => {
  const PANELS4PAGE = 6;//cantidad de paneles por pagina

  //establecemos la cantidad de páginas en base a la cantidad de paneles a mostrar.
  //primero removemos los decimales que puedan haber en la divsión de los resultados
  //pero primero validamos que exista la propiedad length
  const amountPage = loot.charge.length
    ? Math.ceil(loot.charge.length / PANELS4PAGE)
    : 1;
// ---verificamos si existen o no decimales, en caso tal añadimos una página más para abarcar todos los páneles
// ---const amountPage = ap % 6 !== 0 && ap !== 1 ? ap + 1 : 1;
  //establecemos el estado local
  const [pageLoot, setPageLoot] = useState(() => {
    if (!loot.charge)
      return {
        amountPage: 1,
        amount: [1],
      };
    //arreglo que resenta la cantidad de páginas a renderizar
    let amount = [];
    for (let i = 0; i < amountPage; i++) amount.push(i + 1);
    return {
      amountPage,
      amount,
    };
  });
  const VERIFY_BACK =
    loot.currentP === 1 || !loot.charge || loot.charge.length <= 1;
  const VERIFY_NEXT =
    loot.currentP === amountPage || !loot.charge || loot.charge.length <= 1;
  const handleClick = (e) => {
    const { innerHTML } = e.target;
    toPage(innerHTML);
  };
  const handleNext = () => {
    if (VERIFY_NEXT) return;
    toPage(loot.currentP + 1);
  };
  const handleBack = () => {
    if (VERIFY_BACK) return;
    toPage(loot.currentP - 1);
  };
  return (
    <div className={styles.stats_bar}>
      <ul className={styles.stats_list}>
        <li className={styles.stats_item}>Resultados:</li>
        <li className={styles.stats_item}>
          {loot.totalResults}
          {loot.isMyHeros && "/12"}
        </li>
        <li className={styles.stats_item}>
          <nav className={styles.wrapper}>
            <ul className={styles.list}>
              <li
                className={`${styles.item} ${styles.btn} ${
                  VERIFY_BACK && styles.disabled
                }`}
                onClick={handleBack}
              >
                <IoMdArrowRoundBack />
              </li>
              {pageLoot.amount.map((el) => (
                <li
                  key={el}
                  className={`${styles.item} ${
                    loot.currentP === el && styles.currentPage
                  }`}
                  onClick={handleClick}
                >
                  {el}
                </li>
              ))}
              <li
                className={`${styles.item} ${styles.btn} ${
                  VERIFY_NEXT && styles.disabled
                }`}
                onClick={handleNext}
              >
                <IoMdArrowRoundForward />
              </li>
            </ul>
          </nav>
        </li>
      </ul>
    </div>
  );
};
