import React, { useState, useEffect, useRef } from "react";
import { requestApi } from "../../Services/requestApi";
import PageLayout from "../../components/PageLayout";
import { getFavoriteStatus } from "../../lib/favoriteRequest";
import { useRouter } from "next/router";
import styles from "../../styles/Character.module.css";

export default function HeroPage({ hero, cookie }) {
  const [favChoise, setFavChoise] = useState(hero.isFavorite);
  let statusFav = hero.isFavorite;
  const router = useRouter();
  const goBack = () => router.back();

  useEffect(() => {
    return async () => {
      if (statusFav === hero.isFavorite) console.log("no la guardé");
      else {
        if (!statusFav) {
          console.log("pendiente a borrar");
        } else {
          const res = await fetch("/api/new/favorite", {
            method: "POST",
            body: JSON.stringify({
              id: hero.id,
              name: hero.name,
              img: hero.img,
            }),
          });
          const dataConfirm = await res.json();
          if (dataConfirm.success) console.log("exito fav");
          else console.log("fallo fav");
        }
      }
    };
  }, []);

  const handleChoise = () => {
    setFavChoise(!favChoise);
    statusFav = !statusFav;
  };

  return (
    <PageLayout>
      <section className={styles.content}>
        <img className={styles.img} src={hero.img} alt="persojaje" />
        <h1 className={styles.title}>{hero.name}</h1>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni iusto
          sequi obcaecati repudiandae quisquam illo aperiam. Tenetur nemo,
          beatae, voluptate atque fugiat voluptatibus porro quia incidunt qui,
          soluta velit ducimus!
        </p>
        <div className={styles.btn_list}>
          <button
            onClick={() => goBack()}
            className={`boton ${styles.back_btn}`}
          >
            <span className={`material-icons`}>undo</span>
            Volver
          </button>
          <button
            className={`boton ${styles.noFav_btn} ${
              !favChoise && styles.noneD
            }`}
            onClick={handleChoise}
          >
            Ya no me Gusta
            <span className={`material-icons`}>grade</span>
          </button>
          <button
            className={`boton ${styles.fav_btn} ${favChoise && styles.noneD}`}
            onClick={handleChoise}
          >
            Me Gusta
            <span className={`material-icons`}>grade</span>
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
export const getServerSideProps = async ({ params, req }) => {
  const q = params.id.replace("%20", " ");
  const cookie = req.headers.cookie;
  const res = await requestApi(q);
  const resF = await getFavoriteStatus(cookie, {
    id: res[0].id,
    name: res[0].name,
    img: res[0].thumbnail.path + "." + res[0].thumbnail.extension,
  }); //devuelve true si el actyual elemento es favorito
  return {
    props: {
      hero: resF,
      cookie,
    },
  };
};
