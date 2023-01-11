import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { FaPaintBrush } from "react-icons/fa";
import styles from "../styles/Panel.module.css";

export const Panel = ({ id, name, img, area, favStatus, isMyHero = false }) => {
  const [isOver, setIsOver] = useState(false);
  const router = useRouter();
  const handleOver = () => setIsOver(true);
  const handleOut = () => setIsOver(false);
  const open = () => {
    if (isMyHero) router.push(`/myhero/${id}`);
    else router.push(`/hero/${name.replace(" ", "%20")}`);
  };
  const TypePanelIcon = () => {
    if (isMyHero) return <FaPaintBrush size={35} className={styles.icon} />;
    if (favStatus) {
      return (
        <BsFillStarFill className={styles.icon} size={35} color="#ffffff" />
      );
    } else return <BsStar className={styles.icon} size={35} color="#ffffff" />;
  };
  return (
    <article
      id={id}
      className={styles.panel}
      onClick={() => open()}
      onMouseOver={() => handleOver()}
      onTouchStart={() => handleOver()}
      onTouchEnd={() => handleOut()}
      onMouseOut={() => handleOut()}
    >
      {isOver && (
        <div className={styles.data_wrapper}>
          <h3 className={styles.name_style}>{name}</h3>
          <TypePanelIcon />
        </div>
      )}
      <Image
        alt="personaje"
        src={img}
        fill={true}
        className={`${styles.image} ${isOver && styles.dark_img}`}
        sizes="(max-width: 750px) 200px,
              400px"
      />
    </article>
  );
};
