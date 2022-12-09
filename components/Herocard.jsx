import React, { useState, useEffect } from "react";
import styles from "../Styles/HeroCard.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

export const Herocard = ({ id, name, img, area, favStatus }) => {
  const router = useRouter();
  const open = () => {
    router.push(`/hero/${name.replace(" ", "%20")}`);
  };

  return (
    <article key={id} className={styles.card} onClick={open}>
      <span
        className={`${styles.icon} ${
          favStatus ? styles.fav_status : ""
        } material-icons`}
      >
        grade
      </span>
      <Image
        className={styles.image}
        src={img}
        alt="personaje"
        draggable="false"
        width={area}
        height={area}
      />
      <h3 className={styles.name_style}>{name}</h3>
    </article>
  );
};
