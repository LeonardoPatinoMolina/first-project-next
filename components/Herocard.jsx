import React, { useState, useEffect } from "react";
import styles from "../Styles/HeroCard.module.css";
import { useRouter } from "next/router";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { useSelector } from "react-redux";
import Image from "next/image";

export const Herocard = ({ id, name, img, area }) => {
  const router = useRouter();
  const [valueStr, setValueStr] = useLocalStorage("character", id);
  const { favorites } = useSelector((state) => state.favorites);
  const [isFavorite, setIsFavorite] = useState(false);
  const open = () => {
    if (isFavorite) {
      router.push(`/favorite/${id}`);
    } else {
      setValueStr({
        name,
        img,
      });
      router.push(`/heros/${id}`);
    }
  };

  useEffect(() => {
    checkStatusFavorite();
  }, [favorites]);

  const checkStatusFavorite = () => {
    const intId = parseInt(id);
    if (favorites.length < 1) return;
    favorites.map((fav) => {
      if (fav.id === intId) setIsFavorite(true);
    });
  };

  return (
    <article className={styles.card} onClick={open} draggable={"true"}>
      <span
        className={`${styles.icon} ${
          isFavorite ? styles.fav_status : ""
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
