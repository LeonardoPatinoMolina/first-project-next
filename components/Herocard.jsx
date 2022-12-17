"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import styles from "../Styles/HeroCard.module.css";

export const Herocard = ({ id, name, img, area, favStatus }) => {
  const router = useRouter();
  const [isOver, setIsOver] = useState(false);
  const open = () => router.push(`/hero/${name.replace(" ", "%20")}`);
  
  const handleOver = () => setIsOver(true);
  const handleOut = () => setIsOver(false);
  return (
    <article
      key={id}
      className={styles.card}
      onClick={open}
      onMouseOver={() => handleOver()}
      onTouchStart={()=> handleOver()}
      onTouchEnd={()=> handleOut()}
      onMouseOut={() => handleOut()}
      title="Personaje"
    >
      {isOver && (
        <div className={styles.data_wrapper}>
          <h3 className={styles.name_style}>{name}</h3>
          {favStatus ? (
            <BsFillStarFill className={styles.icon} size={25} color="#ffffff" />
          ) : (
            <BsStar className={styles.icon} size={25} color="#ffffff" />
          )}
        </div>
      )}
      <Image
        className={`${styles.image} ${isOver && styles.dark_img}`}
        src={img}
        alt="personaje"
        draggable="false"
        width={area}
        height={area}
      />
    </article>
  );
};
